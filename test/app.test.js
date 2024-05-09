/*
.send({
    "name": "Menganito",
    "rol":"miembro",
    "email": "user25@testt.com" ,
    "password": "HolaMundo.01",
    "edad": 20,
    "ciudad": "Barcelona",
    "intereses": ["Padel", "Fauna"],
    "permiteRecibirOfertas": true 
})
*/
const request = require('supertest');
const app = require('../index')

describe('users', () => {
    var token = ""
    var id = ""

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/control/register')
            .send({
                "name": "Menganito",
                "rol":"miembro",
                "email": "user25@testt.com" ,
                "password": "HolaMundo.01",
                "edad": 20,
                "ciudad": "Barcelona",
                "intereses": ["Padel", "Fauna"],
                "permiteRecibirOfertas": true 
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.control.name).toEqual('Menganito')
        expect(response.body.control.email).toEqual('user25@test.com')
        expect(response.body.control.rol).toEqual('miembro')

        token = response.body.token
        id = response.body.control._id
    })

    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/control/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })

})