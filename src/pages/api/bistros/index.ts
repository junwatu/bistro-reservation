import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bistroValidationSchema } from 'validationSchema/bistros';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBistros();
    case 'POST':
      return createBistro();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBistros() {
    const data = await prisma.bistro
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bistro'));
    return res.status(200).json(data);
  }

  async function createBistro() {
    await bistroValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.order?.length > 0) {
      const create_order = body.order;
      body.order = {
        create: create_order,
      };
    } else {
      delete body.order;
    }
    if (body?.reservation?.length > 0) {
      const create_reservation = body.reservation;
      body.reservation = {
        create: create_reservation,
      };
    } else {
      delete body.reservation;
    }
    const data = await prisma.bistro.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
