
import { changeWaypoint } from '@/lib/actions';

export default function Waypoints({ identifier }: { identifier: string }) {


    const changeWaypointWithIdentifier = changeWaypoint.bind(null, identifier); 

    return (


        <form action={changeWaypointWithIdentifier} className='text-center space-y-4'>
            <input type="text" name="place" placeholder="In between classes..." className='bg-transparent outline outline-white rounded-xl p-2'></input>
            <br></br>
            <button type="submit" className="text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue p-1 hover:opacity-80 align-center items-center">Choose Waypoint</button>
        </form>

    )

}