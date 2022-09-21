import AppHeader from '../../components/AppHeader/AppHeader';
import AppHeaderLayout from '../../layouts/AppHeaderLayout/AppHeaderLayout';
import Image from 'next/image';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import styles from './Signin.module.scss';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';

const SignIn: NextPageWithLayout = () => {
  const { query } = useRouter();
  const head = useHeadWithTitle('Sign in');
  return (
    <div className={styles.root}>
      {head}
      <button
        type='button'
        onClick={() =>
          signIn('google', { callbackUrl: query.callbackUrl as string })
        }
        className={classNames(styles.signinButton, styles.google)}
      >
        <Image width={18} height={18} alt='Google' src='/images/google.png' />
        <span>Sign in with Google</span>
      </button>
      <button
        type='button'
        onClick={() =>
          signIn('github', { callbackUrl: query.callbackUrl as string })
        }
        className={classNames(styles.signinButton, styles.github)}
      >
        <Image width={18} height={18} alt='GitHub' src='/images/github.png' />
        <span>Sign in with GitHub</span>
      </button>
    </div>
  );
};

SignIn.getLayout = (page) => (
  <>
    <AppHeaderLayout hideProfileBadge={true}>{page}</AppHeaderLayout>
  </>
);

export default SignIn;
