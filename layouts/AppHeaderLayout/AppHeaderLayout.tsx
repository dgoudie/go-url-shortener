import AppHeader from '../../components/AppHeader/AppHeader';
import React from 'react';

interface Props {
  hideProfileBadge?: boolean;
}
export default function AppHeaderLayout({
  children,
  hideProfileBadge = false,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <AppHeader hideProfileBadge={hideProfileBadge} />
      {children}
    </>
  );
}
