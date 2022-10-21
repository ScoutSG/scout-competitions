import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).end()
    } else {
        switch(req.method) {
            case "GET":
                const user = await prisma.user.findUnique({
                    where: {
                        id: session.user.id
                    }
                });
                res.status(200).json(user);
                break;
            case "PATCH":
                const updateUser = await prisma.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: req.body
                });
                res.status(200).json(updateUser);
                break;
        }
    }
}