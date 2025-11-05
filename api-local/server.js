const path = require('path');
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const dbFile = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbFile);


app.use(cors());
app.use(jsonServer.bodyParser);


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Local - Rolê App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #210b34;
            color: #fff;
            padding: 30px;
            line-height: 1.6;
          }
          h1 { color: #f72585; }
          code {
            background: rgba(255,255,255,0.1);
            padding: 4px 8px;
            border-radius: 4px;
          }
          a {
            color: #5BC0EB;
            text-decoration: none;
          }
          a:hover { text-decoration: underline; }
          ul { margin-top: 10px; }
        </style>
      </head>
      <body>
        <h1> API Local - Rolê App</h1>
        <p>Bem-vindo à API local do projeto <strong>Rolê</strong>!</p>

        <h2> Endpoints disponíveis</h2>
        <ul>
          <li><a href="/users">GET /users</a> — lista de usuários</li>
          <li><a href="/roles">GET /roles</a> — lista de rolês</li>
          <li>POST /login — autenticação (JSON body com <code>email</code> e <code>password</code>)</li>
          <li>POST /register — registro de novo usuário</li>
        </ul>

        <h2> Exemplos de uso</h2>
        <p><strong>Login:</strong></p>
        <pre>{
  "email": "yuri@role.app",
  "password": "123456"
}</pre>

        <p><strong>Criar novo rolê:</strong></p>
        <pre>{
  "nome": "Nova Festa",
  "tipo": "Churrasco",
  "endereco": "Rua Central, 123",
  "descricao": "Evento teste via Postman",
  "status": "EM DESLOCAMENTO",
  "transporte": "CARRO",
  "eta": "15 min"
}</pre>

      </body>
    </html>
  `);
});


app.db = router.db;
app.use(auth);
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API local rodando em http://localhost:${PORT}`);
});
