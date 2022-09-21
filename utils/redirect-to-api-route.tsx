import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function getServerSideProps(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<{}> {
  return {
    redirect: {
      permanent: true,
      destination: `/api/handle/${encodeURIComponent(context.resolvedUrl)}`,
    },
  };
}

export default function RedirectToApiRoute() {
  return null;
}
