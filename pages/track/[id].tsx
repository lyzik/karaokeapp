import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const SongData = () => {
    const router = useRouter()
    const [trackData, setTrackData] : any = useState()
    const [lyrics, setLyrics] : any = useState();
    const {id} = router.query
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        //fetch(lyricsFinder("poets of fall", "carnival of rust"))
        //.then(res => res.json())
        //.then(data => setLyrics(data))
        //.then(() => console.log(lyrics))
    }, [])

    // useFetch
    useEffect(() => {
        if(!fetched){
        fetch(`/api/track?q=${id}`)
            .then(res => res.json())
            .then(data => setTrackData(data))
            .then(data => console.log(trackData))
            .then(() => trackData !== undefined ? setFetched(true) : null)
        }
    }, [trackData, id]);

    
    const lyricsFinder = require('lyrics-finder');
    // (async function(artist, title) {
    //     let lyrics = await lyricsFinder(artist, title) || "Not Found!";
    //     console.log(lyrics);
    // })("poets of fall", "carnival of rust");



    return fetched ? 
    <>
        <h1>{trackData.name}</h1> 
        <h2>{trackData.artists[0].name}</h2>
    </>
    : null
}

export default SongData