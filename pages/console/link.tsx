import * as Yup from 'yup';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';

import AppHeaderLayout from '../../layouts/AppHeaderLayout/AppHeaderLayout';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import NotificationSheet from '../../components/NotificationSheet/NotificationSheet';
import classNames from 'classnames';
import styles from './Link.module.scss';
import { useHeadWithTitle } from '../../utils/use-head-with-title';
import { useRouter } from 'next/router';
import { validateUrl } from '../../utils/validate-url';

const LinkSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[\w\-_]+$/,
      'Name must only contain letters, numbers, underscores, and hyphens.'
    )
    .max(128, 'Name cannot be more than 128 characters.')
    .required('Name is required.'),
  link: Yup.string()
    .test({
      name: 'valid-url',
      test(value, ctx) {
        if (!validateUrl(value)) {
          return ctx.createError({ message: 'Link must be a valid URL.' });
        }
        return true;
      },
    })
    .required('Link is required.'),
});

const CreateLink: NextPageWithLayout = () => {
  const head = useHeadWithTitle('Create Link');
  const router = useRouter();

  const [showAlreadyExistsError, setShowAlreadyExistsError] = useState(false);

  return (
    <div className={styles.root}>
      {head}
      {showAlreadyExistsError && (
        <NotificationSheet
          type='WARNING'
          message={`A link with this name already exists.`}
        />
      )}
      <h1>Create a New Link</h1>
      <Formik
        initialValues={{
          name: '',
          link: '',
        }}
        initialErrors={{ name: 'required' }}
        validationSchema={LinkSchema}
        onSubmit={async (values) => {
          setShowAlreadyExistsError(false);
          const response = await fetch(`/api/link`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(values),
          });
          if (response.ok) {
            router.push(`/console/links?created=${values.name}`);
            return;
          }
          if (response.status === 409) {
            setShowAlreadyExistsError(true);
          } else {
            throw response;
          }
        }}
      >
        {({ isValid, values }) => {
          return (
            <Form className={styles.form}>
              <div className={styles.control}>
                <label htmlFor='name'>Name</label>
                <Field id='name' name='name' placeholder='example' />
                <ErrorMessage
                  name='name'
                  className={styles.fieldError}
                  component='div'
                />
              </div>
              <div className={styles.control}>
                <label htmlFor='link'>Link</label>
                <Field
                  id='link'
                  name='link'
                  placeholder='https://example.com'
                  type='url'
                />
                <ErrorMessage
                  name='link'
                  className={styles.fieldError}
                  component='div'
                />
              </div>
              <Summary valid={isValid} name={values.name} link={values.link} />
              <div className={styles.actions}>
                <Link href='/console/links'>
                  <a className='standard-button'>
                    <i className='fa-solid fa-xmark'></i> Cancel
                  </a>
                </Link>
                <button
                  disabled={!isValid}
                  type='submit'
                  className='standard-button primary'
                >
                  <i className='fa-solid fa-save'></i> Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

CreateLink.getLayout = (page) => <AppHeaderLayout>{page}</AppHeaderLayout>;

export default CreateLink;

type SummaryProps = {
  valid: boolean;
  name: string;
  link: string;
};

function Summary({ valid, name, link }: SummaryProps) {
  const [origin, setOrigin] = useState('');

  const [parameter1Value, setParameter1Value] = useState('EXAMPLE_PARAMETER_1');
  const [parameter2Value, setParameter2Value] = useState('EXAMPLE_PARAMETER_2');

  const hasParameter1 = useMemo(() => link.includes('%1'), [link]);
  const hasParameter2 = useMemo(
    () => hasParameter1 && link.includes('%2'),
    [hasParameter1, link]
  );

  useEffect(() => {
    setParameter1Value('EXAMPLE_PARAMETER_1');
  }, [hasParameter1]);

  useEffect(() => {
    setParameter2Value('EXAMPLE_PARAMETER_2');
  }, [hasParameter2]);

  useEffect(() => {
    setOrigin(location.origin);
  }, []);

  if (!valid) {
    return null;
  }

  if (hasParameter1) {
    link = link.replace('%1', encodeURIComponent(parameter1Value));
  }

  if (hasParameter2) {
    link = link.replace('%2', encodeURIComponent(parameter2Value));
  }

  return (
    <div className={styles.summary}>
      <div>Visiting</div>
      <span className={styles.href}>
        {origin}/{name}
        {hasParameter1 && (
          <span className={classNames(styles.parameterSpan, styles.parameter1)}>
            /
            <span
              role='textbox'
              spellCheck={false}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(event) =>
                setParameter1Value((event.target as HTMLSpanElement).innerText)
              }
            >
              EXAMPLE_PARAMETER_1
            </span>
          </span>
        )}
        {hasParameter2 && (
          <span className={classNames(styles.parameterSpan, styles.parameter2)}>
            /
            <span
              role='textbox'
              spellCheck={false}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(event) =>
                setParameter2Value((event.target as HTMLSpanElement).innerText)
              }
            >
              EXAMPLE_PARAMETER_2
            </span>
          </span>
        )}
      </span>{' '}
      <div>will take you to</div> <span className={styles.href}>{link}</span>
    </div>
  );
}
