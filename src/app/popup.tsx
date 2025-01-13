'use client'

import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import coursePic from '../../public/viewmycourses.png'
import excelExport from '../../public/excelexport.png'



interface functionProps {
    close: () => void 
}


export default function Popup({close = () => {}} : functionProps) {

    const [open, setOpen] = useState<boolean>(true);



    function closeHandler() {
        close();

        setOpen(false); 
    }


    return (

        <>
            {open ?



                (<aside className="absolute flex flex-col w-5/6 h-fit blur-none justify-around text-center outline outline-blue p-4 rounded-lg bg-background z-10">


                    <header className="space-y-3">
                        <section className="flex justify-between">

                            <h1 className="text-2xl">Hello Friends!</h1>


                            <IoCloseSharp onClick={closeHandler} className="cursor-pointer size-6" />
                        </section>
                        <hr />

                    </header>




                    <section className="space-y-8">

                        <p>
                            Please download your Workday schedule excel file through <b>View My Courses</b></p>




                        <section className="flex justify-center items-center gap-x-1 ">

                            {/* <div className="w-1/2 items-center"> */}
                                <Image src={coursePic} alt="picture of view my courses on UBC Workday" priority></Image>
                            {/* </div> */}

                            {/* <div className="w-1/2"> */}

                                <Image src={excelExport} alt="picture of excel export on UBC Workday" ></Image>
                            {/* </div> */}

                        </section>

                        <p>You can also test the website using a <b>sample schedule</b>, just click the button at the bottom.</p>





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