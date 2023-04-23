const userModel = require('../models/userModel');
const pagination = require('../utils/pagination');

exports.getUsers = async (ctx) => {
    const { page, pageSize } = ctx.request.query;
    const { offset, limit } = pagination.getPagination(page, pageSize);
    const users = await userModel.getAllUsers(offset, limit);

    if (users.length === 0) {
      ctx.status = 404;
      ctx.body = { message: 'Página não encontrada' };
      return;
    }

    ctx.status = 200;
    ctx.body = users;
};

exports.getUserByName = async (ctx) => {
    const { name } = ctx.params;
    const user = await userModel.getUserByName(name);
    if (!user) {
        ctx.status = 404;
        ctx.body = { message: `O usuário com o nome ${name} não foi encontrado` };
        return;
    }
    ctx.status = 200;
    ctx.body = user;
};

exports.createUser = async (ctx) => {
    const { name, email, idade } = ctx.request.body;
    if(idade < 18) {
        ctx.status = 400;
        ctx.body = { message: "Não é possível criar usuários com menos de 18 anos" }
        return;
    }
    const newUser = await userModel.createUser(name, email, idade);
    ctx.status = 201;
    ctx.body = newUser;
};

exports.updateUser = async (ctx) => {
    const { id } = ctx.params;
    const { name, email, idade } = ctx.request.body;
  
    if(idade < 18) {
      ctx.status = 400;
      ctx.body = { message: "Não é possível atualizar a idade de usuários para menos de 18 anos" };
      return;
    }
  
    try {
      const updatedUser = await userModel.updateUser(id, name, email, idade);
      ctx.status = 200;
      ctx.body = updatedUser;
    } catch (err) {
      ctx.status = 404;
      ctx.body = { message: err.message };
    }
  };  

exports.deleteUser = async (ctx) => {
    const { name } = ctx.params;
    const result = await userModel.deleteUser(name);
    if(!result) {
        ctx.status = 404;
        ctx.body = { message: `O usuário com o nome: ${name} não foi encontrado.` };
        return;
    }
    ctx.status = 204;
}