// Importa React y los hooks useState y useEffect desde la librería de React
import React, { useState, useEffect } from 'react';

// Importa axios para realizar solicitudes HTTP
import axios from 'axios';

// Importa el archivo CSS para los estilos del componente
import './ListaProductos.css';

// Define el componente funcional ProductList
const ListaProductos = () => {
    // Declara el estado productos y la función setProductos para actualizarlo, inicializándolo como un array vacío
    const [productos, setProductos] = useState([]);

    // useEffect es un hook que se ejecuta después de que el componente se renderiza
    useEffect(() => {
        // Define una función asíncrona para obtener los productos desde la API
        const fetchProductos = async () => {
            try {
                // Realiza una solicitud GET a la URL especificada usando axios
                const response = await axios.get('http://localhost:4000/api/productos');
                // Actualiza el estado productos con los datos recibidos en la respuesta
                setProductos(response.data);
            } catch (error) {
                // Maneja cualquier error que ocurra durante la solicitud
                console.error('Error fetching products:', error);
            }
        };

        // Llama a la función fetchProductos para obtener los datos cuando el componente se monta
        fetchProductos();
    }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez (comportamiento similar a componentDidMount)

    // Renderiza el componente
    return (
        // Contenedor principal del listado de productos
        <div className="product-list">
            {/* Título de la lista de productos */}
            <h1>Productos Informaticos</h1>
            {/* Contenedor de los productos */}
            <div className="products">
                {/* Itera sobre el array products y renderiza un div para cada producto */}
                {productos.map((product) => (
                    // Cada producto se renderiza con una clave única basada en su id (_id)
                    <div key={product._id} className="product">
                        {/* Muestra el nombre del producto */}
                        <h2>{product.nombreProducto}</h2>
                        {/* Muestra la categoría del producto */}
                        <p>Category: {product.categoria}</p>
                        {/* Muestra la tienda del producto */}
                        <p>Store: {product.tiendas}</p>
                        {/* Muestra el precio del producto */}
                        <p>Price: ${product.precio}</p>
                        {/* Enlace para ver más detalles del producto */}
                        <a href={product.url} target="_blank" rel="noopener noreferrer">View Product</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Exporta el componente ProductList para que pueda ser usado en otros archivos
export default ListaProductos;
