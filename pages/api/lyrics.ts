import { getLyrics } from "@/lib/spotify";

const handler = async (req : any, res : any) => {
    const artist = req.query?.artist;
    const title = req.query?.title;
    const response = await getLyrics(artist, title);
    const lyrics = await response;

    return res.status(200).json(lyrics);
};

export default handler;