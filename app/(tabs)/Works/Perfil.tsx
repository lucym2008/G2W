import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const Perfil = () => {
  const router = useRouter();

  // Acessa os parâmetros da query
  const user = router.query.user;

  // Converte os dados de volta para um objeto (se necessário)
  const id = user ? JSON.parse(user) : null;

  return (
    <View>
      <Text>Página 2</Text>
      {id && (
        <>
          <Text>ID: {id.id}</Text>
          <Text>Nome: {id.name}</Text>
          <Text>Email: {id.email}</Text>
        </>
      )}
    </View>
  );
};

export default Perfil;
