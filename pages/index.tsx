import Search from '@/components/Search/Search';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '@/components/Header/Header';

export default function Home() {
  const {data: session} : any = useSession();

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic MTk2YjRlYzE5YWQyNDE4ODk0NDBjY2QzNThkNTJlZGU6YmQzZTg4MDQ5YzJmNDAzMzliZjNmN2NjMjkyZjY4YWE=`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${new URLSearchParams(window.location.search).get('code')}&redirect_uri=http%3A%2F%2Flocalhost:3000`
    })
      .then(response => response.json())
      .then(data => {
        data.access_token ? Cookies.set('code', data.access_token, { expires: 1 / 24 }) : null
      })
  }, [])


  if(session && !Cookies.get('code')){
    window.location.replace(`https://accounts.spotify.com/authorize?client_id=196b4ec19ad241889440ccd358d52ede&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,app-remote-control,user-read-private,user-library-read,user-library-modify`);
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