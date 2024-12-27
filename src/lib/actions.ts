'use server'

import z from 'zod'
import { redirect } from 'next/navigation';
import { CourseObj } from './definitions';
import _ from 'lodash'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import puppeteer from 'puppeteer';
import build from 'next/dist/build';


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

  // setting course objects as cookies via client
  const cookieStore = await cookies()
  const setCourseObjects = cookieStore.set("COURSE_OBJS", JSON.stringify(courses), { maxAge: 604800, httpOnly: true, sameSite: "strict"});
  

  
}


// TODO: use places api instead 
export async function getFullBuildingName(location : String) : Promise<String> {

  const buildingMap: Record<string, string> = {
    "ALRD": "Lard Hall",
    "ANSO": "Anthropology and Sociology",
    "AERL": "Aquatic Ecosystems Research Laboratory",
    "ACEN": "Asian Centre",
    "AUDX": "Auditorium Annex",
    "BINN": "B.C. Binnings Studio",
    "BIOL": "Biological Sciences",
    "BUCH": "Buchanan",
    "BUTO": "Buchanan Tower",
    "CCM": "Centre for Comparative Medicine",
    "CIRS": "Centre for Interactive Research on Sustainability",
    "CHAN": "Chan Centre",
    "GUNN": "Chan Gunn Pavilion",
    "CHBE": "Chemical and Biological Engineering Building",
    "CHEM": "Chemistry",
    "CEME": "Civil and Mechanical Engineering",
    "MINL": "Coal and Mineral Processing Laboratory",
    "COPP": "D.H. Copp",
    "DLAM": "David Lam Management Research Centre",
    "DSOM": "Dorothy Somerset Studio",
    "KENN": "Douglas Kenny",
    "EOS": "Earth and Ocean Sciences",
    "ESB": "Earth Sciences Building",
    "ESC": "Engineering Student Centre",
    "FNH": "Food, Nutrition and Health",
    "FSC": "Forest Sciences Centre",
    "FORW": "Frank Forward",
    "LASR": "Frederic Lasserre",
    "FRWO": "Frederic Wood Theatre",
    "FRDM": "Friedman Building",
    "GEOG": "Geography",
    "CUNN": "George Cunningham",
    "HEBB": "Hebb",
    "HENN": "Hennings",
    "ANGU": "Henry Angus",
    "DMP": "Hugh Dempster Pavilion",
    "IRSC": "Indian Residential School History and Dialogue Centre",
    "ICCS": "Institute for Computing (ICICS/CS)",
    "IBLC": "Irving K Barber Learning Centre",
    "MCDN": "J.B. MacDonald",
    "SOWK": "Jack Bell Building for the School of Social Work",
    "LAX": "Landscape Architecture Annex",
    "LSK": "Leonard S. Klinck (also known as CSCI)",
    "PARC": "Library PARC@UBC",
    "LSC": "Life Sciences Centre",
    "MCLD": "MacLeod",
    "MCML": "MacMillan",
    "MATH": "Mathematics",
    "MATX": "Mathematics Annex",
    "MEDC": "Medical Sciences Block C",
    "MSL": "Michael Smith Laboratories",
    "MUSC": "Music",
    "SCRF": "Neville Scarfe",
    "AUDI": "Old Auditorium",
    "IRC": "P. A. Woodward Instructional Resources Centre",
    "PHRM": "Pharmaceutical Sciences Building",
    "PONE": "Ponderosa Annex E",
    "PONF": "Ponderosa Office Annex F",
    "OSB2": "Robert F. Osborne Centre",
    "SRC": "Student Recreation Centre",
    "BRIM": "The Brimacombe Building",
    "UCEN": "The Leon and Thea Koerner University Centre",
    "TFPB": "Theatre-Film Production Building",
    "YURT": "UBC Farm - Yurt",
    "KPAV": "UBC Hospital - Koerner Pavilion",
    "MGYM": "War Memorial Gymnasium",
    "EDC": "Wayne and William White Engineering Design Centre",
    "WESB": "Wesbrook",
    "WMAX": "West Mall Annex",
    "SWNG": "West Mall Swing Space"
  };

  const abbrev = location.trim().split("-")[0];
 

  return buildingMap[abbrev]; 



  
}



