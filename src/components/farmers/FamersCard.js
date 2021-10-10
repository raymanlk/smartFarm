import React, {useState} from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';
import {cards} from '../../../assets/styles/cards';
import {deleteUser} from '../../configs/firebase/collections/users.collections';

const FamersCard = props => {
  const {navigation, farmer} = props;
  const [open, setOpen] = useState(false);

  // const onDeleteFarmer = () => {
  //   deleteUser(farmer.id).then(() => {
  //     Snackbar.show({
  //       text: 'Farmer is deleted',
  //       duration: Snackbar.LENGTH_SHORT,
  //     });
  //   });
  // };

  return (
    <View style={[cards.propertyCardOutlineBestList, styles.cardListView]}>
      <View style={common.row}>
        <View style={styles.iconView}>
          <FontAwesome
            name="user-circle-o"
            size={40}
            color={COLORS.primaryColor}
          />
        </View>
        <View style={styles.userView}>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Name: </Text>
            <Text style={common.customInputLable}>
              {farmer?.firstName} {farmer?.lastName}
            </Text>
          </View>
          <View style={common.row}>
            <Text style={common.customInputLabletwo}>Address: </Text>
            <Text style={common.customInputLable}>{farmer?.address}</Text>
          </View>
          {open && (
            <View>
              <View style={common.row}>
                <Text style={common.customInputLabletwo}>Phone Number: </Text>
                <Text style={common.customInputLable}>
                  {farmer?.phoneNumber}
                </Text>
              </View>
              <View style={common.row}>
                <Text style={common.customInputLabletwo}>Gender: </Text>
                <Text style={common.customInputLable}>{farmer?.gender}</Text>
              </View>
              <View style={common.row}>
                <Text style={common.customInputLabletwo}>Email: </Text>
                <Text style={common.customInputLable}>{farmer?.email}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={common.hr} />
      {!open && (
        <View style={common.rowSpread}>
          <Ionicons
            name="call-sharp"
            size={20}
            color={COLORS.primaryColor}
            onPress={() => Linking.openURL(`tel:${farmer?.phoneNumber}`)}
          />
          <View>
            <Text style={{fontWeight: '800', fontSize: 14}}>
              {farmer?.plots?.length ?? 0} Plots
            </Text>
          </View>
          {/* <Ionicons
            name="trash-outline"
            size={20}
            color="red"
            onPress={onDeleteFarmer}
          /> */}
          <Ionicons
            name="chevron-down"
            size={20}
            color={COLORS.primaryColor}
            onPress={() => setOpen(!open)}
          />
        </View>
      )}
      {open && (
        <View>
          {farmer?.plots?.map(plot => {
            return (
              <View style={common.row}>
                <View style={styles.iconView}>
                  <Ionicons
                    name="md-apps"
                    size={24}
                    color={COLORS.primaryColor}
                  />
                </View>
                <View style={styles.userView}>
                  <Text style={common.customInputLabletwo}>Crop Variety</Text>
                  <Text style={common.customInputLable}>{plot.cropName}</Text>
                </View>
              </View>
            );
          })}

          <View style={common.hr} />
          <View style={common.rowSpread}>
            <Ionicons name="call-sharp" size={20} color={COLORS.primaryColor} />
            <View>
              <Text sstyle={common.customInputLabletwo}>
                {farmer?.plots?.length ?? 0} Plots
              </Text>
            </View>

            <Ionicons
              name="chevron-up"
              size={20}
              color={COLORS.primaryColor}
              onPress={() => setOpen(!open)}
            />
          </View>
        </View>
      )}
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
export default FamersCard;
