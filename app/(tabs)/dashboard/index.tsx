import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/src/firebase/config';
import { colors } from '@/src/COMPONENTS/global';
import { Botão, BotãoInicio } from '@/src/COMPONENTS/Botão';
import { useRouter } from 'expo-router';
import Job from '@/src/firebase/interface';
import getVagas from '@/src/firebase/getData';

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const EnterVagas = () => {
    router.replace('/(tabs)/Works/VagasEmprego');
  };
  const CriarVagas = () => {
    router.replace('/(tabs)/Works/criarVaga');
  };

  useEffect(() => {
    const DadosJobs = {setJobs, setFilteredJobs, setLoading }
    getVagas(DadosJobs);
  }, []);

  const renderItem = ({ item }: {item: Job}) => (
    <View style={stylesVagas.item}>
      <Text style={stylesVagas.title}>{item.name}</Text>
      <Text style={stylesVagas.text}>Empresa: {item.empresa}</Text>
      <Text style={stylesVagas.text}>Salário: R$ {item.salario}</Text>
      <Text style={stylesVagas.text}>Contato: {item.fone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.BoxContainer}>
          <Text style={styles.vagas}>Você pode navegar sobre vagas de emprego na sua região:</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.amarelo1} />
          ) : (
            <FlatList
              data={filteredJobs}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
            />
          )}
          <BotãoInicio onPress={EnterVagas}>
            <Text>Veja mais</Text>
          </BotãoInicio>
        </View>
        <View style={styles.BoxContainer}>
          <Text style={styles.vagas}>Mais oportunidades para você:</Text>
          {loading ? (
            <ActivityIndicator size="large" color={colors.amarelo1} />
          ) : (
            <FlatList
              data={filteredJobs}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
            />
          )}
          <Botão onPress={CriarVagas}>
            <Text>Veja mais</Text>
          </Botão>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fundo,
  },
  Title: {
    fontSize: 35,
    color: colors.amarelo1,
  },
  SubTitle: {    
    fontSize: 19,
    marginTop: 10,
    color: colors.tituloBranco,
  },
  vagas: {
    fontSize: 17,
    color: colors.tituloBranco,
  },
  BoxContainer: {
    width: "100%",
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 20
  },
  scrollArea: {
    flex: 1,
    marginTop: 10,
  },
});

const stylesVagas = StyleSheet.create({
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
