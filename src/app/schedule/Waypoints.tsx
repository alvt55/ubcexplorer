'use client'
import { changeWaypoint } from '@/lib/actions';

export default function Waypoints({ identifier }: { identifier: string }) {


    const changeWaypointWithIdentifier = changeWaypoint.bind(null, identifier); 

    return (

        <form action={changeWaypointWithIdentifier}>
            <input type="text" name="place"></input>
            <button type="submit">Change</button>
        </form>

    )

}