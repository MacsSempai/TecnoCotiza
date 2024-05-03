const request = require('supertest');
const app = require('../index'); 












describe('User API', () =>{
    it('obtener los usuaruios', async () =>{
        const response = await request(app).get('/api/usuarios');
        expect(response.status).toBe(404);
        expect(respones.body).toHaveLength(0);
    });
    //it('crear nuevos usuarios', async ()=>{
      //  const newUsuario={nombre:'jhon', email:'jhon06@gmail.com'};
     //   const response = await request(app)
     //       .post('/api/usuarios')
    //        .send(newUsuario)
     ///   expect(response.status).toBe(201);
     //   expect(response.body).toHaveProperty('nombre', 'jhon');
    //    expect(response.body).toHaveProperty('email','jhon@gmail.com');
    //});
});