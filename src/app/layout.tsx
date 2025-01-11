import type { Metadata } from "next";
import { Roboto} from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "UBC Vancouver Explorer Agenda | Streamline Google Maps and Workday Schedules for UBC Vancouver Students and Visitors",
  description: "Check out this UBC student tool to convert workday excel files into streamlined schedules to help you find your classrooms. A tool for navigating UBC Vancouver Campus without needing to switch between Maps and a schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body
        className={`${roboto.className} antialiased max-w-screen overflow-x-hidden w-screen h-screen`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
