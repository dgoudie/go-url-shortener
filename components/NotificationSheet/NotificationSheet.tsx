import React, { useState } from 'react';

import classNames from 'classnames';
import styles from './NotificationSheet.module.scss';

type Props = {
  type: 'WARNING' | 'ERROR' | 'SUCCESS';
  message: string;
  className?: string;
};

export default function NotificationSheet({ type, message, className }: Props) {
  const [render, setRender] = useState(true);
  if (!render) {
    return null;
  }
  let icon = 'fa-check';
  if (type === 'WARNING') {
    icon = 'fa-warning';
  } else if (type === 'ERROR') {
    icon = 'fa-error';
  }
  return (
    <div className={classNames(className, styles.root, styles[type])}>
      <i className={classNames('fa-solid', icon, styles.indicator)}></i>
      <div className={styles.text}>{message}</div>
      <button type='button' onClick={() => setRender(false)}>
        <i className={classNames('fa-solid fa-xmark', styles.indicator)}></i>
      </button>
    </div>
  );
}
