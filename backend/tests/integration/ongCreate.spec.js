const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Creating an ONG', () => {
    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection('ongs').truncate();
        await connection.destroy();
    });

    it('should create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            id: 'apadteste',
            password: 'apadsenha',
            name: 'APAD - Teste',
            email: 'contato@teste.com',
            whatsapp: '5547912345678',
            city: 'Rio do Sul',
            uf: 'SC'
        });

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeTruthy();

        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBeTruthy();

        expect(response.body).toHaveProperty('token');
        expect(response.body.token).toBeTruthy();
    });

    it('should fail because of an existing ID', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            id: 'apadteste',
            password: 'apadsenha',
            name: 'APAD - Teste',
            email: 'contato@teste.com',
            whatsapp: '5547912345678',
            city: 'Rio do Sul',
            uf: 'SC'
        });

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('ID is already used.');
    });

    it('should fail because of a malformatted password', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            id: 'apadtestesenha',
            password: 'senha',
            name: 'APAD - Teste de Senha',
            email: 'contato@teste.com',
            whatsapp: '5547912345678',
            city: 'Rio do Sul',
            uf: 'SC'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Password has less than 8 or more than 32 characters.');
    });
});
