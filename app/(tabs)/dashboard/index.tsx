import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { Botão, BotãoInicio } from '@/src/COMPONENTS/Botão';
import { useRouter } from 'expo-router';
import { getVagas } from '@/src/firebase/getData';
import { height, Vagas, width } from '@/src/firebase/interfaces';

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //Essa função ela envia atraves das telas "router.push" os valores q vc selecionou ao clicar na box
  const boxSetores = (coleção: any, campo: any, valor: any) => {
    router.push(`/(tabs)/Works/VagasEmprego?coleção=${coleção}&campo=${campo}&valor=${valor}`); // Passa ambos os valores como parâmetros
  };
  const CriarVagas = () => {
    router.replace('/(tabs)/Works/criarVaga');
  };
  useEffect(() => {
    const DadosJobs = {setJobs, setFilteredJobs, setLoading }
    getVagas(DadosJobs);
  }, []);
  const renderItem = ({ item }: {item: Vagas}) => (
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

        <View style={styles.AreaTop}>
          
        </View>
        
        <View style={styles.containerBoxs}>
            //Area de box para setores
            <Text style={styles.SubTitle}>Areas de vagas</Text>
            <View style={styles.AreaContainerEmpresas}>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={
                    //Ao clicar no box, vc envia a função boxSetores um 3 valores para servir na busca da pesquisa q vc clicou
                    () => boxSetores('Vagas-trabalho', 'setor', 'Saude')
                  }>
                    <Text style={styles.BoxContainerEmpresas_text}>Saúde</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'TI')}>
                    <Text style={styles.BoxContainerEmpresas_text}>TI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'Engenharia')}>
                    <Text style={styles.BoxContainerEmpresas_text}>Engenharia</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'Engenharia')}>
                    <Text style={styles.BoxContainerEmpresas_text}>Engenharia</Text>
                  </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.BoxContainer}>
              <Text style={styles.SubTitle}>Você pode navegar sobre vagas de emprego na sua região:</Text>
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
            <View style={styles.BoxContainer}>
              <Text style={styles.SubTitle}>Mais oportunidades para você:</Text>
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

        </View>
      </ScrollView>
    </View>
  );;
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scrollArea: {
    flex: 1,
    marginTop: 10,
  },
  AreaTop:{
    width: width*1,
    height: height * 0.22,
    borderBottomLeftRadius: 100,
    backgroundColor: colors.fundo2
  },
  containerBoxs: {
    padding: 15,
    width: width*1,
    height: height * 1,
    marginTop: 10,
  },
  BoxContainer: {
    width: "100%",
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20
  },
  SubTitle: {
    fontSize: 17,
    color: colors.tituloBranco,
  },
  AreaContainerEmpresas: {
    width: "100%",
    maxHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  BoxContainerEmpresas: {
    width: 100,
    height: 90,
    backgroundColor: colors.cinza,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  BoxContainerEmpresas_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.tituloAmarelo
  },

});

const stylesVagas = StyleSheet.create({
  item: {
    padding: 7,
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
    left: 20,
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    left: 40,
    color: colors.tituloBranco,
  },
});
