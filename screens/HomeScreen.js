import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const options = [
  { id: 1, title: 'GPO', color: '#4caf50', icon: 'work' },
  { id: 2, title: 'Incêndio e Pânico', color: '#ff9800', icon: 'fire-extinguisher' },
  { id: 3, title: 'Cultura SSO', color: '#ffc107', icon: 'group' },
  { id: 4, title: 'Contratadas', color: '#f44336', icon: 'people' },
  { id: 5, title: 'Conformidade Legal', color: '#03a9f4', icon: 'gavel' },
  { id: 6, title: 'Gestão de EPI\'s', color: '#009688', icon: 'shield' },
  { id: 7, title: 'HO', color: '#8bc34a', icon: 'health-and-safety' },
  { id: 8, title: 'Perícias e Demandas Judiciais', color: '#e91e63', icon: 'balance-scale' },
  { id: 9, title: 'Tributação SSO', color: '#673ab7', icon: 'account-balance' },
];

export default function HomeScreen() {
  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={24} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <Text style={styles.optionSubtitle}>
          Gerenciar os Equipamentos de Proteção Individual e Coletiva, quanto à aplicabilidade, monitoramento do uso e validação.
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="home" size={28} color="#fff" />
        <Text style={styles.headerTitle}>Início</Text>
      </View>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOption}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.footer}>Versão 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0098c9',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  list: {
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    paddingVertical: 10,
  },
});
