import { Timestamp } from 'firebase/firestore';

export interface UserInterface {
  uid: string;                       // ID único fornecido pelo Firebase Authentication
  email: string;                     // Endereço de e-mail do usuário
  emailVerified: boolean;            // Indicador de verificação de e-mail, alterado para booleano para refletir o tipo Firebase
  nome: string;                      // Nome exibido do usuário
  username?: string;                 // Nome de usuário, opcional
  phoneNumber: string;               // Número de telefone do usuário
  photoURL: string;                  // URL da foto de perfil
  dataCriacao?: Date | Timestamp;    // Data de criação da conta, compatível com Date ou Timestamp do Firestore
  role?: 'colaborador' | 'admin';    // Papel do usuário, opcional, para controle de acesso
  sync?: number;                     // Indicador de sincronização, opcional
  blocked?: boolean;                 // Indicador de bloqueio do usuário, opcional
}
