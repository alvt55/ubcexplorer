import { getAllFeedback } from "@/lib/actions";
import Row from "./row";


export default async function Page() {

    const responses = await getAllFeedback() || [];
    

    return (

        responses.reverse().map((r) => {
            
            const key = r.comments.concat(r.rating);
            return <Row key={key} response = {r}></Row>
        })
    )

}