import fs from "fs"
import path from "path";
import Papa from 'papaparse'; 
import {Keys, DEVICE_CATEGORY} from './constants'


//----------------------------------------------------------------MACRO UTILS----------------------------------------------------------------------------------------//
/*
 * This function builds an URL to request to adserver
 * argument macros receives variable data to conform a valid VAST TAG
 * argument id represents the AID 
*/
const macro = {BASE_URL: 'adintelligent.com', WIDTH: '1920', HEIGHT: '1080', VAST_VERSION : '2.0'};
const {BASE_URL, WIDTH, HEIGHT, VAST_VERSION } = macro
const vastTagBuilder = (macros: any, id: string) => {return `${BASE_URL}/?width=${WIDTH}&height=${HEIGHT}&cb=&ua=${macros.ua}&uip=${macros.uip}&app_name=${macros.app_name}&app_bundle=${macros.app_bundle}&device_model=&device_make=&device_category=${DEVICE_CATEGORY.smart_tv}&app_store_url=${encodeURIComponent(macros.app_store_url)}&device_id=${macros.device_id || ''}&vast_version=${VAST_VERSION}&aid=${id}`;}

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
 * @param {String} filename It's the relative path from root where it's stored the file to read. 
 * @param {String} delimiter Receives a character that represents the delimiter in CSV file (example: ',' or ';') 
 * @returns An Array where each row represents all the macros used to build final URI
 */
export const processFile = async (filename: File) => {
	// const parsedFile = Papa.parse(filename, {})
    // const parser = fs.createReadStream(path.join(process.cwd(), filename)).pipe(
    //     Papa.parse()
    // );
    // for await (const record of parser) {
    //     records.push(record)
    // }
    return 'parsedFile';
}
export const saveDataToDB = async (path, callback) => {
	const records = await processFile(path);
	//await saveRecords(records, callback);
};
//Records from bundles. Take in account the device data case.
const saveRecords = async (rows: Array<any>,callback: Function) => {
	const deleteDuplicates = (objects: Array<object>) : Array<any> => {
		const values = []
		let newArray = []
		const keys = Object.keys(objects[0])
		for (let i = 0; i < objects.length; i++) {
			const element = objects[i];
			if(!values.includes(element[keys[0]])) {
				values.push(element[keys[0]])
				newArray.push(element)
			}
		}
		return newArray;
	}
	const getRowData = (rows: Array<any>, data: any) => {
		rows.map(async (row) => {
			let o = row[3]
			let s = row[2]
			let n = row[1]
			let b = row[0]
			data.os.push({os:o})
			data.stores.push({ store: encodeURIComponent(s), os: o })
			data.names.push({ name: encodeURIComponent(n), store: encodeURIComponent(s) })
			data.bundles.push({ bundle: b, name: encodeURIComponent(n), store: encodeURIComponent(s) })
		})
		deleteDuplicates(data.stores)
	}
	const getDeviceRowData = (rows: Array<any>, data: any) => {
		return rows.map(async (row:Array<any>) => {
			let did = row[0]
			let ua = row[1]
			let ip = row[2]
			data.uas.push({ua:ua})
			data.uips.push({ uip: ip})
			data.deviceids.push({ deviceid: encodeURIComponent(did) })
		})
	}
	try {
		let data = {
			bundles: [],
			stores: [],
			names: [],
			os: [],
			uas : [],
			uips: [],
			deviceids:[]
		}
		if(rows[0].length == 4){getRowData(rows, data)}else{getDeviceRowData(rows, data)}
		callback(data)
	} catch (error) {
		console.log(error)
	}
}