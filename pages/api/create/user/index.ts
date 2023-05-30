import { NextApiRequest, NextApiResponse } from "next"

const CreateUser= (req:NextApiRequest,res:NextApiResponse) => {
    res.json("Hola desde createUser")
}

export default CreateUser