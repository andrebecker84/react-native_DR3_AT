import { Timestamp } from 'firebase/firestore';

// Interface base que pode ser extendida
interface BaseItem {
  uid: string;
  createdAt?: Timestamp; // Usando apenas Timestamp para consistência
  sync?: number;
}

// Interface para os itens
export interface ItemInterface extends BaseItem {
  title: string;
  description: string;
  images?: Array<string>;
  solicitante?: Solicitante; // Tornando solicitante um objeto
  email?: string; // Mantenha se necessário, avalie o uso
}

// Interface para o solicitante
interface Solicitante {
  uid: string; // UID do solicitante
  nome: string; // Nome do solicitante
  email: string; // Email do solicitante, se necessário
}

// Interface para imagens associadas a itens
export interface ItemImageInterface extends BaseItem {
  image: string;
  itemUid: string; // Referência ao item associado
}

// Interface para o produto
interface Produto {
  id: string; // ID do produto
  nome: string; // Nome do produto
  descricao: string; // Descrição do produto
}

// Interface para requisições
export interface Requisicao {
  RID: string; // ID da requisição
  dataEdicaoReq: Timestamp; // Data da última edição
  dataRequisicao: Timestamp; // Data da requisição
  id: string; // ID único
  notas: string; // Notas adicionais
  prioridade: string; // Prioridade da requisição
  produto: Produto; // Produto relacionado à requisição
  quantidade: number; // Quantidade solicitada
  solicitante: Solicitante; // Solicitante da requisição
  statusCotacao: string; // Status da cotação
  valorTotal: number; // Valor total da requisição
  valorUnitario: number; // Valor unitário do produto
}

// Interface para cadastro de compras
// Se os dados forem semelhantes, considere unificar com Requisicao
export interface CadastroCompra extends Requisicao {}
