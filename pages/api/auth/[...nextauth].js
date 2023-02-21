import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,app-remote-control,user-read-private,user-library-read,user-library-modify,user-top-read',
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});