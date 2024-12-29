'use client'

import XLSX from 'xlsx'

import JSZip from "jszip";

import { createCourseList, getFullBuildingName } from '@/lib/actions'


export default function Page() {




  async function handleSubmit(e: any) {
    e.preventDefault();

    const fileInput = e.target.elements.fileupload;
    const file = fileInput.files[0];
    // console.log('file input', file); 



    if (!file) {
      throw new Error('No File selected');
    }


    let data;
    try {
      // converts raw bytes to ArrayBuffer - obj that represents file data
      data = await file.arrayBuffer();
      // console.log('data in arrayBuffer format', data); 
    } catch (e: any) {
      throw new Error(`Data Error: ${e.message}`);
    }

    console.log('data before rezip', data);
    // recompresses xslx file 
    const zip = await JSZip.loadAsync(data);
    const strippedData = await zip.generateAsync({ type: 'arraybuffer' });
    console.log('data after zip', strippedData)

    // parses into common spreadsheet format
    const workbook: XLSX.WorkBook = XLSX.read(strippedData, { type: 'array' });
    // console.log('workbook', workbook); 
    const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log("worksheet", worksheet)

    // workbook -> 2d array, each array being a row in the excel file
    const raw_data: Array<Array<String>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('raw data', raw_data);
    const raw_courses = raw_data.slice(3, raw_data.length); // removing column names
    console.log('raw courses sent to server action', raw_courses);

    await createCourseList(raw_courses);



  }



  return (

    <div>


      <form onSubmit={handleSubmit}>
        <label htmlFor="fileupload">Upload files here</label>
        <input type="file" name="fileupload" accept=".xlsx, .xls"></input>
        <button type="submit">Get my routes</button>
      </form>






    </div>
  );
}
