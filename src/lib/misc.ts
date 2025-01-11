'use server'

import { cookies } from 'next/headers'

// example for users to preview product 
export async function testCreateCourseList() {

    const testCourseList = [{
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 213-204 - Introduction to Computer Systems',
      daysOfWeek: 'Mon Wed Fri',
      time: '9:00 a.m. - 10:00 a.m.',
      location: 'ESB-Floor 1-Room 1013'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 213-L2J - Introduction to Computer Systems',
      daysOfWeek: 'Mon',
      time: '11:00 a.m. - 12:00 p.m.',
      location: 'ICCS-Floor 2-Room X251'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 213-L2J - Introduction to Computer Systems',
      daysOfWeek: 'Fri',
      time: '6:00 p.m. - 8:00 p.m.',
      location: 'ICCS-Floor 2-Room X251'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'MATH_V 221-201 - Matrix Algebra',
      daysOfWeek: 'Tue Thu',
      time: '8:00 a.m. - 9:30 a.m.',
      location: 'ESB-Floor 1-Room 1013'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 330-201 - Applied Machine Learning',
      daysOfWeek: 'Tue Thu',
      time: '9:30 a.m. - 11:00 a.m.',
      location: 'SWNG-Floor 2-Room 222'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 330-T2H - Applied Machine Learning',
      daysOfWeek: 'Fri',
      time: '11:00 a.m. - 12:00 p.m.',
      location: 'MCLD-Floor 2-Room 2012'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'ENGL_V 111-L22 - Approaches to Language and Communication',
      daysOfWeek: 'Fri',
      time: '10:00 a.m. - 11:00 a.m.',
      location: 'BUCH-Floor 3-Room B302'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'ENGL_V 111-003 - Approaches to Language and Communication',
      daysOfWeek: 'Mon Wed',
      time: '10:00 a.m. - 11:00 a.m.',
      location: 'SWNG-Floor 2-Room 221'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 304-202 - Introduction to Relational Databases',
      daysOfWeek: 'Mon Wed',
      time: '2:00 p.m. - 3:30 p.m.',
      location: 'CHBE-Floor 1-Room 101'
    },
    {
      term: 'Term 2 (UBC-V)',
      section: 'CPSC_V 304-T2G - Introduction to Relational Databases',
      daysOfWeek: 'Wed',
      time: '11:00 a.m. - 12:00 p.m.',
      location: 'ICCS-Floor 3-Room X350'
    }
    ];
  
  
    const cookieStore = await cookies();
    cookieStore.set("COURSE_OBJS", JSON.stringify(testCourseList), { maxAge: 604800, httpOnly: true, sameSite: "strict" });
    // redirect('/schedule');
  
  
  }