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

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';
import {AuthenticationContext} from '../../contexts';
import IncidentsCard from '../../components/incidents/IncidentsCard';

import ChartView from '../../components/incidents/ChartView';

const INIT_VALUES = new Array(12).fill(10);

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const IncidentScreen = ({navigation}) => {
  const {incidents, isFarmer, isManager} = useContext(AuthenticationContext);

  const [isFilter, setIsFilter] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [values, setValues] = useState(INIT_VALUES);
  const [showChart, setShowChart] = useState(true);
  const [filterIncidents, setFilterIncidents] = useState([...incidents]);

  const getMonthsCount = monthsList => {
    const monthsCount = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    monthsList?.forEach(function (i) {
      monthsCount[i] = monthsCount[i] + 1;
    });

    return monthsCount;
  };

  useEffect(() => {
    setFilterIncidents(incidents);
    if (toDate != null && fromDate != null) {
      dateFilter();
    } else {
      defaultFilter();
    }
  }, [toDate, fromDate, incidents]);

  const defaultFilter = () => {
    setShowChart(false);
    const monthsList = [];
    incidents?.forEach(incident => {
      const date = new Date(incident.date);
      monthsList.push(MONTHS[date.getMonth()]);
    });
    const monthsCount = getMonthsCount(monthsList);
    const newValues = [];
    MONTHS.forEach(mon => {
      Object.keys(monthsCount).forEach(key => {
        if (key == mon) {
          newValues.push(monthsCount[key]);
        }
      });
    });
    if (newValues.every(item => item === 0)) {
      setValues(INIT_VALUES);
    } else {
      setShowChart(true);
      setValues(newValues);
    }
  };

  const dateFilter = () => {
    setShowChart(false);
    const monthsList = [];
    incidents?.forEach(incident => {
      const date = new Date(incident.date);
      if (toDate != null && fromDate != null) {
        if (new Date(fromDate) <= date && new Date(toDate) >= date) {
          monthsList.push(MONTHS[date.getMonth()]);
          setFilterIncidents(
            filterIncidents?.filter(i => i.date == incident.date),
          );
        }
      }
    });
    const monthsCount = getMonthsCount(monthsList);
    const newValues = [];
    MONTHS.forEach(mon => {
      Object.keys(monthsCount).forEach(key => {
        if (key == mon) {
          newValues.push(monthsCount[key]);
        }
      });
    });
    if (newValues.every(item => item === 0)) {
      setValues(INIT_VALUES);
    } else {
      setShowChart(true);
      setValues(newValues);
    }
  };

  const openFilter = () => {
    setIsFilter(!isFilter);
    setToDate(null);
    setFromDate(null);
    setFilterIncidents(incidents);
  };

  const onChangeFromDate = value => {
    setFromDate(value);
  };

  const onChangetomDate = value => {
    setToDate(value);
  };

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
            {incidents?.length ?? 0} Incidents{' '}
          </Text>
        </View>

        <View>
          {isFarmer() && (
            <Ionicons
              name="md-add-circle-sharp"
              size={28}
              color={COLORS.primaryColor}
              onPress={() => navigation.navigate('AddIncidentScreen')}
            />
          )}
        </View>
        {isManager() && (
          <View>
            <Ionicons
              name="filter-sharp"
              size={28}
              color={COLORS.primaryColor}
              onPress={() => openFilter()}
            />
          </View>
        )}
      </View>
      <ScrollView>
        <ChartView
          MONTHS={MONTHS}
          values={values}
          showChart={showChart}
          fromDate={fromDate}
          toDate={toDate}
          incidents={incidents}
          isManager={isManager}
          onChangeFromDate={onChangeFromDate}
          onChangetomDate={onChangetomDate}
          isFilter={isFilter}
        />
        {showChart && (
          <FlatList
            style={{flex: 1}}
            data={filterIncidents}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <IncidentsCard navigation={navigation} incident={item} />
            )}
          />
        )}
      </ScrollView>
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

export default IncidentScreen;
