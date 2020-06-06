const express = require("express");
const server  = express();

// pegar o banco de dados
const db = require("./database/db.js");


// configurar caminhos da aplicação

// configurar pasta pública
// disponibiliza a pasta 'public' como se tivesse no mesmo nível das outras pastas
server.use(express.static("public"));

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}));

// utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", 
{
    express: server,
    noCache: true
})

// *** rotas

// *** página inicial
server.get("/", (req, res) =>
{
    // res.send("cheguei aqui");
    // res.sendfile(__dirname + "/views/index.html");
    // renderiza a página passando pelo motor do nunjucks
    // o primeiro argumento é a página a ser exibida, e o segundo é um objeto com as variáveis que serão utilizadas
    return res.render("index.html", 
    {
        title: "Seu marketplace de coleta de resíduos"
    });
});

// *** create point **************************************************

server.get("/create-point", (req, res) =>
{
    // renderiza a página passando pelo motor do nunjucks
    return res.render("create-point.html");
});

server.post("/save-point", (req, res) =>
{

    // *** inclusão

    const query = `        
                    INSERT INTO places 
                    (image, name, address, address2, state, city, items) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?);    
                    `;

    const values =  [
                        req.body.image,
                        req.body.name,
                        req.body.address,
                        req.body.address2,
                        req.body.state,
                        req.body.city,
                        req.body.items                        
                    ];

    function afterInsertData(err)
    {
        // função de callback de retorno do comando
        if (err)
        {
            console.log(err);
            return res.send("Erro no cadastro");
        }

        console.log("dados cadastrados");
        console.log(this);

        return res.render("create-point.html", { saved : true});

    }                    

    db.run(query, values, afterInsertData);

});

// *** search results ***********************************************
server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "")
    {
        // pesquisa vazia
        return res.render("search-results.html", 
        {            
            total : 0
        });
    }

    // busca os dados no banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {

        // função de callback de retorno do comando
        if (err)
        {
            return console.log(err);
        }

        // armazena a quantidade de elementos do array
        const total = rows.length;

        console.log("aqui estão seus registros:");
        console.log(rows);

        // renderiza a página passando pelo motor do nunjucks
        // utilizando o array com os dados retornados do DB
        return res.render("search-results.html", 
                          {
                              places : rows, 
                              total  : total
                          });

    })

})

// iniciar o servidor
server.listen(3000);