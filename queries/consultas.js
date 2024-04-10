import pool from "../config/db.js";

export async function agregarCancionQuery(datos) {
  try {
    const consulta = {
      text: "insert into canciones (titulo,artista,tono) values ($1, $2, $3) returning *",
      values: datos,
    };
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function getCancionesQuery() {
  try {
    const consulta = {
      text: "SELECT * FROM canciones",
    };
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function deleteCancionQuery(id) {
  try {
    const consulta = {
      text: "DELETE FROM canciones WHERE id = $1 returning *",
      values: [id],
    };
    const result = await pool.query(consulta);
    if (result.rowCount == 0) {
      throw new Error("Cancion no encontrada");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function editarCancionQuery(id, datos) {
  try {
    const consulta = {
      text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 returning *",
      values: [datos[0], datos[1], datos[2], id],
    };
    const result = await pool.query(consulta);
    if (result.rowCount == 0) {
      throw new Error("Cancion no encontrada");
    }
    return result.rows;
  } catch (error) {
    throw error;
  }
}
