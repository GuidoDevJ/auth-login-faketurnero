import { firestore } from "../db/firebase";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY || "";
const saltRounds = 10;

// -----> Find Email in the database
const findByEmail=async (email:string)=>{
    console.log("Entrando a findByEmail")
        // Control if the email exist
        const emailExist = await firestore.collection("user").where("email","==",email).get()
        return emailExist.empty
}

// -----> Encriptar el password
const criptPass = async (pass: string) => {
  const res = await bcrypt.hash(pass, saltRounds);
  return res;
};

// -----> Comparar dos contraseñas

const compareTwoPasswords= async(pass:string,passEncrypted:string)=>{
  const res = await bcrypt.compare(pass,passEncrypted)
  console.log(res)

}

// -----> Generar un JsonWebToken
const generateJsonToken = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "2 days",
  });
  return token;
};
// -----> Decodificar un token
const decoedToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return false;
  }
};
// -----> Obtener el token desde el header
const getBearerTokenFromHeader = (authToken: string) => {
  return authToken.split(" ")[1];
};

// -----> Descifrar el id
const getToken = (authorization: string) => {
  const token = getBearerTokenFromHeader(authorization as string);
  const result = decoedToken(token);
  return result;
};

export {
  criptPass,
  generateJsonToken,
  decoedToken,
  getBearerTokenFromHeader,
  getToken,
  findByEmail,
  compareTwoPasswords
};
