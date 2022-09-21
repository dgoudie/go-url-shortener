import { NextApiHandler } from 'next';
import { getUserId } from '../../utils/get-user-id';
import prisma from '../../database/prisma';

export type GoLinksMetadata = {
  count: number;
  hits: number;
};

const handler: NextApiHandler = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) {
    res.status(401);
    return;
  }
  const count = await prisma.goLink.count({
    where: { user_id },
  });
  const sumResult = await prisma.goLink.aggregate({
    where: { user_id },
    _sum: {
      hits: true,
    },
  });
  res.send({ count, hits: sumResult._sum.hits });
};
export default handler;
