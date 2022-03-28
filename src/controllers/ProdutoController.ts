import { Request, Response } from "express";
import { ProdutoEntity } from "../entities/ProdutoEntity";

export class ProdutoController {
  createProduto = async (req: Request, res: Response) => {
    try {
      const ProdutoProps = req.body;

      const produtoEntity = new ProdutoEntity();
      const produto = await produtoEntity.createOne(ProdutoProps);

      return res
        .status(201)
        .json({ message: "Produto cadastrado com sucesso", data: produto });
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  };

  findAllProdutos = async (req: Request, res: Response) => {
    try {
      const produtoEntity = new ProdutoEntity();
      const produto = await produtoEntity.findAll();

      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const produtoEntity = new ProdutoEntity();
      const produto = await produtoEntity.findOne(id);

      return res.json(produto);
    } catch (error) {
      if (error === "PRODUTO_NOT_FOUND") {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };

  updateProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const ProdutoProps = req.body;

      const produtoEntity = new ProdutoEntity();
      const produto = await produtoEntity.updateOne(id, ProdutoProps);

      return res.json({
        message: "Produto atualizado com sucesso",
        data: produto,
      });
    } catch (error) {
      if (error === "PRODUTO_NOT_FOUND") {
        return res.status(404).json({ message: "Produto não encontrado" });
      } else if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json({ error });
    }
  };

  deleteProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const produtoEntity = new ProdutoEntity();
      await produtoEntity.deleteOne(id);

      return res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      if (error === "PRODUTO_NOT_FOUND") {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };
}
