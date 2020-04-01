const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generateToken');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { id, password, name, email, whatsapp, city, uf } = request.body;

        const idAlreadyExists = await connection('ongs')
            .where('id', id)
            .select('id')
            .first();

        if(idAlreadyExists) {
            return response.status(403).json({ error: 'ID is already used.'});
        }

        if(password.length < 8 || password.length > 32) {
            return response.status(400).json({
                error: 'Password has less than 8 or more than 32 characters.'
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await connection('ongs').insert({
            id,
            password: encryptedPassword,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({
            id,
            name,
            token: generateToken({ id: id })
        });
    },

    async verifyId(request, response){
        const { id } = request.params;

        const idAlreadyExists = await connection('ongs')
            .where('id', id)
            .select('id')
            .first();

        if (idAlreadyExists) {
            response.json({ exists: true });
        } else {
            response.json({ exists: false });
        }
    }
}
