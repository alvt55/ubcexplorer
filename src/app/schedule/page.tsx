

import TravelCard from "./TravelCard";
import { cookies } from "next/headers";
import { CourseObj } from "@/lib/definitions";
import CourseCard from "./CourseCard";
import Filters from "./Filters";
import Link from "next/link";
import { Metadata } from "next";
import { testCourses } from "@/lib/seed_data";



export const metadata: Metadata = {
  title: "Explorer | Schedule",
  description: "schedule of converted workday schedule into a 2 in 1 course agenda and campus navigator",
};

export default async function Page(props: {
  searchParams?: Promise<{
    day?: string;
    term?: string;
  }>;
}) {


  // getting course objects from cookies 
  const cookieStore = await cookies()
  const json = cookieStore.get('COURSE_OBJS');

  let data: Array<CourseObj> = [];

  if (json) {
    data = JSON.parse(json.value);
  } else {
    data = testCourses; 
  }

  const searchParams = await props.searchParams;
  const selectedDay = searchParams?.day || '';
  const selectedTerm = searchParams?.term || '';


  // generates cards based on the day of week and selected term
  function generateTravelCards(day: string, term: string) {

    // filter by day of week 
    const filteredData = data.filter((obj) => {
      return obj.daysOfWeek.includes(day) && obj.term.includes(term);
    })




    // console.log("filteredData", filteredData)

    const dateFromObj: (str: string) => Date = (str: string) => new Date('1970/01/01 ' + str);


    // sort course objects by time
    const sortedObjs: Array<CourseObj> = filteredData.sort((a, b) => {

      let startTimeA = a.time.trim().split(". - ")[0].toUpperCase();
      startTimeA = startTimeA.replace(".", "");
      let startTimeB = b.time.trim().split(". - ")[0].toUpperCase();
      startTimeB = startTimeB.replace(".", "");

      return dateFromObj(startTimeA).getTime() - dateFromObj(startTimeB).getTime();
    });

    // console.log("sorted", sortedObjs);

    const travelCards = [];

    // multiple courses on selected day 
    for (let i = 1; i < sortedObjs.length; i++) {

      if (!sortedObjs[i]) {
        break;
      }


      travelCards.push(

        <div key={i} className="mb-16 justify-items-center">
          <CourseCard courseObj={sortedObjs[i - 1]}></CourseCard>
          <TravelCard startObj={sortedObjs[i - 1]} endObj={sortedObjs[i]}></TravelCard>
        </div>


      );
    }

    // including CourseCard for last course 

    if (sortedObjs[sortedObjs.length - 1]) {
      travelCards.push(
        <div className="justify-items-center" key={"last"}>

          <CourseCard courseObj={sortedObjs[sortedObjs.length - 1]}></CourseCard>
        </div>
      )
    }


    return travelCards;
  }





  return (



    <div className="flex justify-center p-4 w-screen h-fit">



   <link rel="preconnect" href="https://www.google.com/maps"></link>

      {/* TODO: make this stick to top */}
      <section className="grow-5 space-y-12 outline h-fit rounded-xl p-4 top-4 sticky text-center">

        <header className='text-center space-y-3 px-10'>
          <h1 className="text-2xl">Schedule</h1>
          <p>View and filter your schedule here. </p>
      
          <Link href="/contact" className="underline text-blue">Provide Feedback Here</Link>

        </header>

        <Filters></Filters>


        <br></br>
        <Link href="/" className="underline text-blue">Go to Homepage</Link>

      </section >




      <section className="flex-grow justify-items-center w-full">

        {generateTravelCards(selectedDay, selectedTerm)}
      </section>

    </div>




  );
}
