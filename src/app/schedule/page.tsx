
import { decode } from "punycode";
import TravelCard from "./TravelCard";
import { useSearchParams } from "next/navigation";
import { cookies } from "next/headers";
import build from "next/dist/build";
import { CourseObj } from "@/lib/definitions";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {


  const cookieStore = await cookies()
  const json = cookieStore.get('COURSE_OBJS');

  let data : Array<CourseObj> = []; 

  if (json) {
     data = JSON.parse(json.value); 
  }
  


  // generates cards based on the day of week and selected term
  function generateTravelCards(day: string, term : string) {

    // filter by day of week 
    const filteredData = data.filter((obj) => {
      return obj.daysOfWeek.includes(day) && obj.term.includes(term);
    })



    console.log("filteredData", filteredData)

    const dateFromObj : any = (str : String) => new Date('1970/01/01 ' + str);


    // sort course objects by time
    const sortedObjs =  filteredData.sort((a, b) => {

      let startTimeA = a.time.trim().split(". - ")[0].toUpperCase();
      startTimeA = startTimeA.replace(".", ""); 
      let startTimeB = b.time.trim().split(". - ")[0].toUpperCase();
      startTimeB = startTimeB.replace(".", ""); 

      return dateFromObj(startTimeA) - dateFromObj(startTimeB)
    });

    console.log("sorted", sortedObjs);



    const travelCards = [];

    // if user has only one course on a day 
    if (filteredData.length == 1) {
      travelCards.push(
        <TravelCard key={0} startObj={filteredData[0]} endObj={filteredData[0]} singleClass={true} ></TravelCard>
      );
    }


    // multiple courses on selected day 
    for (let i = 1; i < filteredData.length; i++) {

      if (!filteredData[i]) {
        break; 
      }
      travelCards.push(
        <TravelCard key={i} startObj={filteredData[i - 1]} endObj={filteredData[i]} singleClass={false}></TravelCard>
      );
    }
    return travelCards;
  }

 

  

  return (


    <>
      <h1>Schedule</h1>
      {
        generateTravelCards('Fri', 'Term 2')
      }

        

   

    </>
  );
}
