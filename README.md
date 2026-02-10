This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact form & Google Sheet (Apps Script)

Contact form submissions are stored in your database (or in-memory) and can be appended to a Google Sheet using a **Google Apps Script** (no Google Cloud project or API keys needed).

1. **Create or open a Google Sheet.** Row 1 must be headers: `Timestamp` | `First Name` | `Last Name` | `Email` | `Message`.
2. **Add the script:** Extensions → Apps Script. Replace the default code with the contents of `google-apps-script/Code.gs` in this repo.
3. **Deploy as web app:** Deploy → New deployment → Type: **Web app**
   - **Execute as:** Me  
   - **Who has access:** Anyone  
   Copy the Web app URL (ends with `/exec`).
4. **Add to `.env.local`:**  
   `GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/xxxxx/exec`

The contact API will POST each submission to this URL; the script appends a row to the active sheet. If the env var is not set, the form still works; submissions just won’t be written to the sheet.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
