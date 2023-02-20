import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [tracks, setTracks]: Array<any> = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter();
  let currAudio = useRef(new Audio(""));
  currAudio.current.volume = 0.05;
  function playPreview(audioLink: string){
    if(!isPlaying || audioLink !== currAudio.current.src){
      currAudio.current.setAttribute("src", audioLink)
      currAudio.current.play()
      setIsPlaying(true)
    }else{
     currAudio.current.pause()
     setIsPlaying(false)
    }  
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${input}`)
      .then(res => res.json())
      .then(data => setTracks(data))
    }, 800)

    return () => clearTimeout(timeout)
  }, [input]);

  const handleChange = (event: any) => {
    setInput(event.target.value)
  };

  return (
      <>
        <div className="input-container">
          <input type="text" placeholder="Search..." onChange={handleChange}></input>
        </div>
        <div className="tracks-list">
          {tracks.tracks ? tracks.tracks.items.map((el: any) => (
            <>
              <div className="track" key={el.id}>
                <img src={el.album.images[0].url} alt="" onClick={() => {router.push(`/track/${el.id}`); () => playPreview("")}} />
                <Link href={`/track/${el.id}`} onClick={() => playPreview("")} className="link" style={{textDecoration: "none"}}>
                  <p className="track-name">{el.name}</p>
                  <p className="artist">{el.artists[0].name}</p>
                </Link>
                <div className="buttons">
                  <button onClick={() => playPreview(el.preview_url)} className="audio-preview">
                  <span className="material-symbols-outlined">
                    play_arrow
                  </span>
                  </button>
                  <button onClick={() => router.push(`/track/${el.id}`)} className='redirect-button'>
                    Sing this track!
                  </button>
                </div>
              </div>
          </>
      )) : null}
    </div>

    <style jsx>{`
        .input-container{
          width: 100%;
          display: flex;
          justify-content: center;
        }
        input{
          font-size: 30px;
          width: 60%;
          padding: 15px;
          border: none;
          border-bottom: white 1px solid;
          background-color: transparent;
          color: white;
          font-family: 'Montserrat', sans-serif;
          outline: none;
          transition: 1s;
          margin-bottom: 15px; 
        }
        input:placeholder-shown{
          transition: 1s;
          font-size: 20px;
          width: 40%;
        }
        .tracks-list{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          margin-left: 15%;
          margin-right: 15%;
        }
        .track{
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          padding: 15px;
          margin: 10px;
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
        .artist{
          color: gray;
        }
        .audio-preview{
          width: 50px;
          padding: 10px;
          background-color: transparent;
          border: 1px solid white;
          border-radius: 15px;
          color: white;
          text-align: left;
        }
        .audio-preview:hover, .redirect-button:hover{
          color: black;
          background-color: white;
        }
        .redirect-button{
          margin-left: 10px;
          width: auto;
          padding: 10px;
          background-color: transparent;
          border: 1px solid white;
          border-radius: 15px;
          color: white;
          text-align: left;
        }
        .buttons{
          display: flex;
        }
      `}</style>
  </>)
}
export default Search