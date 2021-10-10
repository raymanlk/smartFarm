import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';

import FamersCard from '../../components/farmers/FamersCard';
import {AuthenticationContext} from '../../contexts';

const FarmarScreen = ({navigation}) => {
  const {farmers, plots, setRefreshData} = useContext(AuthenticationContext);

  useEffect(() => {
    farmers.forEach(farmer => {
      farmer.plots = plots.filter(plot => plot.farmer == farmer.email);
    });
    setRefreshData('Update Farmer Details');
  }, [farmers]);

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
            {farmers?.length ?? 0} Farmers{' '}
          </Text>
        </View>
        <View>
          <Ionicons
            name="md-add-circle-sharp"
            size={28}
            color={COLORS.primaryColor}
            onPress={() => navigation.navigate('AddFarmerScreen')}
          />
        </View>
      </View>
      {farmers.length == 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.dataEmptyMsg}>Data not available</Text>
        </View>
      )}
      <FlatList
        style={{flex: 1}}
        data={farmers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FamersCard navigation={navigation} farmer={item} />
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

export default FarmarScreen;
