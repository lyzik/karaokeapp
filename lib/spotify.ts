const client_id : any  = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
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

export const getAccessTokenCode = async (refresh_token: any) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  }, body: 'grant_type=authorization_code&code=AQDu5lZ7WMQKHvyNKjywkobCg2LrSXZ8z7IBrS0V8Ea8At39fcJ-Q1Y8k54UaVxYn_UkZt76IUfeOxfnNVnED3jAqbftOtJ8KGH4fm6s-n8hHQReO0I_-Y6qSSwVh_jseS4fmHSHIsRa6WLfVV2OFpN7IWDSe9heVOY1_tD-0AB9SQRzuBV8IuyOTAsYf-t3PwXirHoOoqE7Lne2EWqkdKBzIYcfvijIjGs7t8UGT0F91v-EDjmJ4XXowQKAFsolmJIzzZS3gwCTOkkP-1IABYrBWceX3HfRQR-GoIs3tnez9rvCfq1ZQz0SJ2SSI9bfeQoI93AgjXUZ1ASXDvxizQt6Tqu4yX7X7d8Klqt8AXj4xtqI3ycEAqUwwq_k01qOmJZrCdvgFYXicQGd_jG4N1Y&redirect_uri=http%3A%2F%2Flocalhost%3A3000',
  })

  return response.json();
};


export const loginUrl = `https://accounts.spotify.com/authorize?client_id=196b4ec19ad241889440ccd358d52ede&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-email,playlist-read-private,streaming,user-read-playback-state,user-modify-playback-state,app-remote-control,user-read-private,user-library-read,user-library-modify`

export const getUsersPlaylists = async (refresh_token : any) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
};


export const search = async (refresh_token : any, endpoint: string ) => {
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
