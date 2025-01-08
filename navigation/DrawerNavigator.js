import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen'; // Tela Principal

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const [activeItem, setActiveItem] = useState(''); // Para rastrear qual item foi clicado
  const [subMenus, setSubMenus] = useState({
    conformidade: false,
    gpo: false,
    epi: false,
    incendio: false,
    ho: false,
    culturaSSO: false,
    pericias: false,
    contratadas: false,
    tributacao: false,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const toggleSubMenu = (key) => {
    setSubMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    setActiveItem(key); // Aplica o estilo ativo ao item com submenu
  };

  const handleItemPress = (key, navigateTo) => {
    setActiveItem(key); // Define o item clicado como ativo
    navigation.navigate(navigateTo);
  };

  return (
    <View style={styles.container}>
      {/* Logo na parte superior */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-rsdata.png')} style={styles.logo} />
      </View>

      {/* Campo de busca */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#e0f7fa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Início */}
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'inicio' ? styles.activeMenuItem : null,
        ]}
        onPress={() => handleItemPress('inicio', 'Início')}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeItem === 'inicio' ? '#0098c9' : '#fff'}
        />
        <Text
          style={[
            styles.menuText,
            activeItem === 'inicio' ? styles.activeMenuText : null,
          ]}
        >
          Início
        </Text>
      </TouchableOpacity>

      {/* Conformidade Legal */}
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'conformidade' ? styles.activeMenuItem : null,
        ]}
        onPress={() => toggleSubMenu('conformidade')}
      >
        <MaterialIcons
          name="gavel"
          size={24}
          color={activeItem === 'conformidade' ? '#0098c9' : '#fff'}
        />
        <Text
          style={[
            styles.menuText,
            activeItem === 'conformidade' ? styles.activeMenuText : null,
          ]}
        >
          Conformidade Legal
        </Text>
        <MaterialIcons
          name={subMenus.conformidade ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={activeItem === 'conformidade' ? '#0098c9' : '#fff'}
        />
      </TouchableOpacity>
      {subMenus.conformidade && (
        <View style={styles.subMenu}>
          <TouchableOpacity
            onPress={() => handleItemPress('submenu1', 'Submenu Conformidade 1')}
          >
            <Text style={styles.subMenuText}>Submenu 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleItemPress('submenu2', 'Submenu Conformidade 2')}
          >
            <Text style={styles.subMenuText}>Submenu 2</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Outros Itens */}
      {[
        { key: 'gpo', label: 'GPO', icon: 'business-center', navigateTo: 'GPO' },
        { key: 'epi', label: 'Gestão de EPI\'s', icon: 'security', navigateTo: 'GestaoEPIs' },
        { key: 'incendio', label: 'Incêndio e Pânico', icon: 'local-fire-department', navigateTo: 'IncendioPanico' },
        { key: 'ho', label: 'HO', icon: 'health-and-safety', navigateTo: 'HO' },
        { key: 'culturaSSO', label: 'Cultura SSO', icon: 'group', navigateTo: 'CulturaSSO' },
        { key: 'pericias', label: 'Perícias e Demandas Judiciais', icon: 'balance', navigateTo: 'Pericias' },
        { key: 'contratadas', label: 'Contratadas', icon: 'people', navigateTo: 'Contratadas' },
        { key: 'tributacao', label: 'Tributação SSO', icon: 'account-balance', navigateTo: 'TributacaoSSO' },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            activeItem === item.key ? styles.activeMenuItem : null,
          ]}
          onPress={() => handleItemPress(item.key, item.navigateTo)}
        >
          <MaterialIcons
            name={item.icon}
            size={24}
            color={activeItem === item.key ? '#0098c9' : '#fff'}
          />
          <Text
            style={[
              styles.menuText,
              activeItem === item.key ? styles.activeMenuText : null,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#0098c9',
        },
        headerStyle: {
          backgroundColor: '#0098c9',
        },
        headerTintColor: '#fff',
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <MaterialIcons name="menu" size={28} color={tintColor} />
          </TouchableOpacity>
        ),
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => alert('Usuário')}
          >
            <MaterialIcons name="person" size={28} color={tintColor} />
          </TouchableOpacity>
        ),
      }}
    >

        <Drawer.Screen
          name="Início"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0098c9',
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  searchInput: {
    backgroundColor: '#ffffff44',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  activeMenuItem: {
    backgroundColor: '#e0f7fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  activeMenuText: {
    color: '#0098c9',
  },
  subMenu: {
    paddingLeft: 40,
    marginVertical: 10,
  },
  subMenuText: {
    fontSize: 16,
    color: '#e0f7fa',
    paddingVertical: 5,
  },
});
