// Tela inicial: exibe um resumo dos eventos e permite adicionar novos

import React, { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllEvents, deleteEventById } from '../storage/eventStorage';
import { AppNavigationProp } from '../../App'; 
import { PowerOutageEvent } from '../types';  
export default function HomeScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const [events, setEvents] = useState<PowerOutageEvent[]>([]);

  const loadEvents = useCallback(async () => {
    const storedEvents = await getAllEvents();
    setEvents(storedEvents.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()));
  }, []);

  // useFocusEffect é chamado toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [loadEvents])
  );

  const handleAddEvent = () => {
    navigation.navigate('Localização', {}); // Inicia um novo evento sem dados preenchidos
  };

  const handleDeleteEvent = (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este evento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: async () => {
          await deleteEventById(id);
          loadEvents(); // Recarrega os eventos após a exclusão
        }}
      ]
    );
  };

  const renderItem = ({ item }: { item: PowerOutageEvent }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
      onLongPress={() => handleDeleteEvent(item.id)} // Permite excluir com long press
    >
      <Text style={styles.itemTitle}>
        Local: {item.location.city || 'N/A'}, {item.location.neighborhood || 'N/A'}
      </Text>
      <Text style={styles.itemText}>
        Início: {item.duration.startTime ? item.duration.startTime.toLocaleString('pt-BR') : 'N/A'}
      </Text>
      <Text style={styles.itemText}>
        Registrado em: {new Date(item.reportDate).toLocaleDateString('pt-BR')}
      </Text>
      <Text style={styles.itemHint}>(Pressione e segure para excluir)</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Registrar Nova Falta de Energia" onPress={handleAddEvent} />
      <Button title="Ver Recomendações" onPress={() => navigation.navigate('Recomendações')} />
      {events.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum evento registrado ainda.</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  list: {
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  itemHint: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

