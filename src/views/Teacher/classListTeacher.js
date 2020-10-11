/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import styles from './styles';

export default function ClassListTeacher() {
  const usuarios = firestore().collection('usuarios');
  const aulas = firestore().collection('aulas');
  const [listaAulas, setListaAulas] = useState({});

  async function getAulas(email) {
    await aulas
      .where('professorEmail', '==', email)
      .get()
      .then((response) => {
        const resultAulas = [];

        response.forEach((documentSnapshot) => {
          resultAulas.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setListaAulas(resultAulas);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getProfessorEmail(id) {
    const email = await AsyncStorage.getItem('@emailProfessor');
    usuarios
      .doc('tipo')
      .collection('professores')
      .doc(id)
      .get()
      .then((x) => {
        AsyncStorage.setItem('@emailProfessor', x.data().email);
        getAulas(email);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    async function getProfessorDados() {
      const id = await AsyncStorage.getItem('@user');
      const email = await AsyncStorage.getItem('@emailProfessor');
      if (email !== null) {
        getAulas(email);
      } else {
        getProfessorEmail(id);
      }
    }
    getProfessorDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Aulas</Text>
      <FlatList
        data={listaAulas}
        renderItem={({ item }) => (
          <View
            style={{
              height: 80,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFCC00',
              marginTop: 10,
            }}
          >
            <Text>Disciplina: {item.disciplinaAula}</Text>
            <Text>Turma: {item.turmaNome} </Text>
            <Text>
              Horário de Início:
              {format(item.inicio.toDate(), ' d/M/yyyy - H:mm')}
            </Text>
            <Text>
              Horário de Fim:{format(item.fim.toDate(), ' d/M/yyyy - H:mm')}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
