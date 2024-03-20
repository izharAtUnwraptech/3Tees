"use client"

import Head from 'next/head';
import Nav from '@components/promptopia/Nav';
import Provider from '@components/promptopia/Provider';
import '@styles/globals.css';

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <>
      
      <Head>
                <title>3-TEES</title>
                <meta name="description" content="BUY TEES" />
                {/* Add other SEO-related meta tags here */}
      </Head>
      <body>
        <Provider>
        <Nav/>
          {children}
        </Provider>
      </body>

      </>
      
    </html>
  )
}
