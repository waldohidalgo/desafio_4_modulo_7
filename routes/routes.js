import express from "express";
import {
  renderHome,
  crearCancion,
  obtenerCanciones,
  borrarCancion,
  editarCancion,
  rutaNoEncontrada,
} from "../controllers/index.js";

const router = express.Router();
router.get("/", renderHome);

router.post("/cancion", crearCancion);

router.get("/canciones", obtenerCanciones);

router.delete("/cancion", borrarCancion);

router.put("/cancion/:id", editarCancion);

router.get("/*", rutaNoEncontrada);

export default router;
