
import { decode } from "punycode";
import TravelCard from "./TravelCard";
import { useSearchParams } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {


    const cookieStore = await cookies()
    const json = cookieStore.get('COURSE_OBJS');
    const data = JSON.parse(json.value) || []; 

    console.log(data);




    function generateTravelCards(day : String) {

        const filteredData = data.filter((obj) => {
            return obj.daysOfWeek.includes(day); 
        })
    
    
    
        console.log("filteredData", filteredData)

    
        const travelCards = [];

        // TODO: handle edge cases of 1 or 0 courses
        for (let i = 1; i < filteredData.length; i++) {


            const currLocation = filteredData[i - 1].location.split('-')[0];; 
            const nextLocation = filteredData[i].location.split('-')[0];; 

            // console.log(currLocation)
            // console.log(nextLocation)


            travelCards.push(
                <TravelCard key={i} start={currLocation} finish={nextLocation}></TravelCard>
            );
        }
        return travelCards;
    }


  



  return (
      

    <>
    <h1>Schedule</h1>
    {
    generateTravelCards('Fri')
    }
   {/* <TravelCard  start="ubc ESB" finish="ubc HEBB"></TravelCard> */}
    
   
    </>
  );
}
