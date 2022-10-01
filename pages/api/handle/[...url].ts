import { NextApiHandler } from 'next';
import { getUserId } from '../../../utils/get-user-id';
import prisma from '../../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) {
    res
      .redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(req.url!)}`)
      .end();
    return;
  }
  const url: string[] = req.query.url as string[];

  const [short_name, param_1, param_2] = url;

  const goLinkWithParams = await prisma.goLink.findFirst({
    where: { user_id, short_name },
  });

  if (!goLinkWithParams) {
    res
      .redirect(`/console/links?not_found=${encodeURIComponent(short_name)}`)
      .end();
    return;
  }
  await prisma.goLink.update({
    where: { id: goLinkWithParams.id },
    data: { hits: { increment: 1 } },
  });

  let urlFromDatabase = goLinkWithParams.full_link;

  urlFromDatabase = urlFromDatabase.replaceAll(
    '%1',
    !!param_1 ? encodeURIComponent(param_1) : ''
  );
  urlFromDatabase = urlFromDatabase.replaceAll(
    '%2',
    !!param_2 ? encodeURIComponent(param_2) : ''
  );
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
  res.redirect(301, urlFromDatabase).end();
};
export default handler;
