import { search } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
  const { token: {accessToken}, } : any = await getSession({req});
  const query = req.query?.q;
  const response = await search(accessToken, `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`);
  const {tracks} = await response.json();

  return res.status(200).json({tracks});
};

export default handler;