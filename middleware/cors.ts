import { NextApiHandler } from 'next';
import NextCors from 'nextjs-cors';

function withNextCors(
  handler: NextApiHandler,
): NextApiHandler {
  return async function nextApiHandlerWrappedWithNextCors(req, res) {
    console.log("Estoy pasando primero por el handler por cors ")
    const methods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];
    await NextCors(req, res, {
      methods,
      origin: "*",
      optionsSuccessStatus: 200,
    });

    return handler(req, res);
  };
}

export {
    withNextCors
}