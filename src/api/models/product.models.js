/*================================
    Modelos de productos
*================================*/

import connection from "../database/db.js";

////////////////////
// Seleccionar todos los productos
const selectAllProducts = () => {
    // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
    // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
    const sql = "SELECT id, nombre, precio, imagen, activo FROM productos";

    // Con el destructuring separamos los resultados (rows) y la metadata (field)
    return connection.query(sql);
}

const selectProductsbyActive = (activo) => {
    // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
    // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
    const sql = "SELECT id, nombre, precio, imagen FROM productos WHERE activo= ?";

    // Con el destructuring separamos los resultados (rows) y la metadata (field)
    return connection.query(sql, [activo]);
}

////////////////////
// Seleccionar producto por id
const selectProductById = (id) => {
    // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
    // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
    // El ? en la consulta es un "placeholder", es una medida de seguridad en consultas SQL para prevenir inyecciones SQL

    const sql = "SELECT * FROM productos where id = ?";
    
    return connection.query(sql, [id]);
}


////////////////////
// Crear nuevo producto
const insertProduct = (cleanName, image, category, price) => {
    // Los placeholders "?" nos permiten realizar consultas SQL mas seguras (evitan inyeccion SQL)
    const sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [cleanName, image, category, price]);
}


////////////////////
// Modificar producto
const updateProduct = (name, image, price, category, id, active) => {
    let sql = `UPDATE productos SET nombre = ?, imagen = ?, precio = ?, categoria = ?, activo= ? WHERE id = ?`;
    
    return connection.query(sql, [name, image, price, category,active, id]); 
}


////////////////////
// Eliminar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM productos WHERE id = ?";
        
    return connection.query(sql, [id]);
}



export default {
    selectAllProducts,
    selectProductsbyActive,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}