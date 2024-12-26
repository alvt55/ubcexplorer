


export default function TravelCard({ start , finish }: { start: String, finish: String }) {

    
    return (
        <>
            <h1>From {start} to {finish}</h1>
            <iframe
                width="600"
                height="450"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_MAPS_APIKEY}&origin=UBC+${start}&destination=UBC+${finish}&mode=walking`}
                allowFullScreen
            ></iframe>
        </>


    )
}