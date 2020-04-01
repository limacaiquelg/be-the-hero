const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const numberOfRegisters = 3;

describe('Listing all ONGs', () => {
    beforeAll(async () => {
        for (let i = 1; i <= numberOfRegisters; i++){
            await connection('ongs').insert({
                id: 'ong' + i,
                password: 'senha' + i + 'ong',
                name: 'ONG #' +  i + ' - Teste',
                email: 'contato@ong.com',
                whatsapp: '5547912345678',
                city: 'São Paulo',
                uf: 'SP'
            });
        }
    });

    afterAll(async () => {
        await connection('ongs').truncate();
        await connection.destroy();
    });

    it('should list all ONGs', async () => {
        const response = await request(app).get('/ongs').send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(numberOfRegisters);

        for (let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('id');
            expect(response.body[i]).toHaveProperty('password');
            expect(response.body[i]).toHaveProperty('name');
            expect(response.body[i]).toHaveProperty('email');
            expect(response.body[i]).toHaveProperty('whatsapp');
            expect(response.body[i]).toHaveProperty('city');
            expect(response.body[i]).toHaveProperty('uf');
        }
    });
});
