// Tela para registrar/editar a localização do evento

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PowerOutageEventLocation, RootStackParamList, PowerOutageEvent } from '../types';
import { AppNavigationProp } from '../../App'; 

type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Localização'>;

export default function LocationScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<LocationScreenRouteProp>();

  // Dados do evento que estão sendo construídos ou editados
  const eventId = route.params?.eventId;
  const initialEventData = route.params?.currentEventData || {};

  const [neighborhood, setNeighborhood] = useState(initialEventData.location?.neighborhood || '');
  const [city, setCity] = useState(initialEventData.location?.city || '');
  const [cep, setCep] = useState(initialEventData.location?.cep || '');

  const handleNext = () => {
    const locationData: PowerOutageEventLocation = { neighborhood, city, cep };
    const updatedEventData = {
      ...initialEventData,
      location: locationData,
    };
    // Navega para a próxima tela (Duração), passando os dados acumulados
    navigation.navigate('Duração', { eventId, currentEventData: updatedEventData });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Bairro:</Text>
      <TextInput
        style={styles.input}
        value={neighborhood}
        onChangeText={setNeighborhood}
        placeholder="Ex: Centro"
      />

      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Ex: São Paulo"
      />

      <Text style={styles.label}>CEP (Opcional):</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        placeholder="Ex: 01000-000"
        keyboardType="numeric"
      />

      <Button title="Próximo: Duração da Interrupção" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
  },
});

