import Search from '@/components/Search/Search';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '@/components/Header/Header';
const client_id : any  = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const redirect_auth = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,app-remote-control,user-read-private,user-library-read,user-library-modify`

export default function Home() {
  const {data: session} : any = useSession();

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${new URLSearchParams(window.location.search).get('code')}&redirect_uri=${redirect_uri}`
    })
      .then(response => response.json())
      .then(data => {
        data.access_token ? Cookies.set('code', data.access_token, { expires: 1 / 24 }) : null
      })
  }, [])

  if(session && !Cookies.get('code')){
    window.location.replace(redirect_auth);
  }
  
  if (session) {
    return (
      <>
        <Header />
        <Search />
      </>
    );

  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}