// PAGINA CRIAR CONTA
import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Button, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/src/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { colors } from '@/src/COMPONENTS/global';
import { AntDesign } from '@expo/vector-icons';

//DIMENSÕES DA TELA Q CONVERSAMOS
const { width, height } = Dimensions.get('window');

export default function Criar() {
   const router = useRouter(); //Rotas
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [Loading, setIsLoading] = useState(false);

   async function onRegisterPress() {
   setIsLoading(true);
      try {
         // Cria o usuário com email e senha
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const uid = userCredential.user.uid; // Obtém o UID do usuário criado
         // Dados a serem salvos
         const data = {
            id: uid,  //ID DO USUARIO EXTREMAMENTE NESSESARIO
            email,
            password,
            displayName, // Nome do usuário
            createdAt: new Date(), // Data de criação
         };
      const pessoasSubCollectionRef = doc(db,'Contas', uid); // Referência à sub-collection 'Pessoas'
      await setDoc(pessoasSubCollectionRef, data); // Salva os dados no Firestore
      Alert.alert("Conta Criada!");
      router.replace('/(tabs)/dashboard'); // Navega para o dashboard
      } 
      catch (error) {
         console.error("Erro ao criar a conta:", error);
         Alert.alert("Erro", "Esse email já está em uso!");
      } 
      finally {
         setIsLoading(false);
      }
   }

   return (
      <View style={Style.container}>
         <View style={Style.cardTop}></View>
         <View style={Style.cardQuest}>
            <Text style={Style.text}>Digite seu nome:</Text>
            <TextInput 
               style={Style.textInput}
               placeholder="..."
               placeholderTextColor={colors.amarelo1}
               onChangeText={(text) => setDisplayName(text)}
               value={displayName}
            />
            <Text style={Style.text}>Digite seu E-mail:</Text>
            <TextInput
               style={Style.textInput}
               placeholder="..."
               placeholderTextColor={colors.amarelo1}
               onChangeText={(text) => setEmail(text)}
               value={email}
            />
            <Text style={Style.text}>Digite sua senha:</Text>
            <TextInput
               style={Style.textInput}
               placeholder="..."
               secureTextEntry={true}    //FITRO PARA DEIXAR INIVSIVEL A SENHA
               placeholderTextColor={colors.amarelo1}
               onChangeText={(text) => setPassword(text)}
               value={password}
            />
            <View style={Style.Area}>
               <Text style={{color: "white", fontSize: 15}}>Tudo certo? Então clique aqui </Text>
            {Loading ? (
               <ActivityIndicator size="large" color={colors.amarelo1} />
               ) : (
               <TouchableOpacity style={Style.button} onPress={onRegisterPress}>
                  <AntDesign name="arrowright" size={30} color={colors.preto} />
               </TouchableOpacity>
            )}
            </View>
         <View style={Style.cardLink}>
            <Text style={{color: colors.tituloBranco, fontSize: 18}}>
               Caso você ja tenha um conta <Link style={{color: colors.amarelo1}} href={'/Login'}>Clique aqui!</Link>
            </Text>
         </View>
         </View>
   </View>
   );
}

const Style = StyleSheet.create({
container: {
   flex: 1,
   width: '100%',
   height: "100%",
   alignItems: 'center',
   justifyContent: "center",
   backgroundColor: "#242424",
},
cardTop:{
   height: height * 0.3,
},
cardQuest: {
   height: height * 0.5,
   width: width * 1,
   backgroundColor: colors.fundo,
   alignItems: "center",
   padding: 30,
   justifyContent: "center"
},
text: {
   color: colors.tituloBranco,
   fontSize: 16,
   marginBottom: 10,
   right: 90
},
textInput: {
   width: '100%',
   height: 55,
   paddingLeft: 30,
   color: colors.tituloBranco,
   borderColor: colors.tituloBranco,
   borderWidth: 1.2,
   borderRadius: 5,
   fontSize: 17,
   marginBottom: 20
},
Area: {
   width: "85%",
   height: 80,
   marginLeft: 45,
   justifyContent: 'space-between',
   alignItems: "center",
   flexDirection: 'row',
   display: 'flex',
},
button: {
   width: 60,
   height: 60,
   backgroundColor: colors.amarelo1,
   borderRadius: 100,
   justifyContent: "center",
   alignItems: "center",
},
btnText:{
   color: "#000",
   fontSize: 18,
},
cardLink: {
   width: "100%",
   height: 70,
   marginTop: 70,
   justifyContent: "center",
   alignItems: "center"
},
});
