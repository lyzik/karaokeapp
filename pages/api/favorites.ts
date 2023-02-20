import { getFavorites } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
  const { token: {accessToken}, } : any = await getSession({req});
  const response = await getFavorites(accessToken, `https://api.spotify.com/v1/me/top/tracks`);
  const tracks = await response.json();

  return res.status(200).json(tracks);
};

export default handler;