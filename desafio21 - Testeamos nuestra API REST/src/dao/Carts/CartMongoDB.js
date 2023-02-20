import { ContainerMongoDB } from "../../container/index.js";
import { CartModel } from "../../models/index.js";

export class CartsMongo extends ContainerMongoDB {

    static getInstance() {
        return new CartsMongo()
    }

    constructor() {

        if(typeof CartsMongo.instance === 'object'){
            return CartsMongo.instance
        }

        super({
            name: CartModel.CartCollection,
            schema: CartModel.CartSchema
        });

        CartsMongo.instance = this
        return this
    }

    async getById(id) {
        const response = await this.model.findById(id).populate('products')
        return response
    }
}