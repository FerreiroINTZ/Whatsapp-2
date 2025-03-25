async function nada(){
    var promises = []
    const search = fetch("http://localhost:3000")
    promises.push(search)
    const promise = new Promise(resolve => setTimeout(() => resolve("Resovido!"), 6000))
    promises.push(promise)
    
    for(var nada of promises){
        var rpz = await nada
        if(rpz.status){
            rpz = await rpz.json()
        }
        console.log(rpz)
    }
}

nada()