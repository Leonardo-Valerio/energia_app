// Arquivo principal do aplicativo, configura a navegação

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types'; // Importa os tipos de navegação

import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen';
import DurationScreen from './src/screens/DurationScreen';
import DamageScreen from './src/screens/DamageScreen';
import TipsScreen from './src/screens/TipsScreen';
import EventDetailScreen from './src/screens/EventDetailScreen'; // Nova tela

// Hook customizado para tipar a navegação
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Painel de Eventos' }} 
        />
        <Stack.Screen 
          name="Localização" 
          component={LocationScreen} 
          options={{ title: 'Cadastro: Localização' }} 
        />
        <Stack.Screen 
          name="Duração" 
          component={DurationScreen} 
          options={{ title: 'Cadastro: Duração' }} 
        />
        <Stack.Screen 
          name="Prejuízos" 
          component={DamageScreen} 
          options={{ title: 'Cadastro: Prejuízos' }} 
        />
        <Stack.Screen 
          name="Recomendações" 
          component={TipsScreen} 
          options={{ title: 'Recomendações' }} 
        />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen} 
          options={{ title: 'Detalhes do Evento' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

