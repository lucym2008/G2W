// PAGINA CRIAR CONTA
import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/src/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { colors } from '@/src/COMPONENTS/global';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

//DIMENSÕES DA TELA Q CONVERSAMOS
const { width, height } = Dimensions.get('window');


export default function Criar() {
   const router = useRouter(); //Rotas
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [tipoConta, setTipoConta] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [regiao, setRegiao] = useState('');
   const [fone, setFone] = useState('');
   const [areaCode, setAreaCode] = useState('(11) '); // Código de área fixo

   const [Loading, setIsLoading] = useState(false);
   const [isChecked, setIsChecked] = useState(false); // Estado para controlar o checkbox
   const [showHello, setShowHello] = useState(false); // Estado para controlar o checkbox


   const handleCheckboxChange = () => {
     setIsChecked(!isChecked); // Inverte o valor quando o checkbox for clicado
   }; 
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
            regiao,
            fone,
            tipoConta,
            createdAt: new Date(), // Data de criação
         };
      const pessoasSubCollectionRef = doc(db,'Contas', uid); // Referência à sub-collection 'Pessoas'
      await setDoc(pessoasSubCollectionRef, data); // Salva os dados no Firestore
      Alert.alert("Conta Criada com sucesso!");
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
   function showHelloScreen() {
      setShowHello(true);
         // Renderiza o conteúdo com base no estado
   };   
   if (showHello) {
      return (
      <View style={Style.container}>
         <View style={Style.cardTop}>
            <Text style={Style.subTitle}> Etapa 2/2</Text>
         </View>
         <View style={Style.cardQuest}>
            <Text style={Style.text}>Digite sua região:</Text>
            <TextInput 
               style={Style.textInput}
               placeholder="..."
               placeholderTextColor={colors.amarelo1}
               onChangeText={(text) => setRegiao(text)}
               value={regiao}
            />
            <Text style={Style.text}>Digite seu numero:</Text>
            <View style={Style.containerFone}>
               <TextInput
                 value={areaCode} // Código de área fixo
                 editable={false} // Não permite edição
                 style={Style.areaCodeInput}
               />
               <TextInput
                 value={fone} // Número do telefone que o usuário pode editar
                 onChangeText={setFone}
                 placeholder="..."
                 placeholderTextColor={colors.tituloBranco}
                 keyboardType="numeric" // Exibe o teclado numérico
                 style={Style.phoneInput}
               />
            </View>
            <Text style={Style.text}>Digite seu tipo de conta:</Text>
            <Picker
               selectedValue={tipoConta}
               onValueChange={setTipoConta}
               style={Style.picker}
            >
               <Picker.Item label="Selecione uma modalidade" value="" />
               <Picker.Item label="Pessoa" value="Pessoa" />
               <Picker.Item label="Empresa" value="Empresa" />
               <Picker.Item label="FreeLancer" value="FreeLancer" />
            </Picker>
            
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
   );}

   return (
      <View style={Style.container}>
         <View style={Style.cardTop}>
            <Text style={Style.subTitle}> Etapa 1/2</Text>
         </View>
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
               <Text style={{color: "white", fontSize: 15}}>Venha para a proxima parte </Text>
            {Loading ? (
               <ActivityIndicator size="large" color={colors.amarelo1} />
               ) : (
               <TouchableOpacity style={Style.button} onPress={showHelloScreen}>
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
   cardTop: {
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
   subTitle: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.amarelo2
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
      borderColor: colors.amarelo2,
      borderWidth: 1.2,
      borderRadius: 5,
      fontSize: 17,
      marginBottom: 20,
      backgroundColor: 'transparent', // Fundo transparente
   },
   picker: {
      width: '100%',
      height: 55,
      paddingHorizontal: 10,
      borderWidth: 1.2,
      borderColor: colors.amarelo2,
      borderRadius: 5,
      color: colors.tituloBranco,
      backgroundColor: 'transparent', // Fundo transparente
      marginBottom: 20,
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
   btnText: {
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
   containerFone: {
      flexDirection: 'row', // Alinha os inputs horizontalmente
      alignItems: 'center',
      marginBottom: 15,
   },
   areaCodeInput: {
      height: 50,
      width: 80, // Largura fixa para o código de área
      paddingHorizontal: 10,
      borderWidth: 1.2,
      borderColor: colors.amarelo2,
      borderRadius: 5,
      color: colors.tituloBranco,
      backgroundColor: 'transparent', // Fundo transparente
      marginRight: 5, // Espaço entre os inputs
   },
   phoneInput: {
      flex: 1, // O número do telefone ocupa o restante do espaço
      height: 50,
      paddingHorizontal: 10,
      borderWidth: 1.2,
      borderColor: colors.amarelo2,
      borderRadius: 5,
      color: colors.tituloBranco,
      backgroundColor: 'transparent', // Fundo transparente
   },
});
