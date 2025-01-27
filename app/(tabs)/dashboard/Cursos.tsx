import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Para usar ícones de setas
import { db } from '@/src/firebase/config';
import { colors } from '@/src/COMPONENTS/global';

export default function Cursos() {
  const [jobs, setJobs] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0); // Índice do cartão atual
  const [loading, setLoading] = useState(true);

  // Função para buscar vagas do Firestore
  const fetchJobs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Vagas-trabalho'));
      const jobsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsArray);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as vagas.');
    } finally {
      setLoading(false);
    }
  };
  // Função chamada ao gostar da vaga
  const handleLike = () => {
    if (currentJobIndex < jobs.length) {
      const job = jobs[currentJobIndex];
      console.log('Gostou da vaga:', job);
      Alert.alert('Gostou!', `Você curtiu a vaga: ${job.name}`);
      nextJob(); // Vai para o próximo cartão
    }
  };
  // Função chamada ao não gostar da vaga
  const handleDislike = () => {
    if (currentJobIndex < jobs.length) {
      const job = jobs[currentJobIndex];
      console.log('Não gostou da vaga:', job);
      Alert.alert('Não gostou', `Você rejeitou a vaga: ${job.name}`);
      nextJob(); // Vai para o próximo cartão
    }
  };
  // Função para ir para o próximo cartão
  const nextJob = () => {
    if (currentJobIndex < jobs.length - 1) {
      setCurrentJobIndex(currentJobIndex + 1);
    } else {
      Alert.alert('Fim', 'Você já viu todas as vagas disponíveis.');
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando vagas...</Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    return <Text style={styles.noJobs}>Nenhuma vaga disponível</Text>;
  }

  const currentJob = jobs[currentJobIndex];

  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.title}>{currentJob.name}</Text>
        <Text style={styles.description}>{currentJob.empresa}</Text>
        <Text style={styles.mode}>Salário: R$ {currentJob.salario}</Text>
        <Text style={styles.mode}>Modalidade: {currentJob.modalidades}</Text>
        <Text style={styles.mode}>Experien: {currentJob.Experiencia}</Text>
        <Text style={styles.mode}>Competençias: {currentJob.Competencias}</Text>
        <Text style={styles.mode}>Modalidade: {currentJob.selectedOption}</Text>
        <Text style={styles.mode}>Contato: {currentJob.fone}</Text>
      {/* Botões para controle */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.dislikeButton]}
          onPress={handleDislike} // Não gostou
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleLike} // Gostou
        >
          <MaterialCommunityIcons name="information-outline" size={45} color="white" top={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={handleLike} // Gostou
        >
          <Ionicons name="arrow-forward" size={30} color="white" />
        </TouchableOpacity>
      </View>
      </View>
      
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 10,
    backgroundColor: colors.fundo2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.amarelo1,
    marginBottom: 7,
  },
  description: {
    fontSize: 22,
    color: colors.tituloAmarelo,
    marginBottom: 10,
  },
  mode: {
    fontSize: 18,
    color: colors.tituloBranco,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobs: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: width * 0.8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: 'red',
  },
  likeButton: {
    backgroundColor: 'green',
  },
});
