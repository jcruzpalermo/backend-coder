import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { config } from '../config/index.js'
import { app } from '../../server.js';

before((done) => {
    mongoose.connect(config.DATABASE.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected with MongoDB.');
            done();
        })
        .catch((error) => {
            console.log('Error to connect with MongoDB:', error);
            done(error);
        });
});

after((done) => {
    mongoose.connection.close()
        .then(() => {
            console.log('Disconected MongoDB.');
            done();
        })
        .catch((error) => {
            console.log('Error to disconect MongoDB:', error);
            done(error);
        });
});


describe('Test de API de productos', () => {
    let id = '63f133be06809230a35a2afa'


    it('Debe devolver una lista de productos', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).to.equal(200);

    });

    it('Debe crear un nuevo producto', async () => {
        const productExample = {
            title: 'super test',
            description: 'test con super test',
            code: 'feb23',
            price: 586,
            thumbnail: 'img.jpg',
            stock: 1
        }

        const res = await request(app)
            .post('/api/products/create-product')
            .send(productExample)
        expect(res.statusCode).to.equal(302);
    });

    it('Debe devolver un producto existente', async () => {
        const res = await request(app).get(`/api/products/${id}`);
        expect(res.statusCode).to.equal(200);
    });

    it('Debe eliminar un producto existente', async () => {
        const res = await request(app).delete(`/api/products/${id}`);
        expect(res.statusCode).to.equal(200);
    });
});