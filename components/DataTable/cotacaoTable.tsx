import React from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface Cotacao {
  responsavel: string;
  preco: string;
  total: string;
}

interface CotacaoTableProps {
  cotacoes: { [key: string]: Cotacao };
}

const CotacaoTable: React.FC<CotacaoTableProps> = ({ cotacoes }) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Produto</DataTable.Title>
          <DataTable.Title numeric>Quantidade</DataTable.Title>
          <DataTable.Title numeric>Cotação 1</DataTable.Title>
          <DataTable.Title numeric>Total 1</DataTable.Title>
          <DataTable.Title numeric>Cotação 2</DataTable.Title>
          <DataTable.Title numeric>Total 2</DataTable.Title>
          <DataTable.Title numeric>Cotação 3</DataTable.Title>
          <DataTable.Title numeric>Total 3</DataTable.Title>
        </DataTable.Header>

        {Object.keys(cotacoes).map((key) => (
          <DataTable.Row key={key}>
            <DataTable.Cell>{parseFloat(cotacoes[key].total/cotacoes[key].requisicao)}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].precoCota1}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].totalCota1}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].precoCota2}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].totalCota2}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].precoCota3}</DataTable.Cell>
            <DataTable.Cell numeric>R${cotacoes[key].totalCota3}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default CotacaoTable;
