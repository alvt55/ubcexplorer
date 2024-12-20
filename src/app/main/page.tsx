'use client'
import { observeFile } from "@/lib/actions";
import XLSX from 'xlsx'

export default function Page() {



  async function handleSubmit(e) {
    e.preventDefault();

    const fileInput = e.target.elements.fileupload;
    const file = fileInput.files[0];

    await observeFile(file);
   
  }



  return (

    <div>


      <form onSubmit={handleSubmit}>
        <label htmlFor="fileupload">Upload files here</label>
        <input type="file" name="fileupload" accept=".xlsx, .xls"></input>
        <button type="submit">Get my routes</button>
      </form>



    </div>
  );
}
