import { Router } from 'express';
import Url from '../models/url.model';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/shorten', async function (req, res) {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'Missing URL' });
    }

    const shortId = nanoid(6);
    const newUrl = await Url.create({ originalUrl, shortId });

    return res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (error) {
    console.error('Error in POST /shorten:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:shortId', async function (req, res) {
  try {
    const { shortId } = req.params;
    const urlEntry = await Url.findOne({ shortId });

    if (!urlEntry) {
      return res.status(404).send('Not found');
    }

    return res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error('Error in GET /:shortId:', error);
    return res.status(500).send('Server error');
  }
});

export default router;
