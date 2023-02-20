import { ContainerMongoDB } from "../../container/index.js";
import { UserModel } from "../../models/index.js";

export class UsersMongo extends ContainerMongoDB {

    static getInstance() {
        return new UsersMongo()
    }

    constructor() {

        if(typeof UsersMongo.instance === 'object'){
            return UsersMongo.instance
        }

        super({
            name: UserModel.UserCollection,
            schema: UserModel.UserSchema,
        });
        
        UsersMongo.instance = this
        return this
    }
}