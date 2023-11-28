import {ADSERVER_URL, DEVICE_CATEGORY, VAST_VERSION, WIDTH, HEIGHT, AID} from './constants'
import {parse} from 'csv-parse';
import { Readable } from 'stream';
//----------------------------------------------------------------MACRO UTILS----------------------------------------------------------------------------------------//
/*
 * This function builds an URL to request to adserver
 * argument macros receives variable data to conform a valid VAST TAG
 * argument id represents the AID 
*/
const vastTagBuilder = (macros: any, id: string) => {return `${ADSERVER_URL}/?width=${WIDTH}&height=${HEIGHT}&cb=&ua=${macros.ua}&uip=${macros.uip}&app_name=${macros.name}&app_bundle=${macros.bundle}&device_model=&device_make=&device_category=${DEVICE_CATEGORY.smart_tv}&app_store_url=${encodeURIComponent(macros.store)}&device_id=${macros.deviceid || ''}&vast_version=${VAST_VERSION}&aid=${id}`;}

/**
 * 
 * @param skip skip records in Database
 * @param limit records length from Database
 * @returns a list of URLs ready to be requested
 */
export const urlsToRequest = async (macros: Array<object | string>) => {
	return macros.map((macro:any) => {return vastTagBuilder(macro, AID)})
}

//----------------------------------------------------------------FILE PROCESSING UTILS----------------------------------------------------------------------------------------//
/**
 * 
 */
export const processCSVFile = async (file: Buffer, callback?: (data: any) => Promise<any>, errorCallback?: (e:any)=> any): Promise<void> => {
	const parser = parse({
		delimiter:[";",",",":"],
		skip_empty_lines: true,
		skip_records_with_empty_values: true
	})
	const stream = new Readable()
	stream._read = (chunk: any) => {}
	stream.push(file);
	stream.push(null);
	stream.pipe(parser).on('data', async (record) => {
		await callback(record)
	})
	parser.on('end',()=>{return;})
	parser.on('error', (e)=>{errorCallback(e)})
}