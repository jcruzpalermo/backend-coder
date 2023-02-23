import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../../graphql/schemas.js';
import {
    getProducts,
    getProductById,
    createProduct,
    setProduct,
    deleteProduct,
    getMessage,
    createMessage,
} from '../../graphql/resolves.js';
const router = Router();

router.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: {
            getProducts,
            getProductById,
            createProduct,
            setProduct,
            deleteProduct,
            getMessage,
            createMessage,
        },
        graphiql: true,
    })
);

export { router as GraphqlRouter }