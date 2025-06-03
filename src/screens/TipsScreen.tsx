// Tela para exibir recomendações e boas práticas

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TipsScreen() {
  const recommendations = [
    {
      id: '1',
      title: 'Antes da Falta de Energia (Prevenção):',
      points: [
        'Mantenha lanternas e pilhas carregadas e em locais de fácil acesso.',
        'Tenha um kit de emergência com água, alimentos não perecíveis, rádio a pilha e medicamentos essenciais.',
        'Carregue completamente celulares e power banks.',
        'Desconecte aparelhos eletrônicos sensíveis da tomada para evitar danos por picos de tensão no retorno da energia.',
        'Informe-se sobre os alertas meteorológicos da sua região.',
        'Se utiliza equipamentos médicos que dependem de energia, tenha um plano B (baterias, gerador) e informe os serviços de emergência sobre sua condição.',
      ],
    },
    {
      id: '2',
      title: 'Durante a Falta de Energia:',
      points: [
        'Use lanternas em vez de velas para evitar riscos de incêndio.',
        'Mantenha geladeiras e freezers fechados para conservar os alimentos por mais tempo.',
        'Evite abrir e fechar portas e janelas desnecessariamente para manter a temperatura interna.',
        'Ouça um rádio a pilha para se manter informado sobre a situação.',
        'Economize a bateria do celular, utilizando-o apenas para comunicações essenciais.',
        'Se precisar sair, tenha cuidado com fios caídos e áreas alagadas.',
      ],
    },
    {
      id: '3',
      title: 'Após o Retorno da Energia:',
      points: [
        'Verifique se há danos em aparelhos eletrônicos antes de religá-los.',
        'Ligue os aparelhos gradualmente para evitar sobrecarga na rede.',
        'Descarte alimentos que possam ter estragado devido à falta de refrigeração.',
        'Informe a companhia elétrica sobre quaisquer problemas persistentes na rede.',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Orientações e Boas Práticas</Text>
      {recommendations.map(section => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.points.map((point, index) => (
            <Text key={index} style={styles.point}>• {point}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f4511e',
  },
  point: {
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 22,
    color: '#444',
  },
});

