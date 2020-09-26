import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7c03',
  },
  titulo: {
    fontSize: 25,
    fontFamily: 'Marmelad-Regular',
    textAlign: 'center',
    color: 'white',
  },
  welcome: {
    fontSize: 25,
    fontFamily: 'Marmelad-Regular',
    textAlign: 'center',
    color: 'white',
    paddingTop: 15,
  },
  header: {
    fontSize: 25,
    fontFamily: 'Marmelad-Regular',
    textAlign: 'center',
    color: 'white',
    paddingTop: 20,
  },
  image: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingLeft: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default styles;
