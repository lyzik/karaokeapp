import dynamic from 'next/dynamic'
import {  useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const SpotifyPlayer = dynamic(() => import('react-spotify-web-playback'), {
    ssr: false,
})

export const Player = (props : any) => {
    const [code, setCode] : any = useState(Cookies.get('code'));

    return <>
        <SpotifyPlayer
            token={code}
            uris={props.song}
            initialVolume={0.5}
            callback={
                state => {
                    props.setPlay(state.isPlaying)
                    props.setSongState(state)
                }
            }
            styles={{
                color: 'black',
                bgColor: 'white',
                sliderHeight: 0,
                sliderHandleColor: 'transparent',
            }}
        />
    </>
}