import Search from '@/components/Search/Search';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Home() {
  const {data: session} : any = useSession();
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
