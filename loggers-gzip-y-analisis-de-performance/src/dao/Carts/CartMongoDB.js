import { ContainerMongoDB } from "../../container/index.js";
import { CartModel } from "../../models/index.js";

export class CartsMongo extends ContainerMongoDB {
    constructor() {
        super({
            name: CartModel.CartCollection,
            schema: CartModel.CartSchema
        });
    }

    async getById(id) {
        try { return await this.model.findById(id).populate('products')
    } catch (error) {
        logger.error(error);
        return response
    }
    }
}