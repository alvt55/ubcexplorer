'use client'

import dynamic from 'next/dynamic'
import Popup from './popup'
import { useState } from 'react'

export default function Page() {


    // main file page is only loaded when exiting popup
    // dynamic import 
    const DynamicPage = dynamic(() => import('./fileInput'), {
        loading: () => <h1>Loading...</h1>,
    })


    const [showPage, setShowPage] = useState<boolean>(false);


    return (

        <div className="flex items-center justify-center h-screen w-screen">
            <Popup close={() => setShowPage(true)}></Popup>

            {showPage && <DynamicPage></DynamicPage>}

        </div>



    )
}