import type { Metadata, Viewport } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import '../../styles/base.css'

export const viewport: Viewport = {
  themeColor: '#fff',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  description: 'Embed tweets in your React application.',
  twitter: {
    card: 'summary_large_image',
    site: 'react-tweet.vercel.app',
  },
  appleWebApp: {
    title: 'react-tweet',
  },
  other: {
    'msapplication-TileColor': '#fff',
    'twitter:url': 'https://react-tweet.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const navbar = (
  <Navbar
    logo={<b>react-tweet</b>}
    projectLink="https://github.com/vercel/react-tweet"
  />
)
const footer = (
  <Footer>
    <div className="flex w-full flex-col items-center sm:items-start">
      <div>
        <a
          className="flex items-center gap-1 text-current"
          target="_blank"
          rel="noopener noreferrer"
          title="vercel.com homepage"
          href="https://vercel.com?utm_source=react-tweet.site"
        >
          <span>Powered by</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={16}
            viewBox="0 0 262 52"
            fill="none"
          >
            <title>Vercel</title>
            <path
              fill="currentColor"
              d="M59.8 52 29.9 0 0 52zm30.16-2.37 24.99-47.27h-10.81L86.9 36.7 69.66 2.36h-10.8l24.98 47.27zM260.25 2.36v47.27h-8.95V2.36zM210.45 32q0-5.52 2.3-9.72a16 16 0 0 1 6.43-6.46 20 20 0 0 1 9.65-2.26q4.9 0 8.8 2.13a15.5 15.5 0 0 1 6.23 6.32q2.3 4.2 2.37 10.26v2.06h-26.35q.28 4.4 2.59 6.92 2.37 2.47 6.36 2.47a8.4 8.4 0 0 0 7.76-4.93l9.16.67q-1.68 5-6.3 7.99-4.6 3-10.62 3-5.52 0-9.65-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.3-9.72M237 28.66q-.5-4.33-2.73-6.32a7.8 7.8 0 0 0-5.45-2.07q-3.71 0-6.01 2.2-2.31 2.2-2.87 6.2zm-41.66-6.32a8 8 0 0 1 2.8 4.99l9.22-.47a14 14 0 0 0-2.87-7.05q-2.37-3-6.15-4.6a20 20 0 0 0-8.18-1.66q-5.53 0-9.64 2.26a16 16 0 0 0-6.43 6.46 20 20 0 0 0-2.31 9.72q0 5.52 2.3 9.72a16 16 0 0 0 6.44 6.46 20 20 0 0 0 9.64 2.26q4.62 0 8.4-1.66a16 16 0 0 0 6.14-4.86 14.7 14.7 0 0 0 2.87-7.33l-9.3-.4q-.48 3.54-2.72 5.46a8 8 0 0 1-5.39 1.87q-4.32 0-6.7-3-2.39-3-2.38-8.52 0-5.52 2.37-8.52t6.71-3q3 0 5.18 1.87m-45.4-8h8.33l.24 6.8q.89-2.9 2.47-4.48 2.28-2.31 6.38-2.31h3.4v7.26h-3.47q-2.91 0-4.79.8a5.8 5.8 0 0 0-2.77 2.5q-.9 1.72-.9 4.37v20.35h-8.88zm-38.4 7.93a20 20 0 0 0-2.3 9.72q0 5.52 2.3 9.72a16 16 0 0 0 6.43 6.46 20 20 0 0 0 9.65 2.26q6 0 10.62-3t6.3-7.98l-9.17-.67a8.4 8.4 0 0 1-7.76 4.93q-3.97 0-6.36-2.47-2.3-2.52-2.58-6.92h26.35v-2.06q-.07-6.06-2.37-10.26a15.5 15.5 0 0 0-6.23-6.32 18 18 0 0 0-8.8-2.13q-5.53 0-9.65 2.26a16 16 0 0 0-6.43 6.46m21.53.07q2.24 2 2.72 6.32h-17.05q.56-4 2.86-6.19a8.4 8.4 0 0 1 6.02-2.2q3.21 0 5.45 2.07"
            />
            {/* ▲ Dream it, ship it */}
          </svg>
        </a>
      </div>
      <p className="mt-6 text-xs">
        © {new Date().getFullYear()} Vercel, Inc. All rights reserved.
      </p>
    </div>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head></Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/vercel/react-tweet/tree/main/apps/site/src/content"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
