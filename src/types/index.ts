export interface PowerOutageEventLocation {
  neighborhood?: string; // Bairro
  city?: string;       // Cidade
  cep?: string;        // CEP
}

export interface PowerOutageEventDuration {
  startTime?: Date;    // Data e hora de início
  endTime?: Date;      // Data e hora de fim
  notes?: string;      // Observações sobre a duração (ex: "estimativa de 2 horas")
}

export interface PowerOutageEvent {
  id: string;          // Identificador único do evento
  location: PowerOutageEventLocation;
  duration: PowerOutageEventDuration;
  damages?: string;    // Descrição dos prejuízos
  reportDate: string;  // Data de criação do registro (ISO string)
}

// Define os tipos para os parâmetros de cada tela na navegação
export type RootStackParamList = {
  Home: undefined; // Tela inicial, sem parâmetros
  Localização: { eventId?: string; currentEventData?: Partial<PowerOutageEvent> }; // Tela de Localização
  Duração: { eventId?: string; currentEventData: Partial<PowerOutageEvent> };    // Tela de Duração
  Prejuízos: { eventId?: string; currentEventData: Partial<PowerOutageEvent> };  // Tela de Prejuízos
  Recomendações: undefined; // Tela de Recomendações
  EventDetail: { eventId: string }; // Tela de Detalhes do Evento
};