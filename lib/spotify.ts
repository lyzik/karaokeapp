const client_id : any  = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const lyricsFinder = require('lyrics-finder');

export const getAccessToken = async (refresh_token: any) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    return response.json();
};

export const search = async (refresh_token : any, endpoint: string ) => {
  const {access_token} = await getAccessToken(refresh_token);
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getFavorites = async (refresh_token : any, endpoint: string ) => {
  const {access_token} = await getAccessToken(refresh_token);
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}


export const getTrack = async (refresh_token : any, endpoint: string ) => {
  const {access_token} = await getAccessToken(refresh_token);
  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getLyrics = async (artist : any, track : any) => {
  let lyrics = await lyricsFinder(artist, track) || "No lyrics for this track ...";
  return lyrics;
}