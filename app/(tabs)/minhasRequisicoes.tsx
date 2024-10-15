import React, { useEffect, useState } from "react";
import { Button, Snackbar, Card, Modal, Portal, TextInput } from "react-native-paper"; 
import { DataTable } from "react-native-paper";
import { getCadastroCompra, deleteCadastroCompra, updateCadastroCompra } from "@/infra/getRequisicoes";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native'; // Importando useFocusEffect
import dayjs from "dayjs";

const RequisicoesScreen = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataEdicaoReq, setDataEdicaoReq] = useState(new Date());
  const [requisicaoEditando, setRequisicaoEditando] = useState({
    id: '',
    produto: '',
    quantidade: 0,
    valorUnitario: 0,
    valorTotal: 0,
    statusCotacao: '',
    dataEdicaoReq: null,
  });

  const fetchRequisicoes = async () => {
    const dados = await getCadastroCompra();
    setRequisicoes(dados);
  };

  const handleDelete = async (id) => {
    await deleteCadastroCompra(id);
    setMensagem("Requisição excluída com sucesso!");
    fetchRequisicoes();
  };

  const handleEdit = (requisicao) => {
    setRequisicaoEditando(requisicao);
    setModalVisible(true);
  };

  const handleUpdate = async () => {
    if (requisicaoEditando.id) {
      try {
        // Atualiza a data de edição para o momento atual
        const novaRequisicao = {
          ...requisicaoEditando,
          dataEdicaoReq: dayjs().toDate(), // Atualiza com a data atual
        };
  
        // Use novaRequisicao para atualizar a requisição no banco de dados
        await updateCadastroCompra(novaRequisicao);
        setMensagem("Requisição atualizada com sucesso!");
        setModalVisible(false);
        setRequisicaoEditando({
          id: '',
          produto: '',
          quantidade: 0,
          valorUnitario: 0,
          valorTotal: 0,
          statusCotacao: 'Aberta',
          dataEdicaoReq: null, // Reseta a data de edição
        });
        fetchRequisicoes();
      } catch (error) {
        console.error("Erro ao atualizar a requisição:", error);
        setMensagem("Erro ao atualizar a requisição.");
      }
    } else {
      setMensagem("ID da requisição não encontrado.");
    }
  };  

  // useFocusEffect substituindo o primeiro useEffect
  useFocusEffect(
    React.useCallback(() => {
      fetchRequisicoes();
    }, [])
  );

  useEffect(() => {
    const valorTotal = requisicaoEditando.quantidade * requisicaoEditando.valorUnitario;
    setRequisicaoEditando((prev) => ({ ...prev, valorTotal }));
  }, [requisicaoEditando.quantidade, requisicaoEditando.valorUnitario]);

  const hideSnackbar = () => setMensagem(null);

  return (
    <>
      <Card style={styles.card}>
        <Card.Title title="Requisições" subtitle="Lista de requisições cadastradas" />
        <Card.Content>
          <DataTable>
            <DataTable.Header style={styles.header}>
              <DataTable.Title textStyle={styles.cellTitle}>Produto</DataTable.Title>
              <DataTable.Title textStyle={styles.cellTitle}>Qtde.</DataTable.Title>
              <DataTable.Title textStyle={styles.cellTitle}>Valor Un.</DataTable.Title>
              <DataTable.Title textStyle={styles.cellTitle}>Total</DataTable.Title>
              <DataTable.Title textStyle={styles.cellTitle}>Status</DataTable.Title>
              <DataTable.Title textStyle={styles.cellTitle}>Ações</DataTable.Title>
            </DataTable.Header>

            {requisicoes.map((requisicao) => (
              <DataTable.Row key={requisicao.id} style={styles.row}>
                <DataTable.Cell textStyle={styles.cell}>{requisicao.produto}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{requisicao.quantidade}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{requisicao.valorUnitario}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{requisicao.quantidade * requisicao.valorUnitario}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{requisicao.statusCotacao}</DataTable.Cell>
                <DataTable.Cell style={styles.cell}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name="pencil" size={24} color="#56d363" onPress={() => handleEdit(requisicao)} />
                    <Ionicons name="trash" size={24} color="#ff6666" onPress={() => handleDelete(requisicao.id)} />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>

        <Snackbar
          visible={!!mensagem}
          onDismiss={hideSnackbar}
          duration={3000}
          style={styles.snackbar}
        >
          {mensagem}
        </Snackbar>

        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
            <TextInput
              label="Produto"
              value={requisicaoEditando.produto} 
              onChangeText={(text) => setRequisicaoEditando({ ...requisicaoEditando, produto: text })}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#56d363' } }}
            />
            <TextInput
              label="Quantidade"
              value={String(requisicaoEditando.quantidade)} 
              onChangeText={(text) => setRequisicaoEditando({ ...requisicaoEditando, quantidade: Number(text) })}
              style={styles.input}
              keyboardType="numeric"
              mode="outlined"
              theme={{ colors: { primary: '#56d363' } }}
            />
            <TextInput
              label="Valor Unitário"
              value={String(requisicaoEditando.valorUnitario)} 
              onChangeText={(text) => setRequisicaoEditando({ ...requisicaoEditando, valorUnitario: Number(text) })}
              style={styles.input}
              keyboardType="numeric"
              mode="outlined"
              theme={{ colors: { primary: '#56d363' } }}
            />
            <TextInput
              label="Valor Total"
              value={String(requisicaoEditando.valorTotal)} 
              editable={false}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#56d363' } }}
            />
            <Button mode="contained" onPress={handleUpdate} style={styles.updateButton}>
              Atualizar
            </Button>
          </Modal>
        </Portal>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 100,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "#222",
    elevation: 6,
  },
  header: {
    backgroundColor: "#333",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  cellTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#aaa",
    fontWeight: 'bold',
    fontSize: 14,
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#eee",
    fontSize: 13,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  modal: {
    backgroundColor: "#444",
    padding: 24,
    borderRadius: 16,
  },
  input: {
    backgroundColor: "#666",
    marginBottom: 12,
  },
  updateButton: {
    backgroundColor: "#56d363",
  },
  snackbar: {
    backgroundColor: "#444",
  },
});

export default RequisicoesScreen;
