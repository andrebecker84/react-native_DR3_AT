import { Button, Text, TextInput, TopBar } from "@/components";
import { useSession } from "@/app/ctx";
import { getCadastroCompra, updateCadastroCompra } from "@/infra/getRequisicoes";
import { Requisicao } from "@/interfaces/Item";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import conexao from "@/services/verificarConexao";

export default function EditScreen() {
    const { id } = useSession();
    const [requisicao, setRequisicao] = useState<Requisicao>({
        RID: id,
        id: id,
        dataEdicaoReq: '',
        dataRequisicao: '',
        notas: '',
        prioridade: '',
        produto: '',
        quantidade: '',
        solicitante: '',
        statusCotacao: 'Aberta',
        valorTotal: '',
        valorUnitario: '',
    });

    const dB = async () => {
        const data = await getCadastroCompra();
        const selectedRequisicao = data.find((item: any) => item.id === id);
        if (selectedRequisicao) setRequisicao(selectedRequisicao);
    };

    useEffect(() => {
        dB();
    }, []);

    const handleSave = async () => {
        try{
            if(!conexao()){
                alert("Sem conexão com a internet");
                return false;
            }else{
                updateCadastroCompra(requisicao);
                //dB();
                router.push("/(tabs)/minhasRequisicoes");
            }
        }catch(e){
            console.error("Error updating document: ", e);
    }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TopBar title="Editar Requisição" back={true} menu={false} />
            {requisicao && (
                <View style={styles.card}>
                    <Text style={styles.label}>Produto</Text>
                    <TextInput
                        style={styles.input}
                        value={requisicao.produto}
                        onChangeText={(text) => setRequisicao({ ...requisicao, produto: text })}
                    />

                    <Text style={styles.label}>Quantidade</Text>
                    <TextInput
                        type="number"
                        style={styles.input}
                        value={requisicao.quantidade}
                        onChangeText={(text) => setRequisicao({ ...requisicao, quantidade: text })}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Data</Text>
                    <TextInput
                        type="date"
                        style={styles.input}
                        value={requisicao.data}
                        onChangeText={(text) => setRequisicao({ ...requisicao, data: text })}
                    />

                    <Text style={styles.label}>Prioridade</Text>
                    <TextInput
                        style={styles.input}
                        value={requisicao.prioridade}
                        onChangeText={(text) => setRequisicao({ ...requisicao, prioridade: text })}
                    />

                    <Text style={styles.label}>Notas</Text>
                    <TextInput
                        style={styles.input}
                        value={requisicao.notas}
                        onChangeText={(text) => setRequisicao({ ...requisicao, notas: text })}
                    />

                    <Button onPress={handleSave} mode="contained">Salvar</Button>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {

    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
    },
});
