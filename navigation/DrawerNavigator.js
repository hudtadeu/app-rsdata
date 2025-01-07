import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Telas
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => {
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

  const toggleSubMenu = (key) => {
    setSubMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      {/* Conformidade Legal */}
      <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubMenu('conformidade')}>
        <MaterialIcons name="gavel" size={24} color="#fff" />
        <Text style={styles.menuText}>Conformidade Legal</Text>
        <MaterialIcons
          name={subMenus.conformidade ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      {subMenus.conformidade && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Submenu 1')}>
            <Text style={styles.subMenuText}>Submenu 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Submenu 2')}>
            <Text style={styles.subMenuText}>Submenu 2</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* GPO */}
      <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubMenu('gpo')}>
        <MaterialIcons name="business-center" size={24} color="#fff" />
        <Text style={styles.menuText}>GPO</Text>
        <MaterialIcons
          name={subMenus.gpo ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      {subMenus.gpo && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Submenu A')}>
            <Text style={styles.subMenuText}>Submenu A</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Submenu B')}>
            <Text style={styles.subMenuText}>Submenu B</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Gestão de EPI's */}
      <TouchableOpacity style={styles.menuItem} onPress={() => toggleSubMenu('epi')}>
        <MaterialIcons name="security" size={24} color="#fff" />
        <Text style={styles.menuText}>Gestão de EPI's</Text>
        <MaterialIcons
          name={subMenus.epi ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      {subMenus.epi && (
        <View style={styles.subMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('EPI Submenu 1')}>
            <Text style={styles.subMenuText}>Submenu 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EPI Submenu 2')}>
            <Text style={styles.subMenuText}>Submenu 2</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Outros Itens */}
      {['Incêndio e Pânico', 'HO', 'Cultura SSO', 'Perícias e Demandas Judiciais', 'Contratadas', 'Tributação SSO'].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => toggleSubMenu(item.toLowerCase().replace(/ /g, '_'))}
        >
          <MaterialIcons name="category" size={24} color="#fff" />
          <Text style={styles.menuText}>{item}</Text>
          <MaterialIcons
            name={subMenus[item.toLowerCase().replace(/ /g, '_')] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Drawer Navigator
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
        <Drawer.Screen name="Início" component={HomeScreen} />
        {/* Outras telas podem ser adicionadas aqui */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0098c9',
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff44',
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
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
