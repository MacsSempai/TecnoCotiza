const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

app.use(cors());

async function getMasVistos(req, res) {
  try {
    await client.connect();
    const database = client.db('tecnocotiza');
    const usuarios = database.collection('usuarios');

    // Agregar un índice para mejorar el rendimiento de la consulta
    await usuarios.createIndex({ "vistos": 1 });

    const pipeline = [
      { $unwind: "$vistos" },
      { $group: { _id: "$vistos", count: { $sum: 1 } } },
      { $match: { count: { $gte: 50 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ];

    const masVistos = await usuarios.aggregate(pipeline).toArray();
    const productosIds = masVistos.map(visto => ObjectId(visto._id));

    const productos = database.collection('productos');
    const productosMasVistos = await productos.find({ _id: { $in: productosIds } }).toArray();

    res.json(productosMasVistos);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await client.close();
  }
}

app.get('/api/mas-vistos', getMasVistos);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
