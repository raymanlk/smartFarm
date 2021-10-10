import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';
import {cards} from '../../../assets/styles/cards';
import {AuthenticationContext} from '../../contexts';
import {deleteIncident} from '../../configs/firebase/collections/incidents.collections';

const IncidentsCard = props => {
  const {navigation, incident} = props;
  const {isManager, isFarmer} = useContext(AuthenticationContext);

  const onDeleteIncident = () => {
    deleteIncident(incident.id).then(() => {
      Snackbar.show({
        text: 'Incident is deleted',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };
  return (
    <View style={[cards.propertyCardOutlineBestList, styles.cardListView]}>
      <View style={common.row}>
        <View style={styles.iconView}>
          <FontAwesome name="bug" size={40} color={COLORS.primaryColor} />
        </View>
        <View style={styles.userView}>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Category: </Text>
            <Text style={common.customInputLable}>{incident?.category}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Affected Area: </Text>
            <Text style={common.customInputLable}>
              {incident?.affectedArea}
            </Text>
          </View>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Status: </Text>
            <Text style={common.customInputLable}>{incident?.status}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Date: </Text>
            <Text style={common.customInputLable}>{incident?.date}</Text>
          </View>
        </View>
        <View style={styles.iconView}>
          {isFarmer() && incident.status == 'Pending' && (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={COLORS.primaryColor}
              onPress={() =>
                navigation.navigate('EditIncidentScreen', {data: incident})
              }
            />
          )}

          {isManager() && (
            <FontAwesome
              name="pencil-square-o"
              size={30}
              color={COLORS.primaryColor}
              onPress={() =>
                navigation.navigate('EditIncidentScreen', {data: incident})
              }
            />
          )}

          {isFarmer() && incident.status == 'Pending' && (
            <Ionicons
              name="trash-outline"
              size={20}
              color="red"
              onPress={onDeleteIncident}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardListView: {
    flex: 1,
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  iconView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5,
    flex: 1,
    paddingVertical: 10,
  },
  userView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    flex: 4,
    flexDirection: 'column',
    paddingVertical: 5,
  },
});
export default IncidentsCard;
