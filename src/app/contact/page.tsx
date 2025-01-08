
'use client';


import { submitFeedback } from '@/lib/actions';
import Link from 'next/link';



export default function Page() {

  // cant do updateInvoice(id) so this is a workaround

  const typesOfAudience = [
    "student", "visitor", "staff", "alumni", "other"
  ]



  

  return (
    <form action={submitFeedback} className="text-black max-w-2xl mx-auto mt-8">
      <div className="rounded-lg bg-gray-50 p-6 shadow-lg">

        {/* Customer Name */}
        <div className="mb-6">
          <label htmlFor="audience" className="mb-2 block text-sm font-medium text-gray-700">
            How would you describe yourself?
          </label>
          <div className="relative">
            <select
              id="audience"
              name="audience"
              className="peer block w-full cursor-pointer rounded-md border border-gray-300 py-3 pl-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              {typesOfAudience.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"

            className="peer block w-full rounded-md border border-gray-300 py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label htmlFor="rating" className="mb-2 block text-sm font-medium text-gray-700">
            Rating (/5)
          </label>
          <input
            id="rating"
            name="rating"
            type="text"
            min="1"
            max="5"
            className="peer block w-full rounded-md border border-gray-300 py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={3}
            required
          />
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium text-gray-700">
            Comments and improvements
          </label>
          <textarea
            id="comments"
            name="comments"
            className="peer block w-full rounded-md border border-gray-300 py-3 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={1000}
            required
          />
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-between gap-4">
        <Link
          href="/"
          className="flex h-12 items-center justify-center rounded-lg bg-gray-200 px-6 text-sm font-medium text-gray-600 transition-all hover:bg-gray-300"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-12 items-center justify-center rounded-lg bg-blue-500 px-6 text-sm font-medium text-white transition-all bg-blue hover:bg-inherit"
        >
          Submit!
        </button>
      </div>
    </form>
  );
}
