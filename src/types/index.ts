export interface EmpresaProps {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  is_ativo: boolean;
}

export interface CargoPermissoesProps {
  id_cargo: number;
  id_permissao: number;
}

export interface UsuarioProps {
  id_empresa: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  id_cargo: number;
}

export interface ClienteProps {
  id_empresa: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface ProdutoProps {
  id_empresa: number;
  nome: string;
  preco: number;
}

export interface PedidoProps {
  id_empresa: number;
  id_usuario: number;
  id_cliente: number;
  descricao: string;
  status: string;
  valor_total: number;
}
