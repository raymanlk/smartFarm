import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);
