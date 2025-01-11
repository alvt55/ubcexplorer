// app/schedule/setCookies/route.js

import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  
  // Check if the cookie exists already
  if (!cookieStore.get('COURSE_OBJS')) {
    const testCourseList = [
      {
        term: 'Term 2 (UBC-V)',
        section: 'CPSC_V 213-204 - Introduction to Computer Systems',
        daysOfWeek: 'Mon Wed Fri',
        time: '9:00 a.m. - 10:00 a.m.',
        location: 'ESB-Floor 1-Room 1013',
      },
      {
        term: 'Term 2 (UBC-V)',
        section: 'CPSC_V 213-L2J - Introduction to Computer Systems',
        daysOfWeek: 'Mon',
        time: '11:00 a.m. - 12:00 p.m.',
        location: 'ICCS-Floor 2-Room X251',
      },
      // More courses can be added here
    ];
    
    // Set the cookie with a 7-day expiration
    cookieStore.set('COURSE_OBJS', JSON.stringify(testCourseList), {
      maxAge: 604800, // 7 days
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  return new Response(null, { status: 200 });
}
