const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Verifying if an ID is already used by an ONG', () => {
    beforeAll(async () => {
        await connection('ongs').insert({
            id: 'apadteste',
            password: 'apadsenha',
            name: 'APAD - Teste',
            email: 'contato@teste.com',
            whatsapp: '5547912345678',
            city: 'Rio do Sul',
            uf: 'SC'
        });
    });

    afterAll(async () => {
        await connection('ongs').truncate();
        await connection.destroy();
    });

    it('should verify if the ID passed exists and return true', async () => {
        const response = await request(app)
        .get('/ongs/verifyId/apadteste')
        .send();

        expect(response.body).toHaveProperty('exists');
        expect(response.body.exists).toBe(true);
    });

    it('should verify if the ID passed exists and return false', async () => {
        const response = await request(app)
        .get('/ongs/verifyId/outraong')
        .send();

        expect(response.body).toHaveProperty('exists');
        expect(response.body.exists).toBe(false);
    });
});
