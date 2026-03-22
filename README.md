# MunglesGuide.com

The ULTIMATE Valorant guide by Mungle. Home of the Doctor Freeze and the Mung Peek.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework Preset: **Other**
4. Deploy — it auto-detects the static site from `vercel.json`
5. Go to Settings → Domains → Add `munglesguide.com`

## Project Structure

```
├── public/
│   ├── index.html          # The entire site
│   ├── omen-pixel.png       # Pixel art Omen
│   └── chamber-pixel.png    # Pixel art Chamber
├── vercel.json              # Vercel config
└── README.md
```

## Custom Domain

In your domain registrar, add these DNS records:

| Type  | Name | Value              |
|-------|------|--------------------|
| A     | @    | 76.76.21.21        |
| CNAME | www  | cname.vercel-dns.com |

Then in Vercel dashboard: Settings → Domains → Add `munglesguide.com`

## Features

- Early 2000s web aesthetic (marquees, beveled borders, starfield bg)
- Doctor Freeze & Mung Peek guides
- Omen & Chamber agent guides
- BIG BERTHA crosshair section with copyable code
- YouTube tutorial thumbnails
- Medal.tv highlight reels (Mungle, Gun, John Pork, OC)
- Weapon stats & match history sidebar
- Working poll with animated results
- Background music + SFX with mute button
- Hidden lore section (Tim Cheese & John Pork saga)
- Konami code easter egg
- Pixel art characters
- Visitor counter & kill counter animations
