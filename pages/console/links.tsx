import AppHeaderLayout from '../../layouts/AppHeaderLayout/AppHeaderLayout';
import { NextPageWithLayout } from '../_app';
import RouteLoader from '../../components/RouteLoader/RouteLoader';
import { useHeadWithTitle } from '../../utils/use-head-with-title';

const Links: NextPageWithLayout = () => {
  const head = useHeadWithTitle('Your Links');

  return (
    <>
      {head}
      <RouteLoader text='Setting Up Your Account. Please Wait' />
    </>
  );
};

Links.getLayout = (page) => <AppHeaderLayout>{page}</AppHeaderLayout>;

export default Links;
