import app from './app.js' 
import { connectDB } from './db.js' //se usa el import asi por que solo se uso un solo "export"

connectDB();

app.listen(4000);
console.log('Servidor en el puerto', 4000);

