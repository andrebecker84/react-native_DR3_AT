import { Button } from '@/components';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Home = () => {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logado, setLogado] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const usuarioLogado = auth.currentUser;

    const buscarDadosUsuario = async () => {
      if (usuarioLogado) {
        setLogado(true);
        const usuarioRef = doc(db, 'usuarios', usuarioLogado.uid);
        const docSnap = await getDoc(usuarioRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();
          setNomeUsuario(dados.nome || 'Nome não encontrado');
          setAdmin(dados.role === 'admin'); // Assumindo que 'role' é uma propriedade que define o tipo de usuário
        } else {
          console.log('Nenhum documento encontrado!');
        }
      }
      setLoading(false);
    };

    buscarDadosUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {loading ? (
            <ActivityIndicator animating={true} color="#ffffff" />
          ) : (
            <View style={styles.userInfo}>
              {logado ? (
                <>
                  {nomeUsuario && (
                    <Paragraph style={styles.userName}>
                      {nomeUsuario}
                    </Paragraph>
                  )}
                  {admin ? (
                    <>
                      <Ionicons name="shield-checkmark-sharp" size={24} style={styles.adminIcon} />
                      <Paragraph style={styles.adminText}>Administrador</Paragraph>
                    </>
                  ) : (
                    <>
                      <Ionicons name="person-circle-sharp" size={24} style={styles.colabIcon} />
                      <Paragraph style={styles.colabText}>Colaborador</Paragraph>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Ionicons name="person-sharp" size={24} style={styles.guestIcon} />
                  <Paragraph style={styles.guestText}>Visitante</Paragraph>
                </>
              )}
            </View>
          )}
          <Title style={styles.title}>Seja Bem-Vindo!</Title>
          <Title style={styles.subTitle}>Sistema de Compras</Title>
          <Button mode="contained" style={styles.logoButton}>
            <Paragraph>Logomarca ACME</Paragraph>
          </Button>
          <Paragraph style={styles.rights}>
            Todos os direitos reservados © <Paragraph>@becker84</Paragraph>.
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 33, 38, 1)',
    padding: 16,
  },
  card: {
    minWidth: 275,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(29, 33, 38, 0.4)',
  },
  cardContent: {
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'lightgrey',
  },
  adminIcon: {
    color: '#00ff00',
    marginRight: 8,
  },
  colabIcon: {
    color: '#FDCC0D',
    marginRight: 8,
  },
  colabText: {
    color: '#FDCC0D',
  },
  adminText: {
    color: '#00ff00',
  },
  guestIcon: {
    color: '#FF5722',
    marginRight: 8,
  },
  guestText: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 24,
    color: '#f0f0f0',
  },
  subTitle: {
    fontSize: 20,
    color: '#f0f0f0',
  },
  logoButton: {
    marginBottom: 50,
  },
  rights: {
    fontSize: 12,
    color: 'hsl(215, 15%, 75%)',
  },
});

export default Home;
