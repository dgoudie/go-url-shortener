import { Head, Html, Main, NextScript } from 'next/document';

import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet='utf-8' />
        <meta name='robots' content='noindex' />
        <meta name='color-scheme' content='dark' />
        <meta name='theme-color' content='black' />
        <link rel='icon' type='image/png' href='/images/favicon.png'></link>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,500;1,300;1,500&family=Nabla&family=Fira+Mono&display=swap'
          rel='stylesheet'
        />
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='afterInteractive'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
