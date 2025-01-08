import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen'; 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const [activeItem, setActiveItem] = useState('');
  const [subMenus, setSubMenus] = useState({
    conformidade: false,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const toggleSubMenu = (key) => {
    setSubMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    setActiveItem(key);
  };

  const handleItemPress = (key, navigateTo) => {
    setActiveItem(key);
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

      {/* Outros Itens */}
      {[
        { key: 'conformidade', label: 'Conformidade Legal', icon: 'gavel', navigateTo: 'Conformidade' },
        { key: 'gpo', label: 'GPO', icon: 'business-center', navigateTo: 'GPO' },
        { key: 'epi', label: 'Gestão de EPI\'s', icon: 'security', navigateTo: 'GestaoEPIs' },
        { key: 'incendio', label: 'Incêndio e Pânico', icon: 'local-fire-department', navigateTo: 'IncendioPanico' },
        { key: 'ho', label: 'HO', icon: 'health-and-safety', navigateTo: 'HO' },
        { key: 'culturaSSO', label: 'Cultura SSO', icon: 'group', navigateTo: 'CulturaSSO' },
        { key: 'pericias', label: 'Perícias e Demandas Judiciais', icon: 'balance', navigateTo: 'Pericias' },
        { key: 'contratadas', label: 'Contratadas', icon: 'people', navigateTo: 'Contratadas' },
        { key: 'tributacao', label: 'Tributação SSO', icon: 'account-balance', navigateTo: 'TributacaoSSO' },
      ].map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              activeItem === item.key ? styles.activeMenuItem : null,
            ]}
            onPress={() =>
              item.key === 'conformidade' ? toggleSubMenu(item.key) : handleItemPress(item.key, item.navigateTo)
            }
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
            <MaterialIcons
              name={subMenus[item.key] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color={activeItem === item.key ? '#0098c9' : '#fff'}
            />
          </TouchableOpacity>

          {/* Submenu dentro de Conformidade Legal */}
          {item.key === 'conformidade' && subMenus.conformidade && (
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
        </View>
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
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 5,
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
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  activeMenuText: {
    color: '#0098c9',
  },
  subMenu: {
    paddingLeft: 40,
    marginVertical: 5,
  },
  subMenuText: {
    fontSize: 16,
    color: '#e0f7fa',
    paddingVertical: 5,
  },
});
