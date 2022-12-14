import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './ProfileBadgeAndOptions.module.scss';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

export default function ProfileBadgeAndOptions({ className }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const closeDetails = useCallback(() => {
    detailsRef.current && (detailsRef.current.open = false);
  }, [detailsRef]);

  if (status === 'loading') {
    return <></>;
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <button
        className={classNames(className, styles.button)}
        onClick={() => signIn()}
      >
        <i className='fa-solid fa-right-to-bracket'></i>
        Sign in
      </button>
    );
  }
  return (
    <details className={classNames(styles.details, className)} ref={detailsRef}>
      <summary className={styles.button}>
        {session.user!.name!}
        <Image
          alt={session.user!.name!}
          src={session.user!.image!}
          width={24}
          height={24}
          className={styles.profilePicture}
        />
      </summary>
      <div className={styles.detailsBody}>
        <button
          onClick={() => {
            signOut({ callbackUrl: '/console/links' });
            closeDetails();
          }}
        >
          <i className='fa-solid fa-right-from-bracket'></i>
          Log Out
        </button>
      </div>
    </details>
  );
}
