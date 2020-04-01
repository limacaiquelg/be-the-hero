const generateToken = require('../../src/utils/generateToken');

describe('Generate JWT Token', () => {
    it('should generate an unique JWT Token', () => {
        const token = generateToken({ id: 'test' });
        expect(token).toBeTruthy();
    });
});
