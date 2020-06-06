// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

// permite a utilização do 'db' fora deste arquivo
 module.exports = db;



/*
// utilizar o objeto de banco de dados para as nossas operações
db.serialize( () =>
{

    // `` template string

    // *** criar a tabela
    db.run(`
    
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT 
        );
    
    `);

    // *** inclusão

    const query = `        
                    INSERT INTO places 
                    (image, name, address, address2, state, city, items) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?);    
                    `;

    const values =  [
                        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
                        "Papersider",
                        "Guilherme Gemballa, Jardim América",
                        "Número 260",
                        "Santa Catarina",
                        "Rio do Sul",
                        "Resíduos Eletrônicos, Lâmpadas"
                    ];

    function afterInsertData(err)
    {
        // função de callback de retorno do comando
        if (err)
        {
            return console.log(err);
        }
        else
        {
            console.log("cadastrado com sucesso");
            console.log(this);
        }
    }                    

    db.run(query, values, afterInsertData);

    db.all(`SELECT * FROM places`, function (err, rows)
    {

        // função de callback de retorno do comando
        if (err)
        {
            return console.log(err);
        }
        else
        {
            console.log("aqui estão seus registros:");
            console.log(rows);
        }        

    });
    
       /*
    db.run("DELETE FROM places WHERE id = ?", [1], function(err)
    {
        // função de callback de retorno do comando
        if (err)
        {
            return console.log(err);
        }
        else
        {
            console.log("excluído com sucesso");
            console.log(this);
        }
    });  
    

});

*/


