import { firestore } from "@/db/firebase";
import { compareTwoPasswords, findByEmail, generateJsonToken } from "@/helpers";
import { NextApiRequest, NextApiResponse } from "next";
const userDbReference = firestore.collection("user");

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  userDbReference
    .where("email", "==", body.email)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot) {
        return res.status(404).json({
          ok: false,
          msg: "Lo siento pero tu email no existe en la base de datos",
        });
      }
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const token = generateJsonToken(doc.id);
        const data = doc.data();
        compareTwoPasswords(body.password,data.email)
        //    Generate JsonWebToken
        res.status(200).json({...data,token});
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
export default Auth;
