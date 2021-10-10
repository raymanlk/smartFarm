import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import AddFarmerScreen from '../screens/admin/AddFarmer';
import AddPlotsScreen from '../screens/admin/AddPlot';
import AddIncidentScreen from '../screens/admin/AddIncident';
import EditPlotsScreen from '../screens/admin/EditPlot';
import EditIncidentScreen from '../screens/admin/EditIncident';

const Home = createStackNavigator();

export const HomeScreenNavigator = () => (
  <Home.Navigator headerMode="none">
    <Home.Screen name="HomeScreen" component={HomeScreen} />
    <Home.Screen name="AddFarmerScreen" component={AddFarmerScreen} />
    <Home.Screen name="AddPlotsScreen" component={AddPlotsScreen} />
    <Home.Screen name="AddIncidentScreen" component={AddIncidentScreen} />
    <Home.Screen name="EditPlotsScreen" component={EditPlotsScreen} />
    <Home.Screen name="EditIncidentScreen" component={EditIncidentScreen} />
  </Home.Navigator>
);
