import Head from 'next/head';
import { useMemo } from 'react';

export function useHeadWithTitle(title: string) {
  const titleWithAppName = useMemo(
    () => `${title} | Go URL Shortener`,
    [title]
  );
  return (
    <Head>
      <title>{titleWithAppName}</title>
    </Head>
  );
}
