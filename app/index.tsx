// 'PAGINA INICIAL'
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router'; //TENTANDO FAZER A NAVEGAÇÃO
import { colors } from '../src/COMPONENTS/global';
import { BotãoInicio } from '../src/COMPONENTS/Botão'
import { Dimensions } from 'react-native';

//DIMENSÕES DA TELA Q CONVERSAMOS
const { width, height } = Dimensions.get('window');


export default function Index() {
  const router = useRouter(); // Hook para navegação
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setor, setSetor] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function Login() {
    router.replace('/Login')
  }
  function Criar() {
    router.replace('/Criar')
  }

  return (
    <View style={Start.container}>
      <View style={Start.boxTop}>

      </View>
      <View style={Start.card}>

          <BotãoInicio onPress={Login}>
            <Text style={Start.btnText}>
              Entre na sua conta              
            </Text>
          </BotãoInicio>

          <BotãoInicio onPress={Criar}>
            <Text style={Start.btnText}>
              Crie sua conta
            </Text>
          </BotãoInicio>

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
    justifyContent: "center",
    backgroundColor: "#242424"
  },
  boxTop: {
    height: height * 0.4
  },
  card:{
    width: width * 0.9,
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.amarelo1,
    borderRadius: 30,
  },
  btnText:{
    color: colors.preto,
    fontSize: 18,
  },
})