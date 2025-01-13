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
        <div className="flex flex-col space-y-5 items-center">


            <div className='mb-2'>

                <label>
                    <input type="radio" name="term" className="hidden peer " onClick={() => changeTerm("Term 1")} />
                    <span className="px-4 py-1  cursor-pointer  peer-checked:bg-hoverblue hover:opacity-80 outline outline-1">                        
                        Term 1
                    </span>
                </label>
                <label>
                    <input type="radio" name="term" className="hidden peer" onClick={() => changeTerm("Term 2")} />
                    <span className="px-4 py-1  cursor-pointer  peer-checked:bg-hoverblue hover:opacity-80 outline outline-1">                        
                        Term 2
                    </span>
                </label>
            </div>


            <div className='text-center w-full'>


                {days.map(day => {
                    return (
                        <label key={day} className='w-full'>
                            <input type="radio" name="day" className="hidden peer" onClick={() => changeDay(day)} />
                            <span className="w-8/12 text-center mb-2 inline-block outline outline-1 rounded-md cursor-pointer peer-checked:bg-hoverblue hover:opacity-80 ">
                                {day}
                            </span>
                        </label>
                    )
                })}
            </div>





        </div>

    )


}