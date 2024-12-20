'use server'

import z from 'zod'
import { redirect } from 'next/navigation';
import { read, writeFileXLSX } from "xlsx";

import * as fs from "fs";
import { readFile, set_fs } from "xlsx";
set_fs(fs);
import XLSX from 'xlsx'


export async function submitFeedback(formdata: FormData) {


    console.log(formdata)
    const FormSchema = z.object({
        audience: z.string(),
        rating: z.string(),
        comments: z.string(),
        date: z.string()
    });

    const CreateFeedback = FormSchema.omit({ date: true });

    const { audience, rating, comments } = CreateFeedback.parse({
        audience: formdata.get('audience'),
        rating: formdata.get('rating'),
        comments: formdata.get('comments'),
    });

    const date = new Date().toISOString().split('T')[0];


    console.log(audience, rating, comments, date);

    redirect('/')
}


export async function observeFile(file) {

    console.log(file); 
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(workbook);
    } else {
      console.error('No file selected.');
    }
  
}