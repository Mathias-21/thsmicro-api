import { CargoPermissoesController } from "./controllers/CargoPermissoesController";
import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { CargoController } from "./controllers/CargoController";
import { PermissaoController } from "./controllers/PermissaoController";

const router = Router();

const empresa = new EmpresaController();
const cargo = new CargoController();
const permissao = new PermissaoController();
const cargoPermissoes = new CargoPermissoesController();

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

router.post("/permissao", permissao.createPermissao);
router.get("/permissao", permissao.findAllPermissoes);
router.get("/permissao/:id", permissao.findPermissao);
router.put("/permissao/:id", permissao.updatePermissao);
router.delete("/permissao/:id", permissao.deletePermissao);

router.post("/cargo_permissoes", cargoPermissoes.createCargoPermissoes);
router.get("/cargo_permissoes", cargoPermissoes.findAllCargoPermissoes);
router.get("/cargo_permissoes/:id", cargoPermissoes.findCargoPermissoes);
router.put("/cargo_permissoes/:id", cargoPermissoes.updateCargoPermissoes);
router.delete("/cargo_permissoes/:id", cargoPermissoes.deleteCargoPermissoes);

export { router };
