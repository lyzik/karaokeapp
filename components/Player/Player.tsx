import dynamic from 'next/dynamic'
import { loginUrl } from '@/lib/spotify' 
import { useState } from 'react'

const SpotifyPlayer = dynamic(() => import('react-spotify-web-playback'), {
    ssr: false,
})

export const Player = (song : any) => {
    const [code, setCode] : any = useState(localStorage.getItem("code"));
    return <>
        <SpotifyPlayer
            token={code}
            uris={song.song}
        />
    </>
}