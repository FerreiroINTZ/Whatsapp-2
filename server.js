const server = require("fastify")({logger: true})
const cors = require("fastify-cors")
const cookies = require("fastify-cookie")
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
    origin: "*",
    methods: ["GET"]
})

server.register(cookies)

server.get("/", async (request, reply) =>{
    const promise = await new Promise(resolve => setTimeout(() => resolve("Resolvido!"), 3000))
    return {text: promise}
})

server.listen({port: 3000})