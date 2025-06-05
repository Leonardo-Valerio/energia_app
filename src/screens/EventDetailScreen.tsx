// Tela para visualizar os detalhes de um evento específico

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { PowerOutageEvent, RootStackParamList } from '../types';
import { getEventById, deleteEventById } from '../storage/eventStorage';
import { AppNavigationProp } from '../../App'; 


type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

export default function EventDetailScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<EventDetailScreenRouteProp>();
  const { eventId } = route.params;
  const [event, setEvent] = useState<PowerOutageEvent | null>(null);

  const loadEventDetails = useCallback(async () => {
    const fetchedEvent = await getEventById(eventId);
    setEvent(fetchedEvent);
    if (fetchedEvent) {
        navigation.setOptions({ title: `Evento em ${fetchedEvent.location.city || 'N/A'}` });
    }
  }, [eventId, navigation]);

  useFocusEffect(
    useCallback(() => {
      loadEventDetails();
    }, [loadEventDetails])
  );

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Carregando detalhes do evento...</Text>
      </View>
    );
  }

  const handleEdit = () => {
    // Navega para a primeira tela do fluxo de edição, passando o ID e os dados atuais
    navigation.navigate('Localização', { eventId: event.id, currentEventData: event });
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este evento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: async () => {
          await deleteEventById(event.id);
          navigation.goBack(); // Volta para a HomeScreen
        }}
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        <Text style={styles.text}>Bairro: {event.location.neighborhood || 'Não informado'}</Text>
        <Text style={styles.text}>Cidade: {event.location.city || 'Não informado'}</Text>
        <Text style={styles.text}>CEP: {event.location.cep || 'Não informado'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duração da Interrupção</Text>
        <Text style={styles.text}>
          Início: {event.duration.startTime ? event.duration.startTime.toLocaleString('pt-BR') : 'Não informado'}
        </Text>
        <Text style={styles.text}>
          Fim: {event.duration.endTime ? event.duration.endTime.toLocaleString('pt-BR') : 'Não informado'}
        </Text>
        <Text style={styles.text}>Observações: {event.duration.notes || 'Nenhuma'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prejuízos Causados</Text>
        <Text style={styles.text}>{event.damages || 'Nenhum prejuízo descrito'}</Text>
      </View>
      
      <Text style={styles.reportDate}>Registrado em: {new Date(event.reportDate).toLocaleString('pt-BR')}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Editar Evento" onPress={handleEdit} />
        <Button title="Excluir Evento" onPress={handleDelete} color="red" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#f4511e',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  reportDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
