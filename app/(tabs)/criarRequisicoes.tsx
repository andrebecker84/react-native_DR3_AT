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
import uuid from 'react-native-uuid';

// Para gerar um novo UUID
const newUUID = uuid.v4();

export default function CriarRequisicoesScreen() {
  const { userEmail } = useSession();
  
  const [produto, setProduto] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const [dados, setDados] = useState<any>();
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [valorUnitario, setValorUnitario] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [prioridade, setPrioridade] = useState<string>("");
  const [notas, setNotas] = useState<string>("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [dataRequisicao, setDataRequisicao] = useState(new Date());
  const [showDataRequisicaoPicker, setShowDataRequisicaoPicker] = useState(false);

  const loadProdutos = async () => {
    const produtos = await getProdutos();
    const updatedOptions = produtos.map((produto: any) => ({
        label: produto.nome,
        value: produto.nome,
        valorTotal: produto.valorTotal,
        valorUnitario: produto.valorUnitario
    }));
    setOptions(updatedOptions);
  };

  const selecaoPrioridade = [
    { label: "Alta", value: "Alta" },
    { label: "Normal", value: "Normal" },
    { label: "Baixa", value: "Baixa" },
  ];

  const clearFields = () => {
    setProduto("");
    setPrioridade("");
    setQuantidade(0);
    setNotas("");
    setValorUnitario(0);
    setValorTotal(0);
  };

  const handleSelectProduto = (selectedProduto) => {
    const produtoSelecionado = options.find((opt) => opt.value === selectedProduto);
    if (produtoSelecionado) {
        setValorUnitario(produtoSelecionado.valorUnitario || 0);
        setValorTotal((produtoSelecionado.valorUnitario || 0) * quantidade); // Atualiza o valor total
    }
  };

  const calcularValorTotal = () => {
    setValorTotal(valorUnitario * quantidade);
  };

  const handleSubmit = async () => {
    if (!produto || !prioridade || quantidade <= 0) {
        setMensagem("Todos os campos são obrigatórios!");
        return;
    }
    if (!conexao()) {
        setMensagem("Sem conexão com a internet...");
        return;
    }

    const cadastroCompra = {
        RID: uuid.v4(), // Gera um novo UUID
        id: newUUID,
        produto,
        quantidade,
        valorUnitario: parseFloat(valorUnitario.toFixed(2)), // garante que é um número
        valorTotal: parseFloat(valorTotal.toFixed(2)), // garante que é um número
        solicitante: userEmail.displayName,
        notas,
        prioridade,
        statusCotacao: 'Aberta',
        dataRequisicao: dayjs(dataRequisicao).toDate(),
        dataEdicaoReq: null,
    };

    console.log("Dados a serem cadastrados:", cadastroCompra); // log dos dados

    try {
        await addCadastroCompra(cadastroCompra);
        clearFields();
        setMensagem("Requisição cadastrada com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar a requisição: ", error); // log do erro
        setMensagem("Erro ao cadastrar a requisição. Tente novamente.");
    }
};

  useEffect(() => {
    loadProdutos();
  }, []);

  useEffect(() => {
    calcularValorTotal();
  }, [quantidade, valorUnitario]);

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
              onSelect={(selecionado) => {
                setProduto(selecionado);
                handleSelectProduto(selecionado);
              }}
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
              value={quantidade.toString()}
              onChangeText={(text: string) => {
                  const num = parseInt(text);
                  setQuantidade(isNaN(num) ? 0 : num);
              }}
              keyboardType="numeric"
          />
          <TextInput
              label="Valor Unitário"
              value={valorUnitario.toString()}
              onChangeText={(text: string) => {
                  const num = parseFloat(text);
                  setValorUnitario(isNaN(num) ? 0 : num);
              }}
              keyboardType="numeric"
          />
          <TextInput
              label="Valor Total"
              value={valorTotal.toFixed(2)} // Somente leitura
              editable={false} // Não deve ser editável
          />
          <TextInput
            label="Notas"
            value={notas}
            onChangeText={(text: string) => setNotas(text)}
            multiline={true}
            numberOfLines={4}
          />
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
            onPress={handleSubmit}
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
