'use client'

import XLSX from 'xlsx'

import JSZip from "jszip";

import { createCourseList } from '@/lib/actions'
import { CourseObj } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function Page() {


  let courseList: Array<any> = [];

  async function handleSubmit(e: any) {
    e.preventDefault();

    const fileInput = e.target.elements.fileupload;
    const file = fileInput.files[0];


    console.log(file);
    if (!file) {
      throw new Error('No File selected');
    }


    let data;
    try {
      // converts raw bytes to ArrayBuffer - obj that represents file data
      data = await file.arrayBuffer();
    } catch (e: any) {
      throw new Error(`Data Error: ${e.message}`);
    }

    // recompresses xslx file 
    const zip = await JSZip.loadAsync(data);
    const strippedData = await zip.generateAsync({ type: 'arraybuffer' });

    // parses into common spreadsheet format
    const workbook: XLSX.WorkBook = XLSX.read(strippedData, { type: 'array' });
    const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    // workbook -> 2d array, each array being a row in the excel file
    const raw_data: Array<Array<String>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const raw_courses = raw_data.slice(3, raw_data.length); // removing column names

    console.log(await createCourseList(raw_courses));



  }









  return (

    <div>


      <form onSubmit={handleSubmit}>
        <label htmlFor="fileupload">Upload files here</label>
        <input type="file" name="fileupload" accept=".xlsx, .xls"></input>
        <button type="submit">Get my routes</button>
      </form>

      {courseList}




    </div>
  );
}
