import { getTrack } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req : NextApiRequest, res : NextApiResponse) => {
  const {
    token: {accessToken},
  } : any = await getSession({req});
  const query = req.query?.q;
  const response = await getTrack(accessToken, `https://api.spotify.com/v1/tracks/${query}`);
  const track = await response.json();

  return res.status(200).json(track);
};

export default handler;