import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import DatePicker from 'react-native-datepicker';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';

const config = {
  xAxisLabelStyle: {
    position: 'left',
  },
  yAxisLabelStyle: {
    rotation: -60,
    fontSize: 10,
  },
  startAtZero: true,
  xAxisLabelCount: 1,
  hasXAxisBackgroundLines: true,
  hasYAxisBackgroundLines: true,
};

const ChartView = ({
  MONTHS,
  values,
  showChart,
  fromDate,
  toDate,
  incidents,
  isManager,
  isFilter,
  onChangeFromDate,
  onChangetomDate,
}) => {
  return (
    <View>
      {isFilter && (
        <View style={[common.rowSpread, styles.cardListView]}>
          <View style={common.customInputSmalll}>
            <Text style={common.customInputLable}>From</Text>
            <DatePicker
              style={common.mainInput}
              date={fromDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2021-01-01"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={value => onChangeFromDate(value)}
            />
          </View>
          <View style={common.customInputSmalll}>
            <Text style={common.customInputLable}>TO</Text>
            <DatePicker
              style={common.mainInput}
              date={toDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2021-01-01"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={value => onChangetomDate(value)}
            />
          </View>
        </View>
      )}
      {!showChart && (
        <View style={styles.chartContainer}>
          <Text style={styles.errorMsg}>Data not available</Text>
        </View>
      )}
      {showChart && isManager() && incidents.length > 0 && (
        <View style={styles.chartContainer}>
          <VerticalBarGraph
            data={values}
            labels={MONTHS}
            width={Dimensions.get('window').width - 20}
            height={200}
            barRadius={2}
            barWidthPercentage={0.45}
            barColor="#53ae31"
            baseConfig={config}
            style={styles.chart}
          />
        </View>
      )}
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
  chartContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    width: '95%',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  chart: {
    marginBottom: 2,
    width: '100%',
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChartView;
