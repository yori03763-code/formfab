import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", 
        background: '#0f172a', 
        color: '#f1f5f9',
        margin: 0,
        padding: 0,
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
