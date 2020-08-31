/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import RNExitApp from 'react-native-exit-app';
import styles from './styles';

export default function Student() {
  const navigation = useNavigation();
  const usuarios = firestore().collection('usuarios');
  const [user, setUser] = useState([]);
  const [nome, setNome] = useState();
  const [foto, setFoto] = useState();

  useEffect(() => {
    function setFirstName(u) {
      const fullName = u;
      const firstName = fullName.split(' ')[0];
      setNome(firstName);
    }

    function setPhoto(p) {
      const photo = p.replace('96', '64');
      setFoto(photo);
    }

    async function getUser() {
      const id = await (await AsyncStorage.getItem('@user')).slice(1, -1);
      usuarios
        .doc(id)
        .get()
        .then((x) => {
          setUser(x);
          setFirstName(x._data.nome);
          setPhoto(x._data.fotoUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Página do Aluno</Text>
      <Text style={styles.welcome}>
        <Image style={styles.image} source={{ uri: foto }} />
        {` ${nome}`}
      </Text>
      <Text style={styles.header}>O que você deseja fazer?</Text>
      <Button title="Efetuar Presença" />
      <Button title="Lista de Aulas" />
      <Button title="Minha Frequência" />
      <Button title="Sair" onPress={() => RNExitApp.exitApp()} />
    </View>
  );
}
