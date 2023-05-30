import { criptPass, findByEmail, generateJsonToken } from "@/helpers";
import { firestore } from "../db/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const userDbReference = firestore.collection("user");

const CreateUserClient = async (res: NextApiResponse, body: any) => {
  // This data is going to the database
  const bodyToDb = { ...body, password: await criptPass(body.password) };
  // Control if the emailExist in the database
  const emailExist = await findByEmail(body.email);
  if (emailExist) {
    const response = await userDbReference.add(bodyToDb);
    //   Generate JsonWebToken
    const token = generateJsonToken(response.id);
    return res.status(201).json({
      token
    });
  }
  // If the email exist responds with status 409
  return res.status(409).json({
    ok: false,
    msg: "Usuario ya existe crack",
  });
};

export { CreateUserClient };
