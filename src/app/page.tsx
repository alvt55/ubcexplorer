'use client'

import XLSX from 'xlsx'

import JSZip from "jszip";

import { createCourseList } from '@/lib/actions'
import { useState } from 'react';



export default function Page() {

  const [error, setError] = useState<string>("");  




async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {

  

    e.preventDefault();
    setError('')

    const formData = new FormData(e.target as HTMLFormElement);
    const file = formData.get("fileupload") as File;


    if (!file.name) {
      setError('No File Selected')
      throw new Error('No File selected');
    }


    let data;
    try {
      // converts raw bytes to ArrayBuffer - obj that represents file data
      data = await file.arrayBuffer();
      // console.log('data in arrayBuffer format', data); 
    } catch {
      setError('Excel file could not be processed');
      throw new Error("Data could not be parsed");
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
    // console.log("worksheet", worksheet)

    // workbook -> 2d array, each array being a row in the excel file
    const raw_data: Array<Array<string>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // console.log('raw data', raw_data);
    const raw_courses = raw_data.slice(3, raw_data.length); // removing column names

    await createCourseList(raw_courses);



  }



  return (

    <div className="flex items-center justify-center h-screen w-screen">

    <div className='flex-col space-y-7'>

      <header className='text-center space-y-3 px-32'>
        <h1 className="text-5xl">UBC Explorer</h1>
        <p>Covert Workday Excel files into streamlined schedules to help you find your classrooms.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <main className='flex outline outline-blue p-7 items-center justify-center rounded-lg '>
        

        <label htmlFor="fileupload"></label>
        <input type="file" name="fileupload" accept=".xlsx, .xls"></input>
 
        <button type="submit" className="text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue w-1/5 h-9 hover:opacity-80">Get My Schedule</button>
       
        </main>
        
      </form>

      <h2 className='text-center text-red'>{error}</h2>

      
    </div>



    </div>
  );
}
