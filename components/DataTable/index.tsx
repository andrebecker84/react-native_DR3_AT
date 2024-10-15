import React, { useEffect, useState } from "react";
import { Button, Snackbar, Card } from "react-native-paper"; 
import { DataTable } from "react-native-paper";
import { getCadastroCompra, deleteCadastroCompra } from "@/infra/getRequisicoes";
import { StyleSheet } from "react-native";

const RequisicoesScreen = () => {
  const [requisicoes, setRequisicoes] = useState<CadastroCompra[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  
  const fetchRequisicoes = async () => {
    const dados = await getCadastroCompra();
    setRequisicoes(dados);
  };

  const handleDelete = async (id: string) => {
    await deleteCadastroCompra(id);
    setMensagem("Requisição excluída com sucesso!");
    fetchRequisicoes(); // Atualiza a lista após a exclusão
  };

  useEffect(() => {
    fetchRequisicoes();
  }, []);

  const hideSnackbar = () => setMensagem(null);

  return (
    <Card style={styles.card}>
      <Card.Title title="Requisições" subtitle="Lista de requisições cadastradas" />
      <Card.Content>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Produto</DataTable.Title>
            <DataTable.Title>Quantidade</DataTable.Title>
            <DataTable.Title>Valor Unitário</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Ações</DataTable.Title>
          </DataTable.Header>

          {requisicoes.map((requisicao) => (
            <DataTable.Row key={requisicao.id} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{requisicao.produto}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{requisicao.quantidade}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{requisicao.valorUnitario}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{requisicao.statusCotacao}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <Button 
                  icon="pencil" 
                  mode="contained" 
                  onPress={() => console.log("Editar", requisicao.id)} // Adicione lógica de edição aqui
                  style={[styles.button, styles.editButton]}
                >
                  Editar
                </Button>
                <Button 
                  icon="trash-can" 
                  mode="contained" 
                  onPress={() => handleDelete(requisicao.id)}
                  style={[styles.button, styles.deleteButton]} 
                >
                  Excluir
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Card.Content>

      <Snackbar
        visible={!!mensagem}
        onDismiss={hideSnackbar}
        duration={3000}
      >
        {mensagem}
      </Snackbar>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: "#fff", // cor de fundo do cartão
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  button: {
    marginLeft: 8,
    marginVertical: 4,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButton: {
    backgroundColor: "#6200ea", // cor do botão de edição
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#d32f2f', // cor do botão de exclusão
    elevation: 2,
  },
});

export default RequisicoesScreen;
