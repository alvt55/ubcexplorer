'use client'
import { observeFile } from "@/lib/actions";
import XLSX from 'xlsx'
import _ from 'lodash'

export default function Page() {



  async function handleSubmit(e) {
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
    } catch (e) {
      throw new Error(`Data Error: ${e.message}`);
    }

    // parses into common spreadsheet format
    const workbook : XLSX.WorkBook = XLSX.read(data, { type: 'array' });
    const worksheet : XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    // workbook -> 2d array, each array being a row in the excel file
    const raw_data : Array<Array<String>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const raw_courses = raw_data.slice(3, raw_data.length); // removing column names
    console.log("raw courses", raw_courses)
    createCourseList(raw_courses);

  }


  // creates an array of parsed course objects given an array of raw objects from sheet_to_json
  function createCourseList(rawCourses : Array<Array<String>>) {


    const courses = rawCourses.flatMap((arr) => {


      if (arr[2] == "Online Learning") { // removes any courses that are online
        return [];
      }

      const indexOfTerm = arr[0].indexOf('Term');


      
      // an array of each meeting time per course
      // ex.
      //  [
      //   "2025-01-06 - 2025-02-12 | Mon Wed | 11:00 a.m. - 12:00 p.m. | BUCH-Floor 1-Room A104",
      //   ''
      //   "2025-02-24 - 2025-04-07 | Mon Wed | 11:00 a.m. - 12:00 p.m. | BUCH-Floor 1-Room A104"
      //  ]
      let meetingTimes = arr[7].trim().split('\n');
   
  


      // for each meeting time, creates new course object
      // 
      // example: 
      /* {
        daysOfWeek: "Mon Wed",
        location: "HENN-Floor 1-Room 201",
        section: "FMST_V 210-102 - Family Context of Human Development",
        term: "Term 1 (UBC-V)",
        time: "9:30 a.m. - 11:00 a.m."
       };
       */
      const result = meetingTimes.flatMap(meetingTime => {

        // removes the line breaks 
        if (meetingTime == "") {
          return [];
        }

        // indentifies index of pipes seperating the day of week, time and location 
        const dayAndTime = meetingTime.trim().split(' | ');

        return {
          term: arr[0].substring(indexOfTerm),
          section: arr[4],
          daysOfWeek: dayAndTime[1],
          time: dayAndTime[2],
          location: dayAndTime[3]

        }
      })


      // returns a list of course objects without duplicates 
      return _.uniqWith(result, _.isEqual);


    })



    console.log(courses);

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
