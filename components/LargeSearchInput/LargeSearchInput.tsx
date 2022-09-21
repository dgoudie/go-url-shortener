import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import styles from './LargeSearchInput.module.scss';

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function LargeSearchInput({ className, ...props }: Props) {
  return (
    <div className={classNames(styles.root, className)}>
      <i className='fa-solid fa-search' />
      <input className={styles.input} {...props} />
    </div>
  );
}
