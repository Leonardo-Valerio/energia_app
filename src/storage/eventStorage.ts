// Funções para interagir com o AsyncStorage para salvar, carregar e gerenciar eventos

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PowerOutageEvent } from '../types';

const EVENTS_KEY = '@PowerOutageApp:events';

// Salva todos os eventos
const saveAllEvents = async (events: PowerOutageEvent[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(events);
    await AsyncStorage.setItem(EVENTS_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar eventos no AsyncStorage", e);
  }
};

// Adiciona um novo evento ou atualiza um existente
export const saveOrUpdateEvent = async (event: PowerOutageEvent): Promise<void> => {
  try {
    const existingEvents = await getAllEvents();
    const eventIndex = existingEvents.findIndex(e => e.id === event.id);

    if (eventIndex > -1) {
      // Atualiza evento existente
      existingEvents[eventIndex] = event;
    } else {
      // Adiciona novo evento
      existingEvents.push(event);
    }
    await saveAllEvents(existingEvents);
  } catch (e) {
    console.error("Erro ao salvar ou atualizar evento", e);
  }
};

// Busca todos os eventos registrados
export const getAllEvents = async (): Promise<PowerOutageEvent[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
    if (jsonValue != null) {
      const events: PowerOutageEvent[] = JSON.parse(jsonValue);
      // Converte strings de data de volta para objetos Date
      return events.map(event => ({
        ...event,
        duration: {
          ...event.duration,
          startTime: event.duration.startTime ? new Date(event.duration.startTime) : undefined,
          endTime: event.duration.endTime ? new Date(event.duration.endTime) : undefined,
        },
        reportDate: event.reportDate // Mantém como string, mas poderia converter se necessário
      }));
    }
    return [];
  } catch (e) {
    console.error("Erro ao buscar eventos do AsyncStorage", e);
    return [];
  }
};

// Busca um evento específico pelo ID
export const getEventById = async (id: string): Promise<PowerOutageEvent | null> => {
  try {
    const events = await getAllEvents();
    const event = events.find(e => e.id === id);
    return event || null;
  } catch (e) {
    console.error("Erro ao buscar evento por ID", e);
    return null;
  }
};

// Deleta um evento pelo ID
export const deleteEventById = async (id: string): Promise<void> => {
  try {
    let events = await getAllEvents();
    events = events.filter(event => event.id !== id);
    await saveAllEvents(events);
  } catch (e) {
    console.error("Erro ao deletar evento por ID", e);
  }
};

// Limpa todos os eventos (para fins de teste ou reset)
export const clearAllEvents = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(EVENTS_KEY);
  } catch (e) {
    console.error("Erro ao limpar todos os eventos", e);
  }
};
