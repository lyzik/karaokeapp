import EndWindow from "@/components/EndWindow/EndWindow";
import Header from "@/components/Header/Header";
import { Player } from "@/components/Player/Player";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";


const SongData = () => {
    const router = useRouter()
    const [trackData, setTrackData] : any = useState()
    const [lyrics, setLyrics] : any = useState();
    const {id} = router.query
    const [fetched, setFetched] = useState(false)
    const [position, setPosition] : any = useState(2000)
    let speed : any = useRef(1.1) // Less = Faster
    const [isPlaying, setIsPlaying] : any = useState()
    const [songState, setSongState] : any = useState()
    const [audioFeatures, setAudioFeatures] : any = useState();
    const [nextTracks, setNextTracks] : any = useState();
    const [nextSongPopup, setNextSongPopup] : any = useState(false);
    const {data: session} : any = useSession();

    useEffect(() => {
      function handleKeyDown(event : any) {
        if (event.key === 'ArrowUp') {
          speed.current += 0.1
        }else if (event.key === 'ArrowDown') {
          speed.current -= 0.1
        }
      }
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    useEffect(() => {
      if (songState && songState.previousTracks.length) setNextSongPopup(true)
    }, [songState])

    useEffect(() => {
        if(isPlaying){
            const intervalId = setInterval(() => {
            setPosition(position - ((audioFeatures.speechiness * 10) * speed.current));
            }, 10);
            
            return () => clearInterval(intervalId);
        }
      }, [position, isPlaying]);

    useEffect(() => {
        if(fetched){
        fetch(`/api/lyrics?artist=${trackData.artists[0].name}&title=${trackData.name}`)
        .then(res => res.json())
        .then(data => setLyrics(data.split('\n')))
        } else {
            fetch(`/api/track?q=${id}`)
            .then(res => res.json())
            .then(data => setTrackData(data))
            .then(() => trackData !== undefined ? setFetched(true) : null)
        }

        fetch(`/api/audioanalysis?q=${id}`)
        .then(res => res.json())
        .then(data => setAudioFeatures(data))

        fetch(`/api/recommended?q=${id}`)
        .then(res => res.json())
        .then(data => setNextTracks(data))
    }, [trackData, id])

    if(session){
    return fetched && trackData ? 
    <div>
        <Head>
          <title>{trackData.name}</title>
        </Head>
        <Header />
        {nextTracks != undefined && nextSongPopup ? <EndWindow nextTracks={nextTracks}/> : null}
        <h1>{trackData.name}</h1> 
        <h2>{trackData.artists[0].name}</h2>
        <div className="lyrics">
            {lyrics ? lyrics.map((el : any) => (
                <p>{el}</p>
            )) : null}
        </div>

        {!nextSongPopup ? 
        <div className="player">
            <Player song={trackData.uri} setPlay={setIsPlaying} setSongState={setSongState} />
        </div> : null}
        
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
    </div>
    : null
    } else {
      return <>
        <div>
          <h1>You are not logged in</h1>
          <h2><a href="/">click to go to main page</a></h2>
        </div>

        <style jsx>{`
          div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
          } 
          a{
            color: white;
          }
          a:hover{
            color: gray;
          }
        `}
        </style>
      </>
    }
}

export default SongData