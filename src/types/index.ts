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
