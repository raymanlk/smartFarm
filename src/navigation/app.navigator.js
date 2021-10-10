import * as React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {COLORS} from '../../assets/styles/variableColors';

import {HomeScreenNavigator} from './home.navigator';
import Profile from '../screens/Profile';
import Chart from '../screens/Chart';
import {DrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

const AppNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          title: 'Smartfarm', //Set Header Title
          headerStyle: {
            backgroundColor: COLORS.primaryColor, //Set Header color
          },
          headerTintColor: COLORS.white, //Set Header text color: ;
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
        name="Home"
        component={HomeScreenNavigator}
      />
      <Drawer.Screen
        options={{
          title: 'Profile', //Set Header Title
          headerStyle: {
            backgroundColor: COLORS.primaryColor, //Set Header color
          },
          headerTintColor: COLORS.white, //Set Header text color: ;
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
