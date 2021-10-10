import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {COLORS} from '../../../assets/styles/variableColors';
import {common} from '../../../assets/styles/styles';
import {buttons} from '../../../assets/styles/buttons';
import {cards} from '../../../assets/styles/cards';
import {
  assignFarmer,
  deletePlot,
} from '../../configs/firebase/collections/plots.collections';
import Snackbar from 'react-native-snackbar';
import {AuthenticationContext} from '../../contexts';

const PlotsCard = props => {
  const {navigation, plot, farmers} = props;
  const {isManager, setRefreshData} = useContext(AuthenticationContext);

  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [loading, setLoading] = useState();

  const [items, setItems] = useState([]);
  const [farmerValue, setFarmerValue] = useState(plot?.farmer ?? null);

  useEffect(() => {
    const list = [];
    farmers.forEach(farmer => {
      list.push({
        label: farmer.email,
        value: farmer.email,
      });
    });
    setItems(list);
  }, [farmers]);

  const onDeletePlot = () => {
    deletePlot(plot.id).then(() => {
      Snackbar.show({
        text: 'Plot is deleted',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  const onAssignFramer = () => {
    assignFarmer(plot.id, farmerValue).then(() => {
      Snackbar.show({
        text: 'A farmer is assigned to plot',
        duration: Snackbar.LENGTH_SHORT,
      });
      setOpen(!open);
      setRefreshData('A farmer is assigned to plot');
    });
  };

  return (
    <View style={[cards.propertyCardOutlineBestList, styles.cardListView]}>
      <View style={common.row}>
        <View style={styles.iconView}>
          <Ionicons name="md-apps" size={40} color={COLORS.primaryColor} />
        </View>
        <View style={styles.userView}>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Plot Size: </Text>
              <Text style={common.customInputLable}>{plot.plotSize}</Text>
            </View>
          </View>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Crop Type: </Text>
              <Text style={common.customInputLable}>{plot.cropType}</Text>
            </View>
          </View>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Crop Name: </Text>
              <Text style={common.customInputLable}>{plot.cropName}</Text>
            </View>
          </View>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Planted Date: </Text>
              <Text style={common.customInputLable}>{plot.plantedDate}</Text>
            </View>
          </View>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Harvest Date: </Text>
              <Text style={common.customInputLable}>{plot.harvestDate}</Text>
            </View>
          </View>
          <View style={styles.plotView}>
            <View style={common.row}>
              <Text style={common.customInputLabletwo}>Plot Address: </Text>
              <Text style={common.customInputLable}>{plot.plotAddress}</Text>
            </View>
          </View>
        </View>
      </View>
      {isManager() && <View style={common.hr} />}
      {open && (
        <View style={[common.customInput]}>
          <Text style={common.customInputLable}>Assign farmer for plot</Text>
          <View style={styles.mrBottom}>
            <DropDownPicker
              open={dropOpen}
              value={farmerValue}
              placeholder="Select farmer"
              items={items}
              setValue={setFarmerValue}
              setOpen={setDropOpen}
              style={styles.dropDownstyle}
              listMode="SCROLLVIEW"
            />
          </View>
          <View style={{width: '100%', felx: 1}}>
            {!loading ? (
              <TouchableHighlight
                style={[buttons.buttonSmall, styles.mrTop]}
                onPress={onAssignFramer}
                underlayColor="#20AC6A">
                <Text style={buttons.buttonText}>Assign Framer</Text>
              </TouchableHighlight>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </View>
        </View>
      )}

      <View style={common.rowSpread}>
        {isManager() && (
          <Ionicons
            name={open ? 'close-circle' : 'add-circle'}
            size={30}
            color={open ? 'red' : COLORS.primaryColor}
            onPress={() => setOpen(!open)}
          />
        )}
        <FontAwesome
          name="pencil-square-o"
          size={30}
          color={COLORS.primaryColor}
          onPress={() => navigation.navigate('EditPlotsScreen', {data: plot})}
        />
        {isManager() && (
          <Ionicons
            name="trash-outline"
            size={20}
            color="red"
            onPress={onDeletePlot}
          />
        )}
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
  dropDownstyle: {
    borderWidth: 0,
    elevation: 5,
    overflow: 'scroll',
    marginBottom: 20,
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
  plotView: {
    flex: 2,
    marginHorizontal: 2,
  },
  mrBottom: {
    marginBottom: 100,
    position: 'relative',
  },
  mrTop: {
    marginTop: 10,
  },
});
export default PlotsCard;
