import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const [tracks, setResults]: Array<any> = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  let currAudio = useRef(new Audio(""));
  function playPreview(audioLink: string){
    if(!isPlaying || audioLink !== currAudio.current.src){
      currAudio.current.setAttribute("src", audioLink)
      currAudio.current.play()
      setIsPlaying(true)
    }else{
     currAudio.current.pause()
     setIsPlaying(false)
    }  
  }

  useEffect(() => {
    fetch(`/api/search?q=${input}`)
    .then(res => res.json())
    .then(data => setResults(data))
    .then(() => console.log(tracks))
  }, [input])

  console.log(tracks)

  const handleChange = (event: any) => {
    setInput(event.target.value)
    
  }

  

  return (<>
    <input type="text" placeholder="Search..." onChange={handleChange}></input>
    <div>
      {tracks.tracks ? tracks.tracks.items.map((el: any) => (
        <>
          <a key={el.id}>{el.name}</a>
          <button onClick={() => playPreview(el.preview_url)}>play</button>
          <br />
        </>
      )) : null}
    </div>
  </>)
}
export default Search