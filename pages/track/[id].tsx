import { Player } from "@/components/Player/Player";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const SongData = () => {
    const router = useRouter()
    const [trackData, setTrackData] : any = useState()
    const [lyrics, setLyrics] : any = useState();
    const {id} = router.query
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if(fetched){
        fetch(`http://localhost:3000/api/lyrics?artist=${trackData.artists[0].name}&title=${trackData.name}`)
        .then(res => res.json())
        .then(data => setLyrics(data.split('\n')))
        }
    }, [trackData, id])

    useEffect(() => {
        if(!fetched){
        fetch(`/api/track?q=${id}`)
            .then(res => res.json())
            .then(data => setTrackData(data))
            .then(() => trackData !== undefined ? setFetched(true) : null)
        }
    }, [trackData, id]);

    return fetched ? 
    <>
        <h1>{trackData.name}</h1> 
        <h2>{trackData.artists[0].name}</h2>
        {lyrics ? lyrics.map((el : any) => (
            <p>{el}</p>
        )) : null}

        <Player song={trackData.uri}/>
    </>
    : null
}

export default SongData