import { NextApiHandler } from 'next';
import { Prisma } from '@prisma/client';
import { getUserId } from '../../utils/get-user-id';
import prisma from '../../database/prisma';

const handler: NextApiHandler = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) {
    res.status(401);
    return;
  }
  let search: string | undefined = undefined;
  if (typeof req.query.search === 'string') {
    search = req.query.search;
  }
  let filters: Prisma.GoLinkWhereInput[] = [{ user_id }];
  if (search) {
    filters.push({
      AND: search
        .split(/\s/)
        .map((token) => ({
          short_name: { contains: token, mode: 'insensitive' },
        })),
    });
  }
  const links = await prisma.goLink.findMany({
    where: {
      AND: filters,
    },
    orderBy: { short_name: 'asc' },
  });
  res.send(links);
};
export default handler;
