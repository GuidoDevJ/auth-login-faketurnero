import { firestore } from "@/db/firebase";
import { findByEmail } from "@/helpers";
import { withNextCors } from "@/middleware/cors";
import { schemaValidation } from "@/middleware/schemaValidation";
import { CreateUserClient } from "@/services/user";
import { NextApiRequest, NextApiResponse } from "next";

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  await CreateUserClient(res,body)
};

const handlerSchema = schemaValidation(CreateUser);

export default withNextCors(handlerSchema);
