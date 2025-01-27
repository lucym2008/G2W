
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Alert } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { fetchJobs } from '@/src/firebase/getData';
import { SearchParams, useGlobalSearchParams } from 'expo-router';
import { BotãoInicio } from '@/src/COMPONENTS/Botão';

const VagasEmprego = () => {
  const { coleção, campo, valor } = useGlobalSearchParams(); // Obtém o valor passado da tela anterior Home
  const dataBox = {coleção, campo, valor}

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const valueData = {setJobs, setFilteredJobs, setLoading }
    fetchJobs(valueData, dataBox); //Envia a função os valores que vc ecolheu na home como parametros
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        (job.name && job.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.empresa && job.empresa.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Empresa: {item.empresa}</Text>
      <Text style={styles.text}>Salário: R$ {item.salario}</Text>
      <Text style={styles.text}>Contato: {item.fone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleTop}> {campo}: {valor}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar vagas..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.amarelo1} />
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

    </View>
  );
};

export default VagasEmprego


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.fundo,
  },
  searchBar: {
    height: 40,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: colors.tituloBranco,
    fontSize: 16,
  },
  titleTop :{
    color: colors.tituloBranco,
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "400"
  },
  item: {
    padding: 15,
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
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.tituloBranco,
  },
});
