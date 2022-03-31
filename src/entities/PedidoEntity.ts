import { ClienteEntity } from "./ClienteEntity";
import { UsuarioEntity } from "./UsuarioEntity";
import { EmpresaEntity } from "./EmpresaEntity";
import { prismaClient } from "../database/prismaClient";
import { Pedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class PedidoEntity {
  createOne = async (data: Pedido) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);
        const usuarioEntity = new UsuarioEntity();
        const usuario = await usuarioEntity.findOne(data.id_usuario);
        const clienteEntity = new ClienteEntity();
        const cliente = await clienteEntity.findOne(data.id_cliente);

        if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else if (!usuario) {
          reject("USUARIO_NOT_FOUND");
        } else if (!cliente) {
          reject("CLIENTE_NOT_FOUND");
        } else if (
          data.id_empresa === null ||
          data.id_usuario === null ||
          data.id_cliente === null ||
          data.descricao === "" ||
          data.status === ""
        ) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.pedido.create({
              data,
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const pedido = await prismaClient.pedido.findMany({
          include: {
            empresa: true,
            usuario: {
              include: {
                cargo: {
                  include: {
                    CargoPermissoes: {
                      include: {
                        permissao: true,
                      },
                    },
                  },
                },
              },
            },
            cliente: true,
          },
        });
        resolve(pedido);
      } catch (error) {
        reject(error);
      }
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pedido = await prismaClient.pedido.findUnique({
          where: {
            id,
          },
          include: {
            empresa: true,
            usuario: {
              include: {
                cargo: {
                  include: {
                    CargoPermissoes: {
                      include: {
                        permissao: true,
                      },
                    },
                  },
                },
              },
            },
            cliente: true,
          },
        });

        if (!pedido) {
          reject("PEDIDO_NOT_FOUND");
        } else {
          resolve(pedido);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateOne = async (id: number, data: Pedido) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);
        const usuarioEntity = new UsuarioEntity();
        const usuario = await usuarioEntity.findOne(data.id_usuario);
        const clienteEntity = new ClienteEntity();
        const cliente = await clienteEntity.findOne(data.id_cliente);

        if (!(await this.findOne(id))) {
          reject("PEDIDO_NOT_FOUND");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else if (!usuario) {
          reject("USUARIO_NOT_FOUND");
        } else if (!cliente) {
          reject("CLIENTE_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.pedido.update({
              where: { id },
              data,
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.findOne(id))) {
          reject("PEDIDO_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.pedido.delete({
              where: {
                id,
              },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateValorTotal = async (id: number, valorTotal: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const vlrTtl = await prismaClient.pedido.findUnique({
          where: { id },
          select: {
            valor_total: true,
          },
        });

        const valorTotalAntigo = Number(vlrTtl?.valor_total);

        resolve(
          await prismaClient.pedido.update({
            where: { id },
            data: {
              valor_total: valorTotalAntigo + valorTotal,
            },
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  };
}
