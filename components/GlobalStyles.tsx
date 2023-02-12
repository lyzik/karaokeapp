import Head from 'next/head'

export default function GlobalStyles() {
  return (
      <style jsx global>{`
        body {
            background: rgb(49,3,87);
            background: linear-gradient(0deg, rgba(49,3,87,1) 0%, rgba(42,42,130,1) 69%);
            background-attachment: fixed;
            font-family: 'Montserrat', sans-serif;
        }
      `}</style>
  )
}