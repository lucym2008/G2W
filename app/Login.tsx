// 'INDEX DE LOGIN'
import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { TxtInput } from '../src/COMPONENTS/Input';
import { Botão } from '../src/COMPONENTS/Botão';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth, db } from '@/src/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/src/COMPONENTS/global';

export default function Login() {
  const router = useRouter(); //Rotas
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;  
      const userDoc = await getDoc(doc(db, "Contas", uid));
      const userData = userDoc.data();
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      router.push({
        pathname: '/(tabs)/dashboard',
        params: { user: JSON.stringify(userData) },
      });
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      console.log("Login OK");
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Verifique suas credenciais e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRecovery = () => {
    const auth = getAuth(app);  // Obtenha a instância do Firebase Auth
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Enviado com sucesso!', 'Verifique seu e-mail para redefinir a senha.');
      })
      .catch((error) => {
        console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao enviar o e-mail de recuperação.');
      });
  };

  return (
    <View style={Style.container}>
      <View style={Style.cardTop}></View>
      <View style={Style.cardBottom}>
        <Text style={Style.Title}>Tela de Login</Text>
        <Text style={Style.text}>Digite seu email:</Text>
        <TxtInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={Style.text}>Digite sua senha:</Text>
        <TxtInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
          <Botão activeOpacity={0.8} onPress={handleRecovery}>
            <Text style={{ fontSize: 18 }}>Recuperar senha</Text>
          </Botão>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.amarelo1} />
        ) : (
          <Botão activeOpacity={0.8} onPress={onLoginPress}>
            <Text style={{ fontSize: 18 }}>Entrar</Text>
          </Botão>
        )}
        <Text style={Style.textBottom}>
          Não tem conta?{' '}
          <Link href="/" style={Style.links}>
            crie aqui agora!
          </Link>
        </Text>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#242424",
  },
  cardTop: {
    height: '30%',
  },
  cardBottom: {
    height: '70%',
    width: '100%',
    backgroundColor: "white",
    alignItems: "center",
    padding: 30,
  },
  Title: {
    fontSize: 30,
    color: colors.fundo,
    fontWeight: '500',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: colors.fundo,
  },
  textBottom: {
    fontSize: 18,
    top: 100,
    color: colors.fundo,
  },
  links: {
    color: colors.amarelo1,
  },
  picker: {
    height: 50,
    width: '100%',
    paddingLeft: 20,
    color: "#000",
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 17,
  },
});
