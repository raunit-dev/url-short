import express, { Request, Response } from 'express';
import Url from '../models/url.model';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post('/shorten', async (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ error: 'Missing URL' });

  const shortId = nanoid(6);
  const newUrl = await Url.create({ originalUrl, shortId });

  res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
});

router.get('/:shortId', async (req: Request, res: Response) => {
  const { shortId } = req.params;

  const urlEntry = await Url.findOne({ shortId });
  if (!urlEntry) return res.status(404).send('Not found');

  res.redirect(urlEntry.originalUrl);
});

export default router;
