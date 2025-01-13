

import { getBuildingAddress } from "@/lib/actions"
import { CourseObj } from "@/lib/definitions";
import Waypoints from "./Waypoints";
import { cookies } from "next/headers";

import { FaArrowDownLong } from "react-icons/fa6";


export default async function TravelCard({ startObj, endObj }: {
    startObj: CourseObj, endObj: CourseObj
}) {



    const endTimeOfFirst = startObj.time.trim().split("-")[1];
    const startTimeOfSecond = endObj.time.trim().split("-")[0];

    const startBuildingName = await getBuildingAddress(startObj.location);
    const endBuildingName = await getBuildingAddress(endObj.location);
    const waypointsIdentifier = `${startObj.section.substring(0, 14)} ${endObj.section.substring(0, 14)}`;


    const cookieStore = await cookies();
    const json = cookieStore.get(waypointsIdentifier);

    let waypoint = startBuildingName;

    if (json) {

        if (JSON.parse(json.value) !== '') {
            waypoint = `ubc+${JSON.parse(json.value)}`;
        } else {
            waypoint = startBuildingName;
        }

    }







    return (
        <div className="flex">

            <iframe
                title={`map of ${startBuildingName} to ${endBuildingName}`}
                width="700"
                height="500"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_MAPS_APIKEY}&origin=${startBuildingName}&destination=${endBuildingName}&mode=walking&waypoints=${waypoint}`}
                allowFullScreen
            ></iframe>
          


            <div className="flex flex-col justify-evenly items-center outline outline-blue p-3 rounded-lg">

                <section className="flex flex-col justify-center items-center gap-7 text-center">

                    <h2 className="text-xl">{startObj.location} <br />End: {endTimeOfFirst} </h2>
                    <FaArrowDownLong className="size-8"/>
                    <h2 className="text-xl">Start: {startTimeOfSecond}<br /> {endObj.location} </h2>
                </section>

                
                    <Waypoints identifier={waypointsIdentifier}></Waypoints>
               

            </div>


        </div>


    )
}