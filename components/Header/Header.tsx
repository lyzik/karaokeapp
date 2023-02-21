import { signOut, useSession } from 'next-auth/react';
import React from 'react'

export default function Header() {
  const {data: session} : any = useSession();

  return (
    <header>
        <div className='user-data'>
        <span>{session?.token?.name}</span>
        <button onClick={() => {signOut()}}>Sign out</button>
        </div>

        <style jsx>{`
          header {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            color: white;
          }
          span{
            padding: 15px;
          }
          .user-data{
            width: auto;
            margin: 15px;
          }
          button{
            padding: 5px 20px 5px 20px;
            border: white 1px solid;
            background-color: white;
            border-radius: 50px;
            transition: 0.3s;
          }
          button:hover{
            background-color: transparent;
            color: white;
            transition: 0.3s;
          }
        `}</style>
    </header>
  )
}
