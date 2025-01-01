'use server'

import z from 'zod'
import { redirect } from 'next/navigation';
import _ from 'lodash'
import { cookies } from 'next/headers'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { Response } from './definitions';
 


export async function getAllFeedback() {

  try {

    const responses = await sql<Response>`
    SELECT * FROM responses
    `

    return responses.rows;

  } catch {
    throw new Error('Database Error: Failed to retrieve data'); 
  }
}


// inserts form data into neon connected postgres db 
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

    try {

      await sql` INSERT INTO responses (audience, rating, comments, date)
          VALUES (${audience}, ${rating}, ${comments}, ${date}) `

    } catch (err) {
      throw new Error('Database Error: Failed to send feedback'); 
    }


    revalidatePath('/contact');
    redirect('/contact')
    
}



  // creates an array of parsed course objects given an array of raw objects from sheet_to_json
export async function createCourseList(rawCourses: Array<Array<string>>) {

 

  const courses = rawCourses.flatMap((arr) => {

   

    if (arr[6].includes("Online")) { // removes any courses that are online
      // console.log('this is an online course', arr); 
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
    const meetingTimes = arr[7].trim().split('\n');

 


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

  // console.log('courses to be mapped through', courses); 

  // setting course objects as cookies via client
  const cookieStore = await cookies()
   cookieStore.set("COURSE_OBJS", JSON.stringify(courses), { maxAge: 604800, httpOnly: true, sameSite: "strict"});
  redirect('/schedule'); 

  
}




export async function getBuildingAddress(location : string) : Promise<string> {

  const buildingMap: Record<string, string> = {
    "ALRD": "1822 East Mall",
    "ANSO": "6303 North West Marine Drive",
    "AERL": "2202 Main Mall",
    "ACEN": "1871 West Mall",
    "AUDX": "1924 West Mall",
    "BINN": "6373 University Boulevard",
    "BIOL": "6270 University Boulevard",
    "BUCH": "1866 Main Mall",
    "BUTO": "1873 East Mall",
    "CCM": "4145 Wesbrook Mall",
    "CIRS": "2260 West Mall",
    "CHAN": "6265 Crescent Road",
    "GUNN": "2553 Wesbrook Mall",
    "CHBE": "2360 East Mall V6T 1Z3",
    "CHEM": "2036 Main Mall",
    "CEME": "6250 Applied Science Lane",
    "MINL": "2332 West Mall",
    "COPP": "2146 Health Sciences Mall",
    "DLAM": "2033 Main Mall V6T 1Z2",
    "DSOM": "6361 University Blvd",
    "KENN": "2136 West Mall",
    "EOS": "6339 Stores Road",
    "ESB": "2207 Main Mall",
    "ESC": "2335 Engineering Road",
    "FNH": "2205 East Mall",
    "FSC": "2424 Main Mall",
    "FORW": "6350 Stores Road",
    "LASR": "6333 Memorial Road",
    "FRWO": "6354 Crescent Road",
    "FRDM": "2177 Wesbrook Mall V6T 1Z3",
    "GEOG": "1984 West Mall",
    "CUNN": "2146 East Mall",
    "HEBB": "2045 East Mall",
    "HENN": "6224 Agricultural Road",
    "ANGU": "2053 Main Mall",
    "DMP": "6245 Agronomy Road V6T 1Z4",
    "IRSC": "1985 Learners' Walk",
    "ICCS": "2366 Main Mall",
    "IBLC": "1961 East Mall V6T 1Z1",
    "MCDN": "2199 West Mall",
    "SOWK": "2080 West Mall",
    "LAX": "2371 Main Mall",
    "LSK": "6356 Agricultural Road",
    "PARC": "6049 Nurseries Road",
    "LSC": "2350 Health Sciences Mall",
    "MCLD": "2356 Main Mall",
    "MCML": "2357 Main Mall",
    "MATH": "1984 Mathematics Road",
    "MATX": "1986 Mathematics Road",
    "MEDC": "2176 Health Sciences Mall",
    "MSL": "2185 East Mall",
    "MUSC": "6361 Memorial Road",
    "SCRF": "2125 Main Mall",
    "AUDI": "6344 Memorial Road",
    "IRC": "2194 Health Sciences Mall",
    "PHRM": "2405 Wesbrook Mall",
    "PONE": "2034 Lower Mall",
    "PONF": "2008 Lower Mall",
    "OSB2": "6108 Thunderbird Boulevard",
    "SRC": "6000 Student Union Blvd",
    "BRIM": "2355 East Mall",
    "UCEN": "6331 Crescent Road V6T 1Z1",
    "TFPB": "6358 University Blvd, V6T 1Z4",
    "YURT": "3465 Ross Drive",
    "KPAV": "2211 Wesbrook Mall",
    "MGYM": "6081 University Blvd",
    "EDC": "2345 East Mall",
    "WESB": "6174 University Boulevard",
    "WMAX": "1933 West Mall",
    "SWNG": "2175 West Mall V6T 1Z4"
  };
  

  const abbrev = location.trim().split("-")[0];
 

  return buildingMap[abbrev]; 
  
}


export async function changeWaypoint(identifier : string, formData : FormData) {

  const place = formData.get('place'); 
  const cookieStore = await cookies();

  cookieStore.set(identifier, JSON.stringify(place), { maxAge: 86400, httpOnly: true, sameSite: "strict" });
}


