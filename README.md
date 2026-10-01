# J’ai Bistrot

Romanian-first website for J’ai Bistrot București. Built with Next.js, Tailwind CSS, shadcn/ui’s Sheet component, and GSAP.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Import this GitHub repository in Vercel. Keep the root directory at `./` and select the Next.js framework preset. Vercel can use `npm run build`; no environment variables are needed.

## Content

The menu button opens the current Oddmenu menu. Reservation buttons call `0790 229 922`. Address and social links are in `app/experience.tsx`.

Photos in `public/images` include venue images and two generated atmosphere images. The generated images are labeled as atmosphere images on the page. Confirm publication rights for venue images before a public launch.
