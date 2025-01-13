

import { CourseObj } from "@/lib/definitions";


export default function CourseCard({courseObj} : {courseObj : CourseObj}) {


    const { section, time} = courseObj;

    return(

        <div className="text-center  mb-4 w-fit ">
            <h1>{section}</h1>
            <p>{time}</p>
        </div>
    )
}