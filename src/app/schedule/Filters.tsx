'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Filters() {




    const searchParams = useSearchParams();

    const pathname = usePathname();
    const { replace } = useRouter();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

    function changeDay(newDay: string) {

        const params = new URLSearchParams(searchParams);
        params.set('day', newDay);
        console.log(newDay);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function changeTerm(newTerm: string) {
        const params = new URLSearchParams(searchParams);
        params.set('term', newTerm);
        console.log(newTerm);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }


    return (
        <div className="flex space-x-2">

            {days.map(day => {
                return (
                    <label key={day}>
                        <input type="radio" name="day" className="hidden peer" onClick={() => changeDay(day)} />
                        <span className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                            {day}
                        </span>
                    </label>
                )
            })}



            <div>

                <label>
                    <input type="radio" name="term" className="hidden peer" onClick={() => changeTerm("Term 1")} />
                    <span className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                        Term 1
                    </span>
                </label>
                <label>
                    <input type="radio" name="term" className="hidden peer" onClick={() => changeTerm("Term 2")} />
                    <span className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                        Term 2
                    </span>
                </label>
            </div>
            {/* TODO: implement summer term detection */}

        </div>

    )


}