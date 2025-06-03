import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PowerOutageEvent, RootStackParamList } from '../types';
import { saveOrUpdateEvent } from '../storage/eventStorage';
import uuid from 'react-native-uuid'; // Para gerar IDs únicos
import { AppNavigationProp } from '../../App'; 


type DamageScreenRouteProp = RouteProp<RootStackParamList, 'Prejuízos'>;

export default function DamageScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<DamageScreenRouteProp>();

  const { eventId, currentEventData } = route.params; // Recebe os dados acumulados

  const [damages, setDamages] = useState(currentEventData.damages || '');

  const handleSave = async () => {
    if (!currentEventData.location || !currentEventData.duration) {
        Alert.alert("Erro", "Dados de localização ou duração estão faltando. Volte e preencha.");
        return;
    }

    const finalEventData: PowerOutageEvent = {
      id: eventId || (uuid.v4() as string), // Usa ID existente ou gera um novo
      location: currentEventData.location,
      duration: currentEventData.duration,
      damages: damages,
      reportDate: new Date().toISOString(), // Data atual do registro/atualização
    };

    try {
      await saveOrUpdateEvent(finalEventData);
      Alert.alert(
        "Sucesso!", 
        `Evento ${eventId ? 'atualizado' : 'registrado'} com sucesso.`,
        [{ text: "OK", onPress: () =>  navigation.popToTop() }] // Volta para a HomeScreen
      );
     
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      Alert.alert("Erro", "Não foi possível salvar o evento.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Descrição dos Prejuízos (Opcional):</Text>
      <TextInput
        style={styles.inputMultiLine}
        value={damages}
        onChangeText={setDamages}
        placeholder="Descreva os prejuízos observados: residências impactadas, estabelecimentos afetados, equipamentos danificados, etc."
        multiline
        numberOfLines={5}
      />

      <Button title={eventId ? "Atualizar Evento" : "Salvar Evento"} onPress={handleSave} />
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
  inputMultiLine: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 100,
    textAlignVertical: 'top', // Para Android
  },
});
