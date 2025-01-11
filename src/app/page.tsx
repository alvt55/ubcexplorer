'use client'

import XLSX from 'xlsx'

import JSZip from "jszip";

import { createCourseList } from '@/lib/actions'
import Link from 'next/link';
import { useState } from 'react';
import Popup from './popup';



export default function Page() {

  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {



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

    // console.log('data before rezip', data);
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


    console.log(await createCourseList(raw_courses));


  }




  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // Update state with the selected file name
      setError('');
    } else {
      setFileName(null);
    }
  }


  return (




    <div className="flex items-center justify-center h-screen w-screen">
      <Popup></Popup>



      <div className='flex-col space-y-7 w-2/3 text-center'>

        <header className='text-center space-y-3 '>
          <h1 className="text-5xl">UBC Explorer</h1>
          <p>Covert Workday Excel files into streamlined schedules to help you find your classrooms.</p>
        </header>


        <form onSubmit={handleSubmit}>
          <main className="flex flex-col md:flex-row items-center p-7 justify-evenly rounded-lg">
            <label
              htmlFor="fileupload"
              className="cursor-pointer inline-block text-center bg-gray-200 text-black px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300"
            >
              Choose File
            </label>
            <input
              type="file"
              name="fileupload"
              id="fileupload"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={e => handleFileChange(e)}
            />



            <button
              type="submit"
              className="text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue w-fit px-4 py-2 hover:opacity-80">
              Get My Schedule
            </button>


          </main>

        </form>










      </div>

      <section className='bottom-1/4 absolute'>



        <p className='text-center'>File chosen: {fileName || 'none'}</p>
        {error && <h2 className='text-center text-red absolute'>{error}</h2>}
      </section>

      <section className='bottom-5 absolute'>



        <Link href="/schedule" className="bg-blue p-1 rounded-lg text-xs hover:bg-hoverblue">Test with sample schedule</Link>

      </section>





    </div>











  );
}