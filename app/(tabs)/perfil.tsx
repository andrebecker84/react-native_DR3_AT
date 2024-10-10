import {
  Avatar,
  Button,
  Camera,
  Fab,
  Grid,
  Snackbar,
  TextInput,
} from "@/components";
import Topbar from "@/components/navigation/TopBar";
import { UserInterface } from "@/interfaces/User";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getUserAuthentication,
  getUsuario,
  updateUserAuthentication,
  updateUsuario,
} from "@/infra/usuarios";
import { ScrollView } from "react-native";
import { uploadImageToFirebaseStorage } from "@/services/storage";
import minhaImagem from "../../assets/images/criarConta.png";

export default function PerfilScreen() {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserInterface>({
    uid: "",
    email: "",
    emailVerified: false,
    nome: "",
    phoneNumber: "",
    photoURL: "",
  });

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [usuario, setUsuario] = useState<any>(null);

  const dados = async () => {
    try {
      const user: any = await getUserAuthentication();
      campos(user);
    } catch (erro) {
      console.error(erro);
    }
  };

  const campos = async (user: any) => {
    Object.keys(user).forEach((key) => {
      if (key === "nome") {
        setNome(user[key]);
      }
      if (key === "email") {
        setEmail(user[key]);
      }
      if (key === "uid") {
        setId(user[key]);
      }
      if (key === "photoURL") {
        setPhotoURL(user[key]);
      }
    });
  };

  const camposTelefone = async () => {
    const userFone = await getUsuario();
    const usuarioEncontrado = userFone.find(
      (user: any) => user.email === email
    );
    Object.keys(usuarioEncontrado).forEach((key) => {
      if (key === "telefone") {
        setTelefone(usuarioEncontrado[key]);
      }
    }
    );
  };

  useEffect(() => {
    if (email) {
      camposTelefone();
    }
  }, [email]);

  useEffect(() => {
    dados();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      setPhotoURL(selectedImage);
    }
  };

  const onCapture = (photo: any) => {
    const selectedImage = photo.uri;
    setPhotoURL(selectedImage);
  };

  const _update = async () => {
    setLoading(true);
    const im = photoURL.split("/");
    const newImg = await uploadImageToFirebaseStorage(photoURL, email, im[im.length - 1])
    setPhotoURL(newImg);
    const user = {
      nome,
      photoURL: newImg,
    };
    await updateUserAuthentication(user);

    const userFone = await getUsuario();
    const usuarioEncontrado = userFone.find(
      (user: any) => user.email === email
    );

    if (usuarioEncontrado) {
      const dadosTelefone = {
        id: usuarioEncontrado.id,
        telefone: telefone,
      };
      console.log(dadosTelefone);
      await updateUsuario(dadosTelefone); 
    }

    dados();
    setMessage("Dados atualizados com sucesso!");
    setLoading(false);
  };

  return (
    <>
      <ScrollView>
        <Grid style={styles.container}>
          <Grid>
            <Topbar title="Perfil" />
          </Grid>
          <Grid>
            <Grid
              style={{
                ...styles.containerImage,
              }}
            >
              <Grid
                style={{
                  ...styles.containerCenterImage,
                }}
              >
                {photoURL ? (
                  <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar size={200} source={{ uri: photoURL }} />
                  </Grid>
                ) : (
                  <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: -50 }}>
                    <Avatar bgColor="transparent" size={300} source={minhaImagem} />
                  </Grid>
                )}
                <Fab
                  onPress={pickImage}
                  icon="image"
                  style={{
                    ...styles.fab,
                    ...styles.left,
                  }}
                />
                <Fab
                  onPress={() => setCameraVisible(true)}
                  icon="camera"
                  style={{
                    ...styles.fab,
                    ...styles.right,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid style={{ marginTop: 30 }}>
            <TextInput
              disabled={true}
              label="ID"
              value={id}
            />
          </Grid>

          <Grid>
            <TextInput
              disabled={true}
              label="Email"
              value={email}
            />
          </Grid>
          
          <Grid>
            <TextInput 
              label="Nome"
              value={nome}
              onChangeText={setNome} 
            />
          </Grid>

          <Grid style={{ marginBottom: 30 }}>
            <TextInput
              label="Telefone"
              value={telefone}
              onChangeText={setTelefone}
            />
          </Grid>
          
          <Grid style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Button
              width={250}
              loading={loading}
              onPress={_update}
              mode="contained"
              icon={telefone ? "content-save" : "account-plus"}
          >
              {telefone ? "Atualizar" : "Cadastrar"}
          </Button>
          </Grid>
        </Grid>
        <Snackbar
          visible={message !== null}
          onDismiss={() => setMessage(null)}
          duration={5000}
          text={message}
        />
        {cameraVisible ? (
          <Camera
            onCapture={onCapture}
            setCameraVisible={setCameraVisible}
            ref={cameraRef}
          />
        ) : null}
      </ScrollView>
    </>
  );
}
const styles = {
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  padding: {
    padding: 12,
    paddingLeft: 30,
    paddingRight: 30,
  },
  containerCenterImage: {
    width: 200,
    position: "relative",
  },
  fab: {
    bottom: 0,
    position: "absolute",
    borderRadius: 200,
  },
  right: {
    right: 0,
  },
  left: {
    left: 0,
  },
  container: {
    height: "100%",
  },
};
