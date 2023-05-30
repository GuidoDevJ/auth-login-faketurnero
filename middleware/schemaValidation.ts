import { USER } from "@/schemas/user";
import { NextApiHandler } from "next";

function schemaValidation(
    handler: NextApiHandler,
  ): NextApiHandler {
    return async function controlSchema(req, res) {
      console.log("Luego por el handler por el schema")
      USER.validate(req.body)  
        .then(()=>{

            return handler(req, res);
        })
        .catch(validationError=>{
            res.status(400).json({
                error:validationError.errors
            })
        })
    };
  }
export {
    schemaValidation
}