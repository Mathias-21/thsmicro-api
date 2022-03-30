import { ClienteController } from "./controllers/ClienteController";
import { CargoPermissoesController } from "./controllers/CargoPermissoesController";
import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { CargoController } from "./controllers/CargoController";
import { PermissaoController } from "./controllers/PermissaoController";
import { UsuarioController } from "./controllers/UsuarioController";
import { ProdutoController } from "./controllers/ProdutoController";
import { PedidoController } from "./controllers/PedidoController";
import { PedidoProdutosController } from "./controllers/PedidoProdutosController";

const router = Router();

const empresa = new EmpresaController();
const cargo = new CargoController();
const permissao = new PermissaoController();
const cargoPermissoes = new CargoPermissoesController();
const usuarioController = new UsuarioController();
const clienteController = new ClienteController();
const produtoController = new ProdutoController();
const pedidoController = new PedidoController();
const pedidoProdutosController = new PedidoProdutosController();

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

router.post("/usuario", usuarioController.createUsuario);
router.get("/usuario", usuarioController.findAllUsuarios);
router.get("/usuario/:id", usuarioController.findUsuario);
router.put("/usuario/:id", usuarioController.updateUsuario);
router.delete("/usuario/:id", usuarioController.deleteUsuario);

router.post("/cliente", clienteController.createCliente);
router.get("/cliente", clienteController.findAllClientes);
router.get("/cliente/:id", clienteController.findCliente);
router.put("/cliente/:id", clienteController.updateCliente);
router.delete("/cliente/:id", clienteController.deleteCliente);

router.post("/produto", produtoController.createProduto);
router.get("/produto", produtoController.findAllProdutos);
router.get("/produto/:id", produtoController.findProduto);
router.put("/produto/:id", produtoController.updateProduto);
router.delete("/produto/:id", produtoController.deleteProduto);

router.post("/pedido", pedidoController.createPedido);
router.get("/pedido", pedidoController.findAllPedidos);
router.get("/pedido/:id", pedidoController.findPedido);
router.put("/pedido/:id", pedidoController.updatePedido);
router.delete("/pedido/:id", pedidoController.deletePedido);

router.post("/pedido_produtos", pedidoProdutosController.createPedidoProdutos);
router.get("/pedido_produtos", pedidoProdutosController.findAllPedidoProdutos);
router.get("/pedido_produtos/:id", pedidoProdutosController.findPedidoProdutos);
router.put(
  "/pedido_produtos/:id",
  pedidoProdutosController.updatePedidoProdutos
);
router.delete(
  "/pedido_produtos/:id",
  pedidoProdutosController.deletePedidoProdutos
);

export { router };
