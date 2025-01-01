

export default function Row({response : {audience, rating, comments, date} }
    : {response : {audience : string, rating: string, comments : string, date : string}}) {

        return(
            <div>
                <h1>{date}</h1>
                <h2>From a {audience}</h2>
                <h2>{rating} / 5</h2>
                <p>{comments}</p>
            </div>
        )
    }