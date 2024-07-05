const baseUrl = 'http://localhost:4000/api/productos';

// Función para obtener todos los productos
export const fetchProductos = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};