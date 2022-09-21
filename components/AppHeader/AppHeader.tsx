import Link from 'next/link';
import ProfileBadgeAndOptions from '../ProfileBadgeAndOptions/ProfileBadgeAndOptions';
import React from 'react';
import classNames from 'classnames';
import styles from './AppHeader.module.scss';

interface Props {
  className?: string;
  hideProfileBadge?: boolean;
}

export default function AppHeader({
  className,
  hideProfileBadge = false,
}: Props) {
  return (
    <header className={classNames(styles.topBar, className)}>
      <Link href={'/console/links'}>
        <a className={styles.topBarTitle} draggable='false'>
          Go URL Shortener
        </a>
      </Link>
      {!hideProfileBadge && (
        <ProfileBadgeAndOptions className={styles.profileBadge} />
      )}
    </header>
  );
}
