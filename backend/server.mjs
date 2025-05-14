// server.mjs 

import { app } from "./app.mjs"; 

const PORT = process.env.PORT || 3010; 

app.listen(PORT, ()=>{
    console.log(`Servern startad på http://localhost:${PORT} ${process.env.NODE_ENV}`)}); 