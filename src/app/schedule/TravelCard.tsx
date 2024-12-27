import { getFullBuildingName } from "@/lib/actions"
import { CourseObj } from "@/lib/definitions";


export default async function TravelCard({ startObj, endObj, singleClass}: { startObj: CourseObj, endObj: CourseObj, singleClass : boolean}) {


    const startBuildingName = await getFullBuildingName(startObj.location);
    const endBuildingName = await getFullBuildingName(endObj.location); 

    return (
        <>

            {singleClass ? 
            <h1>{startObj.section}</h1> : 
            <>
            <h1>From {startObj.location} to {endObj.location}</h1> 
            <iframe
                width="600"
                height="450"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_MAPS_APIKEY}&origin=UBC+${startBuildingName}&destination=UBC+${endBuildingName}&mode=walking`}
                allowFullScreen
            ></iframe>
            </>
        }
           

    
        </>


    )
}