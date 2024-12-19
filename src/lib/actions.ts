'use server'

import { FeedbackForm } from "./definitions"
import z from 'zod'


export async function submitFeedback(formdata: FormData) {


    const FormSchema = z.object({
        audience: z.string(),
        comments: z.string(),
        date: z.string()
    });

    const CreateFeedback = FormSchema.omit({ date: true });

    const { audience, comments} = CreateFeedback.parse({
        audience: formdata.get('audience'),
        comments: formdata.get('comments'),
    });

    const date = new Date().toISOString().split('T')[0];


    console.log(audience, comments, date);
}