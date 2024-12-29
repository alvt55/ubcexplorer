import { getFullBuildingName } from "@/lib/actions"
import { CourseObj } from "@/lib/definitions";
import Waypoints from "./Waypoints";
import { cookies } from "next/headers";

export default async function TravelCard({ startObj, endObj }: {
    startObj: CourseObj, endObj: CourseObj
}) {


    const startBuildingName = await getFullBuildingName(startObj.location);
    const endBuildingName = await getFullBuildingName(endObj.location);
    const waypointsIdentifier = `${startObj.section.substring(0, 14)} ${endObj.section.substring(0, 14)}`;


    const cookieStore = await cookies(); 
    const json = cookieStore.get(waypointsIdentifier);
    
    let waypoint = `ubc+${startBuildingName}`;

    if (json) {

        if (JSON.parse(json.value) !== '') {
            waypoint =`ubc+${JSON.parse(json.value)}`;
        } else {
            waypoint= `ubc+${startBuildingName}`;
        }
        
    }




  


    return (
        <>


            {/* <h1>From {startObj.section} to {endObj.section}</h1> -- use a timeline aesthetic */}
            <h1>From {startObj.location} to {endObj.location}</h1>
            <iframe
                width="600"
                height="450"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_MAPS_APIKEY}&origin=UBC+${startBuildingName}&destination=UBC+${endBuildingName}&mode=walking&waypoints=${waypoint}`}
                allowFullScreen
            ></iframe>

           <Waypoints identifier={waypointsIdentifier}></Waypoints>



        </>


    )
}