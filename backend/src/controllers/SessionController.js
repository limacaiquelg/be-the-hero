const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generateToken');

module.exports = {
    async create(request, response) {
        const { id, password } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select(['id', 'name', 'password'])
            .first();

        if (!ong) {
            return response.status(400).json({ error: 'ONG not found.' });
        }

        if(!await bcrypt.compare(password, ong.password)) {
            return response.status(400).json({ error: 'Invalid password.' });
        }

        return response.json({
            id: ong.id,
            name: ong.name,
            token: generateToken({ id: ong.id })
        });
    }
}
