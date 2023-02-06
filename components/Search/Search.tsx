import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [tracks, setTracks]: Array<any> = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
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
    fetch(`/api/search?q=${input}`)
    .then(res => res.json())
    .then(data => setTracks(data))
  }, [input]);

  const handleChange = (event: any) => {
    setInput(event.target.value)
  };

  return (<>
    <input type="text" placeholder="Search..." onChange={handleChange}></input>
    <div>
      {tracks.tracks ? tracks.tracks.items.map((el: any) => (
        <>
          <div key={el.id}>
            <Link href={`/track/${el.id}`} onClick={() => playPreview("")}>
              <img src={el.album.images[2].url} alt="" />
              <span>{el.artists[0].name} </span>
              <a>{el.name}</a>
            </Link>
            <button onClick={() => playPreview(el.preview_url)}>play</button>
          </div>
          <br />
        </>
      )) : null}
    </div>
  </>)
}
export default Search