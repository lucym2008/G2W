// 'PAGINA INICIAL'
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; //TENTANDO FAZER A NAVEGAÇÃO
import { colors } from '../src/COMPONENTS/global';
import { BotãoInicio } from '../src/COMPONENTS/Botão'
import { TxtInput } from '@/src/COMPONENTS/Input';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/src/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function Index() {
  const router = useRouter(); // Hook para navegação
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setor, setSetor] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onRegisterPress() {
    setIsLoading(true);
    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Obtém o UID do usuário criado
  
      // Dados a serem salvos
      const data = {
        id: uid,
        email,
        password,
        displayName, // Nome do usuário
        setor, 
        tipo,
        createdAt: new Date(), // Data de criação
      };
  
      const pessoasSubCollectionRef = doc(db,'Contas', uid); // Referência à sub-collection 'Pessoas'
  
      await setDoc(pessoasSubCollectionRef, data); // Salva os dados no Firestore
  
      Alert.alert("Conta criada");
      router.replace('/(tabs)/dashboard'); // Navega para o dashboard
    } catch (error) {
      console.error("Erro ao criar a conta:", error);
      Alert.alert("Erro", "Esse email já está em uso!");
    } finally {
      setIsLoading(false);
    }
  }
  

  function Login() {
    router.replace('/Login')
  }

  const onLoginPress = async () => {
    setIsLoading(true);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (!userDoc.exists()) {
            alert("User does not exist anymore.");
            return;
        }
        const userData = userDoc.data();
        await AsyncStorage.setItem('user', JSON.stringify(userData));  // Save user data
        router.push({
          pathname: '/(tabs)/dashboard', // Route to the Home screen
          params: { user: JSON.stringify(userData) }, // Pass user data as parameter
        });
        Alert.alert("Voçe entrou");
        console.log("Login Ok");
    } catch (error) {
      Alert.alert("Error");
      console.log("Login fail", error)
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <View style={Start.container}>
      <View style={Start.boxTop}></View>

        <View style={Start.card}>

        <TxtInput
          style={{backgroundColor: "#fff", }}
          placeholder="Digite seu nome"
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
        />
        <TxtInput
          style={{backgroundColor: "#fff", }}
          placeholder="Digite seu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TxtInput
          style={{backgroundColor: "#fff"}}
          placeholder="Digite seu senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TxtInput
          style={{backgroundColor: "#fff"}}
          placeholder="Digite seu setor"
          onChangeText={(text) => setSetor(text)}
          value={setor}
        />
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
          style={Start.picker}
        >
          <Picker.Item label="Selecione seu tipo de conta" value="" />
          <Picker.Item label="Empresa" value="Empresa" />
          <Picker.Item label="Usuario" value="Pessoa" />
        </Picker>

          //Botão login
          <TouchableOpacity > 
            <BotãoInicio onPress={Login}>
              <Text style={Start.btnText}>
                entre na sua conta
              </Text>
            </BotãoInicio>
          </TouchableOpacity>

          //Botão Create
          <TouchableOpacity > 
            <BotãoInicio onPress={onRegisterPress}>
              <Text style={Start.btnText}>
                Crie sua conta
              </Text>
            </BotãoInicio>
          </TouchableOpacity>

          //Botão Entrada gratuita
          <Link href={'/dashboard'} style={Start.textlink}>
            Entrar em uma conta
          </Link>
        </View>

      </View>
  );
}

const Start = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#242424"
  },
  boxTop: {
    height: "20%"
  },
  card:{
    width: "90%",
    height: 600,
    alignItems: "center",
    backgroundColor: "#FFF",
    top: 60,
    borderRadius: 20,
  },
  title:{
    fontSize: 30,
    color: colors.fundo,
  },
  btnText:{
    color: "#000",
    fontSize: 18,
  },
  textlink: {
    fontSize: 16,
    color: "blue",
    marginTop: 10
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
})