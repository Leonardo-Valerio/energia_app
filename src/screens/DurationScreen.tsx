// src/screens/DurationScreen.tsx
// Tela para registrar/editar a duração da interrupção

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { AppNavigationProp } from '../../App'; // Verifique se este caminho está correto
import {
  PowerOutageEventDuration,
  RootStackParamList,
  PowerOutageEvent, // Necessário para Partial<PowerOutageEvent>
} from '../types'; // Verifique se este caminho está correto

type DurationScreenRouteProp = RouteProp<RootStackParamList, 'Duração'>;

export default function DurationScreen() {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<DurationScreenRouteProp>();

  const { eventId, currentEventData } = route.params;

  const [startTime, setStartTime] = useState<Date | undefined>(
    currentEventData.duration?.startTime || undefined,
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    currentEventData.duration?.endTime || undefined,
  );
  const [notes, setNotes] = useState(currentEventData.duration?.notes || '');

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const onChangeStartTime = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    console.log(
      'Evento DateTimePicker (Início):',
      JSON.stringify(event, null, 2),
    );
    console.log('Data Selecionada (Início):', selectedDate);

    setShowStartTimePicker(false); // Oculta o seletor após interação

    if (event.type === 'set' && selectedDate) {
      setStartTime(selectedDate);
    }
  };

  const onChangeEndTime = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    console.log(
      'Evento DateTimePicker (Fim):',
      JSON.stringify(event, null, 2),
    );
    console.log('Data Selecionada (Fim):', selectedDate);

    setShowEndTimePicker(false); // Oculta o seletor após interação

    if (event.type === 'set' && selectedDate) {
      setEndTime(selectedDate);
    }
  };

  const handleNext = () => {
    const durationData: PowerOutageEventDuration = { startTime, endTime, notes };
    const updatedEventData: Partial<PowerOutageEvent> = {
      ...currentEventData,
      duration: durationData,
    };
    navigation.navigate('Prejuízos', {
      eventId,
      currentEventData: updatedEventData,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Data e Hora de Início:</Text>
      <TouchableOpacity
        onPress={() => {
          console.log("Tentando mostrar o seletor de Data/Hora de INÍCIO");
          setShowStartTimePicker(true);
        }}
        style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {startTime
            ? startTime.toLocaleString('pt-BR')
            : 'Selecionar Data/Hora de Início'}
        </Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="date"
          display="spinner" // ALTERADO PARA TESTE
          onChange={onChangeStartTime}
        />
      )}

      <Text style={styles.label}>Data e Hora de Fim (Opcional):</Text>
      <TouchableOpacity
        onPress={() => {
          console.log("Tentando mostrar o seletor de Data/Hora de FIM");
          console.log("Valor atual de startTime ao abrir EndTimePicker:", startTime);
          setShowEndTimePicker(true);
        }}
        style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {endTime
            ? endTime.toLocaleString('pt-BR')
            : 'Selecionar Data/Hora de Fim'}
        </Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="date"
          display="spinner" // ALTERADO PARA TESTE
          onChange={onChangeEndTime}
          minimumDate={startTime}
        />
      )}

      <Text style={styles.label}>Observações sobre a Duração (Opcional):</Text>
      <TextInput
        style={styles.inputMultiLine}
        value={notes}
        onChangeText={setNotes}
        placeholder="Ex: Estimativa de 2 horas, energia ainda não voltou"
        multiline
        numberOfLines={3}
      />

      <Button title="Próximo: Prejuízos Causados" onPress={handleNext} />
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
    fontWeight: '500',
  },
  inputMultiLine: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
});