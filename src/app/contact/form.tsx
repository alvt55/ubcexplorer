
'use client';



import { submitFeedback } from '@/lib/actions';
import Link from 'next/link';



export default function Form() {

  // cant do updateInvoice(id) so this is a workaround

  const typesOfAudience = [
    "student", "visitor", "staff", "alumni", "other"
  ]
  


  return (
    <form action={submitFeedback} className="text-black">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="audience" className="mb-2 block text-sm font-medium">
            How would you describe yourself?
          </label>
          <div className="relative">
            <select
              id="audience"
              name="audience"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium">
              Comments and improvements 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="comments"
                name="comments"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required 
              />
            </div>
          </div>
        </div>

       
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit" className="text-white">Submit!</button>
      </div>
    </form>
  );
}
