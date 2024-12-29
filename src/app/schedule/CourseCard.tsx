import { CourseObj } from "@/lib/definitions";


export default function CourseCard({courseObj} : {courseObj : CourseObj}) {


    const {term, section, daysOfWeek, time, location} = courseObj;

    return(

        <div>
            <h1>{section}</h1>
            <p>{location}</p>
            <p>{time}</p>
        </div>
    )
}