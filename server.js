const server = require("fastify")({logger: true})
const cors = require("fastify-cors")
const cookies = require("fastify-cookie")
const {randomUUID} = require("crypto")
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "whatsapp2",
    password: "2006",
    port: 5432
})

pool.query("SELECT NOW()")
    .then(x => console.log(x.rows[0]))

server.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    // Necessario para poder pegar os Cookies
    credentials: "include"
})

// Gera um ID aleatorio
console.log(randomUUID())

server.register(cookies)

server.get("/", async (request, reply) =>{
    // cookie do felipe
    const cookie = "12njkfndu9wyf273husdfh78"
    // reply.setCookie("whatsappCookie", cookie, {maxAge: 60*60*24*7*4}).send({cookie})
    
    try{
        reply.send({cookie: request.cookies.whatsappCookie})
    }catch{
        reply.send({err: "Erro"})
    }
})

server.get("/setUser", async (request, reply) =>{
    try{
        const id = "453e44d8-a19d-4a00-8733-3015b615866d"
        // const id = randomUUID()
        const result = await pool.query("INSERT INTO usuarios (id, nome) VALUES ($1, 'Gabriel')", [id])
        console.log(result)
        reply.setCookie("whatsappCookie", id, {maxAge:60*60*24*7*4}).send({text: "Cookie definido e salvo no Banco!"})
    }catch{
        reply.send({text: "Algo deu errado!"})
    }
})

server.post("/getUser", async (request, reply) =>{
    console.log("Request Body" ,request.body)
    try{
        const {rows: userData} = await pool.query("SELECT * FROM usuarios WHERE id = $1", [request.cookies.whatsappCookie])
    
        console.log("")
        console.log("")
        console.log("")
        console.log("User data: ", userData)
        console.log(request.cookies.whatsappCookie)
        console.log("")
        console.log("")
        console.log("")
        
        // query responsavel por buscar os chates que tenham o usuario atual
        const queryChatsMembers = 
        "SELECT * FROM membros JOIN usuarios ON user_id = id WHERE chate_id IN (SELECT chate_id FROM membros WHERE user_id = (SELECT id FROM usuarios WHERE nome = 'Gabriel')) AND usuarios.nome != 'Gabriel'"
        
        const {rows: chats} = await pool.query(queryChatsMembers)
        console.log("")
        console.log("")
        console.log("")
        console.log(chats)
        console.log("")
        console.log("")
        console.log("")
        console.log("Result:", userData[0])
        reply.send([userData[0], chats])
    }catch{
        reply.code(300).send({texto: "Erro no servidor!"})
    }
})

server.post("/getMessages", async (request, reply) =>{
    const queryMessages = "SELECT sender_id, nome, content, data FROM msg JOIN usuarios ON usuarios.id = msg.sender_id WHERE msg.chate_id = $1"
    const {rows} = await pool.query(queryMessages, [request.body.chate_id])
    reply.send(rows)
})

server.post("/sendMessage", async (request, reply) =>{
    const reqObject = JSON.parse(request.body)
    const saveMessageQuery = "INSERT INTO msg (chate_id, sender_id, content) VALUES ($1, $2, $3)"
    const {rows} = await pool.query(saveMessageQuery, [reqObject.chatID, request.cookies.cookie, reqObject.content])
    console.log("")
    console.log("")
    console.log("")
    console.log(rows)
    console.log(reqObject)
    console.log("")
    console.log("")
    console.log("")
    reply.send({text: "Mensagem enviada!", response: rows[0]})
    // reply.send({text: "Mensagem enviada!"})
})

server.listen({port: 3000})