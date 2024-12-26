'use server'

import z from 'zod'
import { redirect } from 'next/navigation';
import { CourseObj } from './definitions';
import _ from 'lodash'
import { revalidatePath } from 'next/cache';


export async function submitFeedback(formdata: FormData) {


    console.log(formdata)
    const FormSchema = z.object({
        audience: z.string(),
        rating: z.string(),
        comments: z.string(),
        date: z.string()
    });

    const CreateFeedback = FormSchema.omit({ date: true });

    const { audience, rating, comments } = CreateFeedback.parse({
        audience: formdata.get('audience'),
        rating: formdata.get('rating'),
        comments: formdata.get('comments'),
    });

    const date = new Date().toISOString().split('T')[0];


    console.log(audience, rating, comments, date);

    redirect('/')
}



  // creates an array of parsed course objects given an array of raw objects from sheet_to_json
export async function createCourseList(rawCourses: Array<Array<String>>) {


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

   return _.uniqWith(result, _.isEqual)
    


  })


  return courses; 

  
}





