import {Keys, ADSERVER_URL, DEVICE_CATEGORY, VAST_VERSION, WIDTH, HEIGHT} from './constants'
//----------------------------------------------------------------MACRO UTILS----------------------------------------------------------------------------------------//
/*
 * This function builds an URL to request to adserver
 * argument macros receives variable data to conform a valid VAST TAG
 * argument id represents the AID 
*/
const vastTagBuilder = (macros: any, id: string | number) => {return `${ADSERVER_URL}/?width=${WIDTH}&height=${HEIGHT}&cb=&ua=${macros.ua}&uip=${macros.uip}&app_name=${macros.name}&app_bundle=${macros.bundle}&device_model=&device_make=&device_category=${DEVICE_CATEGORY.smart_tv}&app_store_url=${encodeURIComponent(macros.store)}&device_id=${macros.deviceid || ''}&vast_version=${VAST_VERSION}&aid=${id}`;}

const processToRequest = (urls: Array<object>) : Array<string> => {
    let response = []
    for (let i = 0; i < urls.length; i++) {
        response.push(vastTagBuilder(urls[i], process.env.AID))
    }
    return response;
}
/**
 * 
 * @param skip skip records in Database
 * @param limit records length from Database
 * @returns a list of URLs ready to be requested
 */
export const urlsToRequest = async (skip: number, limit: number) => {
    //const dataToBuild = await getDataToBuild(skip, limit) //retrieves data from DB //getDataTo... undefined function -> Implement service to retrieve required data to build URLS 
    //const urls = await processToRequest(dataToBuild) //builds URLs from saved data
    return 'urls' //return adserver-urls ready to be used
}

//----------------------------------------------------------------FILE PROCESSING UTILS----------------------------------------------------------------------------------------//
/**
 * 
 * @param {String} url 
 * @param {String} id 
 * @param {Array<String>} keys 
 * @param {Array<String>} data 
 * @returns an object that contains as keys the macros tags and respectives values from file data.
 */
const setMacros = (keys, data) => {
    let entries;
    if (typeof data !== 'object' || typeof keys !== 'object') {
        throw new Error('Invalid input parameters');
    }
    Object.values(data).forEach((d, i) => { if (keys[i]) entries.push([keys[i], d]) })
    entries = Object.fromEntries(entries);
    const dataToSave = {
        ...entries
    }
    try {
        return dataToSave
    }
    catch (err) { console.error('Error processing macros:', err); return null; }
}
/**
 * 
 * @param {String} baseUrl 
 * @param {String} id 
 * @param {Array<String>} data 
 * @returns an array of String that represents a list of urls with set VAST TAG macros.
 */
export const processData = async (data: Array<any>, callback: Function) => {
    try {
        let macros = []
        let index = 0;
        while (index < data.length) {
            for (let i = index; i < 1000 + index; i++) {
                if (data[i]) {
                    macros.push(setMacros(Keys, data[i]))
                    index++;
                }
            }
            await callback(macros); //Save Macros to Database
            macros.length = 0
        }
    } catch (error) {
        console.log(error)
    }
}
/**
 * 
 * @param {Array<object>} fileData It's parsed data as JSON in uploaded file. 
 * @returns An Array where each row represents all or some macros used to build final URI
 */
export const processFileData = async (fileData: Array<object>) => {
	const records = []
    for await (const record of fileData) {
        records.push(record)
    }
    return records;
}
//Records from bundles. Take in account the device data case.
export const saveRecords = async (rows: Array<any>, callback: Function, rowDataGetter: Function) => {
	try {
		let data = {
			bundles: [],
			stores: [],
			names: [],
			os: [],
			uas : [],
			uips: [],
			deviceids:[],
			bundle_list:[]
		}
		rowDataGetter(rows, data)
		callback(data)
		return data;
	} catch (error) {
		console.log(error)
	}
}

const withoutDuplicates = (objects: Array<object>, key: string) : any => {
	let set = new Set()
	Object.values(objects).map(v => {set.add(v[key])});
	return Array.from(set);
}

export const getRowData = (rows: Array<any>, data: any) => {
	rows.map((row) => {
		let o = row[3]
		let s = row[2]
		let n = row[1]
		let b = row[0]
		data.os.push({os:o})
		data.stores.push({ store: encodeURIComponent(s)})
		data.names.push({ name: encodeURIComponent(n)})
		data.bundles.push({bundle: b})
		data.bundle_list.push({ bundle: b, name: encodeURIComponent(n), store: encodeURIComponent(s), os: o })
	})
	data.os = withoutDuplicates(data.os, 'os')
	data.bundles= withoutDuplicates(data.bundles, 'bundle')
	data.names = withoutDuplicates(data.names, 'name')
	data.stores = withoutDuplicates(data.stores, 'store')
}

export const getDeviceRowData = (rows: Array<any>, data: any) => {
	rows.map(async (row:Array<any>) => {
		let did = row[0]
		let ua = row[1]
		let ip = row[2]
		data.uas.push({ua:encodeURIComponent(ua)})
		data.uips.push({ uip: ip })
		data.deviceids.push({ deviceid: encodeURIComponent(did) })
	})
	data.uas = withoutDuplicates(data.uas, 'ua')
	data.uips = withoutDuplicates(data.uips, 'uip')
	data.deviceids = withoutDuplicates(data.deviceids, 'deviceid')
}
export const splitArrayIntoChunks = (array: Array<any>) => {
	let arrayOfArrays = [];
	let size = 50000;
	for (let i=0; i<array.length; i+=size) {
		arrayOfArrays.push(array.slice(i,i+size))
	}
	return arrayOfArrays;
}