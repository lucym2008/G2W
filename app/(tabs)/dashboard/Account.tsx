import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { userData, userVagas } from '@/src/firebase/getData';
import { height, Users, Vagas, width } from '@/src/firebase/interfaces';

const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [usersVagas, setUserVaga] = useState([]);
  const [filteredVagas, setFilteredUserVagas] = useState([]);
  const [filteredUsersData, setFilteredUsersData] = useState([]);

  
  useEffect(() => {
    const userDadosConst = {setFilteredUsersData,setUsersData, setLoading};
    userData(userDadosConst);
    const userVagasConst = {setUserVaga, setFilteredUserVagas, setLoading};
    userVagas(userVagasConst);  
  }, []);

    const renderItem = ({ item } : {item: Users}) => (
    <View>
      <View style={styles.areaTop}>
        <Text style={styles.title}>{item.displayName}</Text>
        <Text style={styles.subTitle}>Usuario - {item.tipo}</Text>
      </View>
      <View style={styles.areaLow}>
            <Text style={styles.sub}>Informações da conta:</Text>
            <Text style={styles.text}>Setor: {item.setor}</Text>
            <Text style={styles.text}>Tipo de conta: {item.tipo}</Text>
            <Text style={styles.text}>Localização: {item.localizacao}</Text>
            <Text style={styles.text}>Contato: {item.email}</Text>
        </View>
    </View>
  );

    const renderItemVagas = ({ item } : {item: Vagas}) => (
    <View style={stylesVagas.item}>
      <Text style={stylesVagas.title}>{item.name}</Text>
      <Text style={stylesVagas.text}>Empresa: {item.empresa}</Text>
      <Text style={stylesVagas.text}>Salario: R$ {item.salario}</Text>
      <Text style={stylesVagas.text}>Expriençias: {item.Experiencia}</Text>
      <Text style={stylesVagas.text}>Contato: 99 () {item.fone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
      {Loading ? (
        <ActivityIndicator size="large" color={colors.amarelo1} />
          ) : (
            <FlatList
              data={filteredUsersData}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
            />
          )}
      <Text style={{fontSize: 20, color: colors.tituloBranco,left: 20}}>Suas vagas CLT:</Text>
      <View style={stylesVagas.AreaVagasView}>
          {Loading ? (
            <ActivityIndicator size="large" color={colors.amarelo1} />
          ) : (
            <FlatList
              data={filteredVagas}
              keyExtractor={(item) => item.id}
              renderItem={renderItemVagas}
              scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
            />
          )}
      </View>
    </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  areaTop: {
    backgroundColor: colors.fundo2,
    width: "100%",
    height: height * 0.20,
    alignItems: "center",
    justifyContent: "center"
  }, 
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.tituloAmarelo,
    marginBottom: 1,
    marginTop: 45
  },
  subTitle: {
    fontSize: 20,
    color: colors.tituloAmarelo,
  },
  areaLow: {
    width: width * 1,
    height: height * 0.35,
    alignItems: "center",
    backgroundColor: colors.fundo,
  },
  sub: {
    fontSize: 22,
    color: colors.tituloBranco,
    marginTop: 13,
    marginBottom: 10
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.tituloBranco,
    marginBlock: 3,
  },
});

const stylesVagas = StyleSheet.create({
  AreaVagasView: {
    padding: 20,
    width: "100%",
  },
  item: {
    padding: 5,
    marginVertical: 8,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 40,
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    left: 50,
    color: colors.tituloBranco,
  },
});

