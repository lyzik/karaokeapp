import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function EndWindow(props : any) {
    const [tracks, setTracks] : any = useState(props.nextTracks.tracks)
    const [timer, setTimer] : any = useState(10)
    const router = useRouter();

    useEffect(() => {
        if(timer > 0){
            const intervalId = setInterval(() => {
            setTimer(timer - 1);
            }, 1000);
            
            return () => clearInterval(intervalId);
        }else{
            window.location.replace(`/track/${tracks[0].id}`);
        }
    }, [timer])

    useEffect(() => {
        console.log(tracks)
    },[tracks])

    return (
        <>
        <div className='window'>
            <h1>Whats next?</h1>
            <div className='tracks'>
            {tracks ? tracks.map((el : any) => (
                <div className='track'>
                    <img src={el.album.images[0].url}/>
                    <a href={`/track/${el.id}`} className="link" style={{textDecoration: "none"}}>
                        <p className="track-name">{el.name}</p>
                        <p className="artist">{el.artists[0].name}</p>
                    </a>
                </div>
            )) : null}
            </div>
            <p>Next song in: {timer}</p>
            <button onClick={() => router.push(`/`)}>Go to main page</button>
            <button onClick={() => window.location.reload()}>Replay</button>
        </div>

        <style jsx>{`
            @keyframes fadein {
                from { opacity: 0}
                to   { opacity: 1}
            }
            .window{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 97%;
                height: 97%;
                background-color: rgba(65, 8, 112, 0.85);
                z-index: 3;
                border-radius: 15px;
                transition: opacity 1.5s;
                animation: fadein 2s;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .tracks{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            .track{
                background-color: rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                padding: 20px;
                margin: 0px 30px 50px 30px;
                align-items: left;
                transition: 0.2s;
                border-radius: 15px;
            }
            .track:hover{
              background-color: rgba(0, 0, 0, 0.3);
              transition: 0.2s;
            }
            p{
              color: white;
            }
            img{
              width: 100%;
              border-radius: 15px;
            }
            h1{
                text-align: center;
                color: white;
            }
            button{
                width: 30%;
                background-color: rgba(0, 0, 0, 0.2);
                color: white;
                border: none;
                height: 45px;
                border-radius: 15px;
                padding: 10px;
                margin: 5px;
            }
            button:hover{
                background-color: rgba(0, 0, 0, 0.3);
                transition: 0.2s;
            }
        `}
        </style>
        </>
    )
}
