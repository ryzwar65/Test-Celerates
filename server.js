const app = require('./src/app')
require('dotenv').config()

app.listen(process.env.PORT_APP,()=>{
    console.log(`Server Running On Port ${process.env.PORT_APP}`)
})