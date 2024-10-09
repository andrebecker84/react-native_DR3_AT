import { Timestamp } from 'firebase/firestore';

export interface ItemIterface {
  uid: string;
  title: string;
  description: string;
  images?: Array<string>;
  createdAt?:  Date | Timestamp;
  sync?: number;
  solicitante?: string;
  email?: string;
}

export interface ItemImageInterface {
  uid: string;
  image: string;
  itemUid: string;
  createdAt?:  Date | Timestamp;
  sync?: number;
}

export interface Requisicao {
  RID: string;
  dataEdicaoReq: Date | Timestamp;
  dataRequisicao: Date | Timestamp;
  id: string;
  notas: string;
  prioridade: string;
  produto: string;
  quantidade: number;
  solicitante: string;
  statusCotacao: string;
  valorTotal: number;
  valorUnitario: number;
}

export interface CadastroCompra {
  RID: string;
  dataEdicaoReq: Date | Timestamp;
  dataRequisicao: Date | Timestamp;
  id: string;
  notas: string;
  prioridade: string;
  produto: string;
  quantidade: number;
  solicitante: string;
  statusCotacao: string;
  valorTotal: number;
  valorUnitario: number;
}
