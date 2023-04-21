const userModel = require('../models/userModel');
const pagination = require('../utils/pagination');

exports.getUsers = async (ctx) => {
    const { page, pageSize } = ctx.request.query;
    const { offset, limit } = pagination.getPagination(page, pageSize);
    const users = await userModel.getAllUsers(offset, limit);
    ctx.status = 200;
    ctx.body = users;
};

exports.getUserById = async (ctx) => {
    const { id } = ctx.params;
    const user = await userModel.getUserById(id);
    ctx.status = 200;
    ctx.body = user;
};