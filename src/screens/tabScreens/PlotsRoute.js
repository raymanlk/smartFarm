import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';

import PlotsCard from '../../components/plots/PlotsCard';
import {AuthenticationContext} from '../../contexts';

const PlotsScreen = ({navigation}) => {
  const {farmers, plots, isManager} = useContext(AuthenticationContext);

  return (
    <View style={common.flex1}>
      <View style={[common.rowSpread, styles.cardListView]}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '800',
              color: COLORS.primaryColor,
            }}>
            {plots?.length ?? 0} Plots
          </Text>
        </View>
        <View>
          {isManager() && (
            <Ionicons
              name="md-add-circle-sharp"
              size={28}
              color={COLORS.primaryColor}
              onPress={() => navigation.navigate('AddPlotsScreen')}
            />
          )}
        </View>
      </View>
      {plots.length == 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.dataEmptyMsg}>Data not available</Text>
        </View>
      )}
      <FlatList
        style={{flex: 1}}
        data={plots}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PlotsCard navigation={navigation} plot={item} farmers={farmers} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardListView: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  dataEmptyMsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  chartContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    width: '95%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default PlotsScreen;
