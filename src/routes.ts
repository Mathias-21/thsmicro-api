import { CreateCargoController } from "./controllers/CreateCargoController";
import { Router } from "express";
import { CreateEmpresaController } from "./controllers/CreateEmpresaController";

const router = Router();

const createEmpresa = new CreateEmpresaController();
const createCargo = new CreateCargoController();

router.post("/empresa", createEmpresa.createEmpresa);
router.get("/empresa", createEmpresa.findAllEmpresas);
router.get("/empresa/:id", createEmpresa.findEmpresa);
router.put("/empresa/:id", createEmpresa.updateEmpresa);
router.delete("/empresa/:id", createEmpresa.deleteEmpresa);

router.post("/cargo", createCargo.createCargo);
router.get("/cargo", createCargo.findAllCargos);

export { router };
