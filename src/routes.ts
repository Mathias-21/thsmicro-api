import { Router } from "express";
import { CreateEmpresaController } from "./controllers/CreateEmpresaController";

const router = Router();

const createEmpresa = new CreateEmpresaController();

router.post("/empresa", createEmpresa.handle);

export { router };
