import React, {useContext} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';

import {COLORS} from '../../assets/styles/variableColors';
import {ROLE_FARMER} from '../configs/constants';
import {AuthenticationContext} from '../contexts';
import FarmarRoute from './tabScreens/FarmarRoute';
import IncidentScreen from './tabScreens/IncidentRoute';
import PlotsScreen from './tabScreens/PlotsRoute';

const Home = ({navigation}) => {
  const {isManager} = useContext(AuthenticationContext);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    isManager()
      ? [
          {key: 'Farmar', title: 'FARMER', navigation: navigation},
          {key: 'Plots', title: 'PLOTS', navigation: navigation},
          {key: 'Incident', title: 'INCIDENT', navigation: navigation},
        ]
      : [
          {key: 'Plots', title: 'PLOTS', navigation: navigation},
          {key: 'Incident', title: 'INCIDENT', navigation: navigation},
        ],
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: COLORS.white}}
      style={{backgroundColor: COLORS.primaryColor}}
      labelStyle={{fontSize: 12, fontWeight: '900', width: '100%'}}
      tabStyle={{flex: 1}}
      scrollEnabled
    />
  );

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'Farmar':
        return <FarmarRoute jumpTo={jumpTo} navigation={route.navigation} />;
      case 'Plots':
        return <PlotsScreen jumpTo={jumpTo} navigation={route.navigation} />;
      case 'Incident':
        return <IncidentScreen jumpTo={jumpTo} navigation={route.navigation} />;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: '100%'}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
    />
  );
};
export default Home;
