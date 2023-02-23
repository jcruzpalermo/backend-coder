import { ContainerMongoDB } from "../../container/index.js";
import { ProductModel } from "../../models/index.js";

export class ProductsMongo extends ContainerMongoDB {

    static getInstance() {
        return new ProductsMongo()
    }

    constructor() {

        if (typeof ProductsMongo.instance === 'object') {
            return ProductsMongo.instance
        }


        super({
            name: ProductModel.ProductCollection,
            schema: ProductModel.ProductSchema,
        });

        ProductsMongo.instance = this
        return this
    }
}