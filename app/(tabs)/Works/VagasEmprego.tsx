
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/src/firebase/config';
import { colors } from '@/src/COMPONENTS/global';

const VagasEmprego = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
        const q = query(
          collection(db, "Vagas-trabalho"),
          where("uid", "==", "gnxZyjqSPmXCmzqFlv0001JL1T92"), // Condição
        );
        const querySnapshot = await getDocs(q);  
      const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsArray);
      setFilteredJobs(jobsArray); // Inicializa com todos os dados
    } catch (error) {
      console.error("Erro ao buscar as vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
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
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar vagas..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.yellow} />
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

export default VagasEmprego;

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
