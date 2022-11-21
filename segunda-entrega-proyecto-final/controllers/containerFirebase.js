import admin from "firebase-admin";
import  ServiceAccount  from "../segunda-entrega-proyecto-43c35-firebase-adminsdk-rymgw-57652584d8.json";
admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });
import { getFirestore } from "firebase-admin/firestore";

class Container {
	constructor() {
		this.db = getFirestore();
	}
	//Save an object
	save(obj) {
		try {
			return this.db.collection('products').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	//Get an object by ID
	getById(id) {
		try {
			const data = this.db.doc(`/products/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	//Get all objects
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	//Delete one object
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

export default Container;