import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function PageWrapper({ children }: React.PropsWithChildren<{}>) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || router.pathname === '/setup') {
      return;
    }
    if (session.status === 'authenticated' && !session.data.isInitialized) {
      router.replace('/setup');
    }
  }, [router, session]);

  return <>{children}</>;
}
