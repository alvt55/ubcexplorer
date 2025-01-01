import { getAllFeedback } from "@/lib/actions";
import Row from "./row";


export default async function Page() {

    const responses = await getAllFeedback() || [];
    

    return (

        responses.reverse().map((r) => {
            return <Row response = {r}></Row>
        })
    )

}