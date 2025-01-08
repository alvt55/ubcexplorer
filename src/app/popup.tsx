'use client'

import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";




export default function Popup() {

    const [open, setOpen] = useState<boolean>(true);


    return (

        <>
            {open ?

                (<aside className="absolute flex flex-col w-5/6 h-2/3 justify-around text-center outline outline-blue p-4 rounded-lg bg-background z-10">


                    <header className="space-y-3">
                        <section className="flex justify-between">

                            <h1 className="text-2xl">Hello Friends!</h1>


                            <IoCloseSharp onClick={() => setOpen(false)} className="cursor-pointer size-6" />
                        </section>
                        <hr />

                    </header>




                    <section className="space-y-8">

                        <p>
                            Please download your Workday schedule excel filethrough <b>View My Courses</b></p>
                       



                        <section className="flex justify-evenly">

                            <Image src="/viewmycourses.png" width={800} height={400} alt="picture of view my courses on UBC Workday"></Image>

                            <Image src="/excelexport.png" layout="intrinsic" width={400} height={100} alt="picture of excel export on UBC Workday"></Image>
                        </section>





                    </section>
                    <p className="text-xs mt-10">
                        Our website uses uploaded schedules to generate Google Maps data.
                        Any sensitive information, is sanitized and not included in outputs.
                        We do not store or retain any uploaded files or data.
                    </p>

                </aside>) : <></>}

        </>




    )

}