const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJsonSchema = require('chai-json-schema');
const app = require('../src/server');
const userModel = require('../src/models/userModel');

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const expect = chai.expect;

describe('Testes da API de Usuários', () => {

  let userId = null;

    describe('Testes de Aplicação', () => {
        
        it('O servidor esta online', async () => {
            const res = await chai.request(app).get('/users');
            expect(res).to.have.status(200);
        });

        it('Deve retornar uma lista vazia de usuários', async () => {
            const res = await chai.request(app).get('/users');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            const rows = res.body.rows ?? [];
            expect(rows).to.eql([]);
        });
    });
    });

    describe('Testes de Criação, Remoção, Atualização e Busca', () => {
        it('Deve criar um novo usuário (raupp) com idade maior ou igual a 18 anos', async () => {
        const user = { name: 'raupp', email: 'jose.raupp@devoz.com.br', idade: 35 };
        const res = await chai.request(app).post('/users').send(user);
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name').to.equal(user.name);
        expect(res.body).to.have.property('email').to.equal(user.email);
        expect(res.body).to.have.property('idade').to.equal(user.idade);
        userId = res.body.id;
        });

        it('Deve criar 15 usuários', async () => {
            const numUsers = 15;
            const users = [];
          
            for (let i = 0; i < numUsers; i++) {
              const res = await chai.request(app)
                .post('/users')
                .send({
                  name: `User ${i+1}`,
                  email: `user${i+1}@example.com`,
                  idade: 20 + i
                });
          
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(res.body).to.have.property('name').equal(`User ${i+1}`);
              expect(res.body).to.have.property('email').equal(`user${i+1}@example.com`);
              expect(res.body).to.have.property('idade').equal(20+i);
          
              users.push(res.body);
            }
          
            expect(users).to.have.lengthOf(numUsers);
          });          

        it('Deve retornar erro 404 ao buscar usuário inexistente', async () => {
            const res = await chai.request(app).get('/users/naoExiste');
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.have.property('message').to.equal('O usuário com o nome naoExiste não foi encontrado');
        });

        it('Deve retornar o usuário com o nome raupp', async () => {
            const res = await chai.request(app).get('/users/raupp');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('name').to.equal('raupp');
            expect(res.body).to.have.property('email').to.equal('jose.raupp@devoz.com.br');
            expect(res.body).to.have.property('idade').to.equal(35);
        });

        it('Deve excluir o usuário com o nome raupp', async () => {
            const res = await chai.request(app).delete('/users/raupp');
            expect(res).to.have.status(404);
            expect(res).to.be.json;
        });

        it('O usuário raupp não deve mais existir no sistema', async () => {
            const res = await chai.request(app).get('/users/raupp');
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.have.property('message').to.equal('O usuário com o nome raupp não foi encontrado');
        });

        it('Deve retornar erro 400 ao criar usuário com idade menor que 18 anos', async () => {
            const user = { name: 'Lucas', email: 'lucas@teste.com', idade: 16 };
            const response = await chai.request(app)
            .post('/users')
            .send(user);
            expect(response).to.have.status(400);
        });

        it('Deve retornar uma lista com pelo menos 5 usuários', async () => {
            const res = await chai.request(app).get('/users');
            expect(res).to.have.status(200);
            expect(res.body.length).to.be.at.least(5);
        });
        
        });

    describe('Testes de Paginação', () => {
    it('Deve retornar os usuários na primeira página com 10 itens', async () => {
        const res = await chai.request(app).get('/users').query({ page: 1, pageSize: 10 });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(10); // verificando se o número de itens é igual ao pageSize
    });

    it('Deve retornar os usuários na segunda página com 5 itens', async () => {
        const res = await chai.request(app).get('/users').query({ page: 2, pageSize: 5 });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(5); // verificando se o número de itens é igual ao pageSize
    });

    it('Deve retornar uma mensagem de erro se a página solicitada não existir', async () => {
        const res = await chai.request(app).get('/users').query({ page: 1000, pageSize: 10 });
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ message: 'Página não encontrada' });
    });
    });

      });
