import { NextApiHandler } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { getUserId } from '../../utils/get-user-id';
import prisma from '../../database/prisma';
import { validateUrl } from '../../utils/validate-url';

const handler: NextApiHandler = async (req, res) => {
  const user_id = await getUserId(req, res);
  if (!user_id) {
    res.status(401);
    return;
  }
  switch (req.method) {
    case 'POST': {
      const { name, link } = req.body;
      if (!validateName(name) || !validateUrl(link)) {
        res.status(400).end();
        return;
      }
      try {
        await prisma.goLink.create({
          data: { user_id, short_name: name, full_link: link },
        });
        res.end();
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
          res.status(409).end();
        } else {
          throw e;
        }
      }
      return;
    }
    case 'DELETE': {
      const id = req.query.id;
      if (typeof id !== 'string') {
        res.status(400).end();
        return;
      }
      await prisma.goLink.deleteMany({
        where: { user_id, id },
      });
      res.status(204).end();
    }
    default: {
      res.status(405);
      return;
    }
  }
};
export default handler;

function validateName(name: string) {
  if (typeof name !== 'string') {
    return false;
  }
  if (!name.match(/^[\w\-_]+$/)) {
    return false;
  }
  return true;
}
