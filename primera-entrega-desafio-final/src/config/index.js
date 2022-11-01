import dotenv from "dotenv";
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
    SERVER: {
    PORT: process.env.PORT || 8080,
    },
    DATABASES: {
    filesystem: {
        PRODUCTS_FILENAME,
        CARTS_FILENAME,
    },
    },
};

export { config };