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
  const url: string = req.query.url as string;
  if (typeof url !== 'string') {
    res.status(400).end();
    return;
  }
  const [short_name, param_1, param_2] = url
    .split('/')
    .filter((segment) => !!segment?.length);

  const goLinkWithParams = await prisma.goLink.findFirst({
    where: { user_id, short_name },
    include: { params: { orderBy: { path_parameter_number: 'asc' } } },
  });

  if (!goLinkWithParams) {
    res
      .redirect(`/console/links?not_found=${encodeURIComponent(short_name)}`)
      .end();
    return;
  }
  const parsedUrl = new URL(goLinkWithParams.full_link);
  const params = new URLSearchParams(parsedUrl.searchParams);
  Array.from(parsedUrl.searchParams.keys()).forEach((key) =>
    parsedUrl.searchParams.delete(key)
  );
  if (!!param_1 && !!goLinkWithParams.params[0]) {
    params.set(goLinkWithParams.params[0].query_parameter_name, param_1);
  }
  if (!!param_2 && !!goLinkWithParams.params[1]) {
    params.set(goLinkWithParams.params[1].query_parameter_name, param_2);
  }
  res.redirect(`${parsedUrl}?${params.toString()}`).end();
};
export default handler;
