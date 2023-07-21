import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bistroValidationSchema } from 'validationSchema/bistros';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.bistro
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBistroById();
    case 'PUT':
      return updateBistroById();
    case 'DELETE':
      return deleteBistroById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBistroById() {
    const data = await prisma.bistro.findFirst(convertQueryToPrismaUtil(req.query, 'bistro'));
    return res.status(200).json(data);
  }

  async function updateBistroById() {
    await bistroValidationSchema.validate(req.body);
    const data = await prisma.bistro.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteBistroById() {
    const data = await prisma.bistro.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
