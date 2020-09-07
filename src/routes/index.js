import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from '../views/Login/index';
import Student from '../views/Student/index';
import ClassList from '../views/Student/classList';

const Stack = createStackNavigator();

function StudentScreen() {
  return <Student />;
}

function LoginScreen() {
  return <Login />;
}

function ClassListScreen() {
  return <ClassList />;
}

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Student" component={StudentScreen} />
        <Stack.Screen name="ClassList" component={ClassListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;