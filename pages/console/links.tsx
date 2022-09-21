import { useCallback, useEffect, useState, useTransition } from 'react';

import AppHeaderLayout from '../../layouts/AppHeaderLayout/AppHeaderLayout';
import { GoLink } from '@prisma/client';
import { GoLinksMetadata } from '../api/links_metadata';
import LargeSearchInput from '../../components/LargeSearchInput/LargeSearchInput';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import NotificationSheet from '../../components/NotificationSheet/NotificationSheet';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import ThreeDotLoader from '../../components/ThreeDotLoader/ThreeDotLoader';
import classNames from 'classnames';
import styles from './Links.module.scss';
import { useFetchJSON } from '../../utils/fetch-json';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUrlSearchParamsFromQuery from '../../utils/use-url-search-params-from-query';

const Links: NextPageWithLayout = () => {
  const head = useHeadWithTitle('Your Links');

  const { query, replace, isReady } = useRouter();

  const urlSearchParams = useUrlSearchParamsFromQuery(query);

  const fetcher = useFetchJSON();

  const [links, setLinks] = useState<GoLink[] | null>(null);

  const {
    data,
    error: linksError,
    mutate: mutateLinks,
  } = useSWR<GoLink[]>(
    isReady && `/api/links?search=${urlSearchParams.get('search') ?? ''}`,
    fetcher
  );

  const [_pending, startTransition] = useTransition();

  useEffect(() => {
    if (!!data) {
      startTransition(() => {
        setLinks(data);
      });
    }
  }, [data]);

  const navigate = useCallback(
    (key: string, newValue: string | undefined | null) => {
      const params = new URLSearchParams(urlSearchParams);
      if (!!newValue) {
        params.set(key, newValue);
      } else {
        params.delete(key);
      }
      replace(`/console/links?${params.toString()}`);
    },
    [replace, urlSearchParams]
  );

  const [notFoundLinkName, setNotFoundLinkName] = useState<string>();

  useEffect(() => {
    const notFoundLinkName = urlSearchParams.get('not_found');
    if (!!notFoundLinkName) {
      setNotFoundLinkName(notFoundLinkName);
      navigate('not_found', null);
    }
  }, [navigate, urlSearchParams]);

  const [createdLinkName, setCreatedLinkName] = useState<string>();

  useEffect(() => {
    const createdLinkName = urlSearchParams.get('created');
    if (!!createdLinkName) {
      setCreatedLinkName(createdLinkName);
      navigate('created', null);
    }
  }, [navigate, urlSearchParams]);

  const {
    data: linksMetadata,
    error: linksMetadataError,
    mutate: mutateMeta,
  } = useSWR<GoLinksMetadata>(`/api/links_metadata`, fetcher);

  const deleteLink = useCallback(
    async (id: string) => {
      await fetch(`/api/link?id=${id}`, { method: 'DELETE' });
      mutateLinks();
      mutateMeta();
    },
    [mutateLinks, mutateMeta]
  );

  if (linksError) throw linksError;
  if (linksMetadataError) throw linksMetadataError;

  let linksMetadataMarkup = (
    <>
      <div>&nbsp;</div>
      <ThreeDotLoader />
    </>
  );

  if (!!linksMetadata) {
    linksMetadataMarkup = (
      <div className={styles.metadataItems}>
        <div>
          <i className='fa-solid fa-code'></i> {linksMetadata.count} links
        </div>
        <div>
          <i className='fa-solid fa-hashtag'></i> {linksMetadata.hits} total
          hits
        </div>
      </div>
    );
  }

  let linksMarkup = <RouteLoader />;

  if (!!links) {
    linksMarkup = (
      <>
        {links.map((link) => (
          <LinkItem
            link={link}
            key={link.id}
            onDelete={() => deleteLink(link.id)}
          />
        ))}
      </>
    );
  }

  return (
    <div className={styles.root}>
      {head}
      {notFoundLinkName && (
        <NotificationSheet
          type='WARNING'
          message={`A link with the name '${notFoundLinkName}' was not found.`}
        />
      )}
      {createdLinkName && (
        <NotificationSheet
          type='SUCCESS'
          message={`Link '${createdLinkName}' created.`}
        />
      )}
      <div className={styles.metadata}>
        <h1>Your Links</h1>
        {linksMetadataMarkup}
      </div>
      <div className={styles.header}>
        <LargeSearchInput
          className={styles.headerSearch}
          placeholder='Search links...'
          defaultValue={urlSearchParams.get('search') ?? ''}
          onInput={(event) => {
            navigate('search', (event.target as HTMLInputElement).value);
          }}
        />
        <Link href={'/console/link'}>
          <a className='standard-button primary'>
            <i className='fa-solid fa-link'></i>
            Create Link
          </a>
        </Link>
      </div>
      <div className={styles.links}>{linksMarkup}</div>
    </div>
  );
};

Links.getLayout = (page) => <AppHeaderLayout>{page}</AppHeaderLayout>;

export default Links;

type LinkItemProps = {
  link: GoLink;
  onDelete: () => void;
};

function LinkItem({ link, onDelete }: LinkItemProps) {
  const [deleting, setDeleting] = useState(false);

  const onDeleteWrapper = useCallback(() => {
    setDeleting(true);
    onDelete();
  }, [onDelete]);

  return (
    <div className={classNames(styles.link, deleting && styles.deleting)}>
      <a
        href={link.full_link}
        target='_blank'
        rel='noreferrer'
        className='left'
      >
        <div className={styles.name}>
          <i className='fa-solid fa-arrow-up-right-from-square'></i>
          <div className={styles.text}>{link.short_name}</div>
        </div>
        <div className={styles.href}>{link.full_link}</div>
      </a>
      <div className='right'>
        <button type='button' onClick={onDeleteWrapper}>
          <div className='fa-solid fa-xmark'></div>
        </button>
      </div>
    </div>
  );
}
