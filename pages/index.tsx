import Search from '@/components/Search/Search';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
const client_id : any  = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');


export default function Home() {
  const {data: session} : any = useSession();

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${new URLSearchParams(window.location.search).get('code')}&redirect_uri=http%3A%2F%2Flocalhost:3000`
    })
      .then(response => response.json())
      // .then((data) => console.log(data.access_token))
      .then(data => data.access_token ? localStorage.setItem("code", data.access_token) : null)
  }, [])

  if(session && window.location.search == ""){
    window.location.replace("https://accounts.spotify.com/authorize?client_id=196b4ec19ad241889440ccd358d52ede&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,app-remote-control,user-read-private,user-library-read,user-library-modify");
    console.log(new URLSearchParams(window.location.search).get('code'))
  }

  if (session) {
    return (
      <>
        Hi {session?.token?.name} <br />
        {/* <input type="text" id='searchBar' onChange={event => setInput(event.target.value)}/> */}
        <button onClick={() => signOut()}>Sign out</button>
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
