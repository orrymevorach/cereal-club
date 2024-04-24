import Head from 'next/head';

export default function Meta({ title = '' }) {
  const tabTitle = `Cereal Club ${title ? `| ${title}` : ''}`;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="Cereal Club" />
      <title>{tabTitle}</title>
      <link rel="icon" href="/icon.jpg" />
      <meta name="keywords" content="Cereal Club" />
    </Head>
  );
}
