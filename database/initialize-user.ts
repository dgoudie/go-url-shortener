import prisma from './prisma';

export const initializeUserDataIfNecessary = async (
  hashedEmail: string
): Promise<void> => {
  if (await prisma.user.findFirst({ where: { email: hashedEmail } })) {
    return;
  }
  await prisma.user.create({
    data: {
      email: hashedEmail,
    },
  });
};
