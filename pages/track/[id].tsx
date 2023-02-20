import Header from "@/components/Header/Header";
import { Player } from "@/components/Player/Player";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


const SongData = () => {
    const router = useRouter()
    const [trackData, setTrackData] : any = useState()
    const [lyrics, setLyrics] : any = useState();
    const {id} = router.query
    const [fetched, setFetched] = useState(false)
    const [position, setPosition] : any = useState(2400)
    const [isPlaying, setIsPlaying] : any = useState()


    useEffect(() => {
        if(isPlaying){
            const intervalId = setInterval(() => {
            console.log();
            setPosition(position - 1,14);
            }, 10);
            
            return () => clearInterval(intervalId);
        }
      }, [position, isPlaying]);

    useEffect(() => {
        if(fetched){
        fetch(`http://localhost:3000/api/lyrics?artist=${trackData.artists[0].name}&title=${trackData.name}`)
        .then(res => res.json())
        .then(data => setLyrics(data.split('\n')))
        } else {
            fetch(`/api/track?q=${id}`)
            .then(res => res.json())
            .then(data => setTrackData(data))
            .then(() => trackData !== undefined ? setFetched(true) : null)
        }
    }, [trackData, id])

    return fetched && trackData ? 
    <>
        <Header />
        <h1>{trackData.name}</h1> 
        <h2>{trackData.artists[0].name}</h2>
        <div className="lyrics">
            {lyrics ? lyrics.map((el : any) => (
                <p>{el}</p>
            )) : null}
        </div>

        <div className="player">
            <Player song={trackData.uri} setPlay={setIsPlaying}/>
        </div>
        
        <style jsx>{`
          h1{
            color: white;
          } 
          h2{
            color: gray;
          } 
          p{
            color: white;
            text-align: center;
          }
          .player{
            position: fixed;
            width: 100%;
            bottom: 0;
            display: flex;
            flex-direction: row;
          }
          .lyrics{
            height: 70vh;
            overflow: hidden;
          }
          p{
            transform: translate(0, ${position}%);
          }
        `}</style>
    </>
    : null
}

export default SongData