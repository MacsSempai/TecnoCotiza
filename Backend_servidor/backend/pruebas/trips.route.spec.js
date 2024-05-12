const request = require('supertest');
const app = require('../../backend/index'); 

//testeo get de usuarios
describe('Get usuario', () =>{
    it('obtener los usuaruios', async () =>{
        const response = (await request(app).get('/usuarios').send());
        expect(response.status).toBe(200);//se esprea esteresultado para saver si esta funcionando Get
        expect(response.body).toHaveLength(13);// la cantidad de resultado que se espra que se muestre
    });
    
});