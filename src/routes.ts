import { Router } from "express";
import { CargoController } from "./controllers/CargoController";
import { EmpresaController } from "./controllers/CreateEmpresaController";

const router = Router();

const empresa = new EmpresaController();
const cargo = new CargoController();

router.post("/empresa", empresa.createEmpresa);
router.get("/empresa", empresa.findAllEmpresas);
router.get("/empresa/:id", empresa.findEmpresa);
router.put("/empresa/:id", empresa.updateEmpresa);
router.delete("/empresa/:id", empresa.deleteEmpresa);

router.post("/cargo", cargo.createCargo);
router.get("/cargo", cargo.findAllCargos);
router.get("/cargo/:id", cargo.findCargo);
router.put("/cargo/:id", cargo.updateCargo);
router.delete("/cargo/:id", cargo.deleteCargo);

export { router };
