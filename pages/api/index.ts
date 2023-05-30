import { NextApiRequest, NextApiResponse } from "next"

const Home= (req:NextApiRequest,res:NextApiResponse) => {
    res.json("hola")
}

export default Home