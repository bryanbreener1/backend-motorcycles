import { authenticate, syncUp } from "./config/database/database.js"
import { envs } from "./config/enviroments/enviroments.js"
import app from "./app.js"

async function main(){
    try {
        await authenticate()
        await syncUp()
    } catch (error) {
        console.error(error)
    }
}

main()

app.listen(envs.PORT, ()=>{
    console.log('listening in the ṕort 3000');
})
