const request = require('supertest');
const app = require('../../backend/index'); 

//testeo get de usuarios
describe('Get usuario', () =>{
    it('obtener los usuaruios', async () =>{
        const response = (await request(app).get('/usuarios').send());
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(13);
    });
    
});