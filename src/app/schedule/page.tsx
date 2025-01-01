import TravelCard from "./TravelCard";
import { cookies } from "next/headers";
import { CourseObj } from "@/lib/definitions";
import CourseCard from "./CourseCard";
import Filters from "./Filters";

 
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
    // console.log("data", data)
  }

  const searchParams = await props.searchParams;
  const selectedDay = searchParams?.day || 'Mon'; 
  const selectedTerm = searchParams?.term || 'Term 1'; 



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

    console.log("sorted", sortedObjs);

    const travelCards = [];

    // multiple courses on selected day 
    for (let i = 1; i < sortedObjs.length; i++) {

      if (!sortedObjs[i]) {
        break;
      }


      travelCards.push(
        <>
        <div key={i}>
          <CourseCard courseObj={sortedObjs[i - 1]}></CourseCard>
          <TravelCard startObj={sortedObjs[i - 1]} endObj={sortedObjs[i]}></TravelCard>
        </div>
        </>

      );
    }

    // including CourseCard for last course 

    if (sortedObjs[sortedObjs.length - 1]) {
      travelCards.push(<CourseCard courseObj={sortedObjs[sortedObjs.length - 1]}></CourseCard>)
    }
  

    return travelCards;
  }





  return (


    <>
   
      <h1>Schedule</h1>
      <Filters></Filters>

      {generateTravelCards(selectedDay, selectedTerm)}





    </>
  );
}
