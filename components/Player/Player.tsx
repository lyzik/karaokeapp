import dynamic from 'next/dynamic'
import { useState } from 'react'
import Cookies from 'js-cookie'

const SpotifyPlayer = dynamic(() => import('react-spotify-web-playback'), {
    ssr: false,
})

export const Player = (song : any) => {
    const [code, setCode] : any = useState(Cookies.get('code'));
    return <>
        <SpotifyPlayer
            token={code}
            uris={song.song}
        />
    </>
}