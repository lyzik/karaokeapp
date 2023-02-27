import GlobalStyles from '@/components/GlobalStyles';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
export default function App({Component, pageProps: {session, ...pageProps}} : AppProps) {

  return (
      <SessionProvider session={session}>
      <Head>
        <title>Let's Sing!</title>
      </Head>
        <Component {...pageProps} />
        <GlobalStyles />
      </SessionProvider>
  );
}