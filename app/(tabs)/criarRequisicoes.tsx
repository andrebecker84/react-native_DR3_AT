import { Button, Grid, Snackbar, Text, TextInput, TopBar } from "@/components";
import { addCadastroCompra } from "@/infra/getRequisicoes";
import { getProdutos } from "@/infra/produtos";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Dropdown } from "@/components";
import { useSession } from "@/app/ctx";
import conexao from "@/services/verificarConexao";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CriarRequisicoesScreen() {
  const { userEmail } = useSession();
  
  const [produto, setProduto] = useState<string>();
  const [options, setOptions] = useState<any[]>([]);
  const [requisicaoRef, setRequisicaoRef] = useState<any>();
  const [dados, setDados] = useState<any>();
  const [uid, setUid] = useState<string>();
  const [valorTotal, setValorTotal] = useState<number>();
  const [valorUnitario, setValorUnitario] = useState<number>();
  const [prioridade, setPrioridade] = useState<string>();
  const [quantidade, setQuantidade] = useState<number>();
  const [notas, setNotas] = useState<string>();
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Estados para os Date Pickers
  const [dataRequisicao, setDataRequisicao] = useState(new Date());
  const [showDataRequisicaoPicker, setShowDataRequisicaoPicker] = useState(false);
  const [showDataEdicaoReqPicker, setShowDataEdicaoReqPicker] = useState(false);

  const loadProdutos = async () => {
    const produtos = await getProdutos();
    const updatedOptions = produtos.map((produto: any) => ({
      label: produto.nome,
      value: produto.nome,
    }));
    setOptions(updatedOptions); // Atualizando o estado das opções
  };

  const selecaoPrioridade = [
    { label: "Alta", value: "Alta" },
    { label: "Normal", value: "Normal" },
    { label: "Baixa", value: "Baixa" },
  ];

  const clearFields = () => {
    setProduto('');
    setPrioridade('');
    setQuantidade(undefined);
    setNotas('');
  };

  const handleSubmit = async () => {
    if (!produto || !prioridade || !quantidade) {
      setMensagem("Todos os campos são obrigatórios!");
      return false;
    }
    if (!conexao()){
      setMensagem("Sem conexão com a internet...");
      return false;
    }else{
      const solicitante = {
        id: userEmail.uid,
        username: userEmail.username,
        nome: userEmail.nome,
        email: userEmail.email,
        photoURL: userEmail.photoURL ? userEmail.photoURL : null,
      };
  
      const valorTotalFormatado = parseFloat(dados.valorTotal).toFixed(2);
      const cadastroCompra = {
        RID: requisicaoRef.id,
        produto: produto,
        quantidade: quantidade,
        valorUnitario: parseFloat(dados.valorUnitario),
        valorTotal: parseFloat(valorTotalFormatado),
        solicitante: userEmail.nome,
        notas: notas,
        prioridade: prioridade,
        statusCotacao: 'Aberta',
        dataRequisicao: dayjs(dataRequisicao).toDate(),
        dataEdicaoReq: null,
      };
      await addCadastroCompra(cadastroCompra);
      clearFields();
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  return (
    <ScrollView>
      <TopBar title="Nova Requisição" />
      <Grid style={styles.content}>
      <Grid style={styles.card}>
        <Text style={styles.title}>Cadastrar Requisição de Compra</Text>
        <Dropdown
          label="Prioridade"
          placeholder="Selecione a prioridade"
          options={selecaoPrioridade}
          value={prioridade}
          onSelect={setPrioridade}
        />
        {options.length > 0 ? (
          <Dropdown
            label="Produto"
            placeholder="Selecione um produto"
            options={options}
            value={produto}
            onSelect={setProduto}
          />
        ) : (
          <TextInput 
          label="Produtos"
          value={produto}
          onChangeText={(text: string) => setProduto(text)}
          />
        )}
        <TextInput
          label="Quantidade"
          value={quantidade}
          onChangeText={(number: number) => setQuantidade(number)}
        />
        <TextInput
          label="Notas"
          value={notas}
          onChangeText={(text: string) => setNotas(text)}
          multiline={true}
          numberOfLines={4}
        />

         {/* Date Picker para Data de Requisição */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.texto}>Escolha a Data de Requisição:</Text>
            <Button 
              style={{ marginTop: 6, backgroundColor: "rgb(0, 0, 45)" }} 
              icon="calendar" 
              corIcone="rgba(226, 29, 72, 1)"
              corTexto="rgba(226, 29, 72, 1)"
              mode="outlined" 
              onPress={() => setShowDataRequisicaoPicker(true)}
            >
              {dayjs(dataRequisicao).format("DD/MM/YYYY HH:mm")}
            </Button>
          {showDataRequisicaoPicker && (
            <DateTimePicker
              value={dataRequisicao}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDataRequisicaoPicker(false);
                if (selectedDate) setDataRequisicao(selectedDate);
              }}
            />
          )}
        </View>
        <Button
          icon="cart-plus" 
          mode="contained" 
          onPress={() => {
            handleSubmit();
          }}
        >
          Cadastrar Requisição
        </Button>
      </Grid>
      <Snackbar
          visible={mensagem !== null}
          onDismiss={() => setMensagem(null)}
          duration={5000}
          text={mensagem}
        />
        </Grid>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  container: {
    margin: 20,
  },
  title: {
    color: "rgb(255,255,255)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  texto: {
    color: "rgb(220,220,220)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#505050",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
    padding: 30,
    width: "90%",
    gap: 12,
  },
});
