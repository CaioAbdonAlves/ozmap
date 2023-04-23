const app = require('./app');
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta: ${PORT}`);
});

module.exports = server;