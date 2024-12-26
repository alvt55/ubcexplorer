
import { decode } from "punycode";
import TravelCard from "./TravelCard";
import { useSearchParams } from "next/navigation";

export default async function Page({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {


    const data = [
        {
            "term": "Term 2 (UBC-V)",
            "section": "CPSC_V 213-203 - Introduction to Computer Systems",
            "daysOfWeek": "Mon Wed Fri",
            "time": "2:00 p.m. - 3:00 p.m.",
            "location": "SWNG-Floor 2-Room 221"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "CPSC_V 213-L2A - Introduction to Computer Systems",
            "daysOfWeek": "Mon",
            "time": "9:00 a.m. - 10:00 a.m.",
            "location": "ICCS-Floor 2-Room X251"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "CPSC_V 213-L2A - Introduction to Computer Systems",
            "daysOfWeek": "Wed",
            "time": "5:00 p.m. - 7:00 p.m.",
            "location": "ICCS-Floor 2-Room X251"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "MATH_V 221-201 - Matrix Algebra",
            "daysOfWeek": "Tue Thu",
            "time": "8:00 a.m. - 9:30 a.m.",
            "location": "ESB-Floor 1-Room 1013"
        },
        {
            "term": "Term 1 (UBC-V)",
            "section": "MATH_V 200-101 - Calculus III",
            "daysOfWeek": "Tue Thu",
            "time": "8:00 a.m. - 9:30 a.m.",
            "location": "HEBB-Floor 1-Room 100"
        },
        {
            "term": "Term 1 (UBC-V)",
            "section": "BIOL_V 121-122 - Genetics, Evolution and Ecology",
            "daysOfWeek": "Tue Thu",
            "time": "9:30 a.m. - 11:00 a.m.",
            "location": "MATH-Floor 1-Room 100"
        },
        {
            "term": "Term 1 (UBC-V)",
            "section": "STAT_V 251-101 - Elementary Statistics",
            "daysOfWeek": "Mon Wed Fri",
            "time": "8:00 a.m. - 9:00 a.m.",
            "location": "CIRS-Floor 1-Room 1250"
        },
        {
            "term": "Term 1 (UBC-V)",
            "section": "STAT_V 251-L1A - Elementary Statistics",
            "daysOfWeek": "Mon",
            "time": "12:00 p.m. - 1:00 p.m.",
            "location": "ESB-Floor 1-Room 1042"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "LING_V 101-004 - Languages of the World",
            "daysOfWeek": "Mon Wed Fri",
            "time": "12:00 p.m. - 1:00 p.m.",
            "location": "LSK-Floor 2-Room 200"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "CPSC_V 330-202 - Applied Machine Learning",
            "daysOfWeek": "Tue Thu",
            "time": "3:30 p.m. - 5:00 p.m.",
            "location": "MCML-Floor 3-Room 360"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "CPSC_V 330-T2J - Applied Machine Learning",
            "daysOfWeek": "Thu",
            "time": "2:00 p.m. - 3:00 p.m.",
            "location": "DMP-Floor 1-Room 101"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "ENGL_V 110-008 - Approaches to Literature and Culture",
            "daysOfWeek": "Mon Wed",
            "time": "11:00 a.m. - 12:00 p.m.",
            "location": "BUCH-Floor 1-Room A104"
        },
        {
            "term": "Term 2 (UBC-V)",
            "section": "ENGL_V 110-LQ2 - Approaches to Literature and Culture",
            "daysOfWeek": "Fri",
            "time": "11:00 a.m. - 12:00 p.m.",
            "location": "BUCH-Floor 3-Room B302"
        }
    ]


    function generateTravelCards() {
        const travelCards = [];
        for (let i = 1; i < data.length; i++) {

            const currLocation = data[i - 1].location.split('-')[0];; 
            const nextLocation = data[i].location.split('-')[0];; 

            console.log(currLocation)
            console.log(nextLocation)


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
    generateTravelCards()
    }
   {/* <TravelCard  start="ubc ESB" finish="ubc HEBB"></TravelCard> */}
    
   
    </>
  );
}
