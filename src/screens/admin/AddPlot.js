import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import {ActivityIndicator, Colors} from 'react-native-paper';
import {buttons} from '../../../assets/styles/buttons';
import {common} from '../../../assets/styles/styles';
import {createPlot} from '../../configs/firebase/collections/plots.collections';
import {Formik} from 'formik';
import {plotValidationSchema} from '../../configs/validations';
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';

const AddPlotsScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = state => {
    setIsLoading(true);
    createPlot(state).then(() => {
      setIsLoading(false);
      Snackbar.show({
        text: 'New Plot Added',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
    setTimeout(() => navigation.goBack(), 500);
  };

  return (
    <View style={[common.flex1, styles.mrView]}>
      <View style={[common.row, styles.mrView]}>
        <View style={styles.iconView}>
          <FontAwesome
            name="chevron-circle-left"
            size={40}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.userView}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              textAlign: 'center',
            }}>
            ADD PLOT
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={[common.container, styles.container]}>
          <Formik
            validationSchema={plotValidationSchema}
            initialValues={{
              plotSize: '',
              cropType: '',
              cropName: '',
              plantedDate: '',
              harvestDate: '',
              plotAddress: '',
            }}
            onSubmit={values => onFormSubmit(values)}>
            {({handleChange, handleSubmit, values, touched, errors}) => (
              <>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Plot Size</Text>
                  <TextInput
                    name="plotSize"
                    style={common.mainInput}
                    placeholder="Enter Plot Size"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('plotSize')}
                    value={values.plotSize}
                  />
                  {errors?.plotSize && touched.plotSize && (
                    <Text style={styles.errorMsg}>{errors?.plotSize}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Crop Type</Text>
                  <TextInput
                    name="cropType"
                    style={common.mainInput}
                    placeholder="Enter CropType"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('cropType')}
                    value={values.cropType}
                  />
                  {errors?.cropType && touched.cropType && (
                    <Text style={styles.errorMsg}>{errors?.cropType}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Crop Name</Text>
                  <TextInput
                    name="cropName"
                    style={common.mainInput}
                    placeholder="Enter Crop Name"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('cropName')}
                    value={values.cropName}
                  />
                  {errors?.cropName && touched.cropName && (
                    <Text style={styles.errorMsg}>{errors?.cropName}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Planted Date</Text>
                  <DatePicker
                    style={common.mainInput}
                    date={values.plantedDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2025-12-31"
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
                    onDateChange={handleChange('plantedDate')}
                  />
                  {errors?.plantedDate && touched.plantedDate && (
                    <Text style={styles.errorMsg}>{errors?.plantedDate}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Harvest Date</Text>
                  <DatePicker
                    style={common.mainInput}
                    date={values.harvestDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2025-12-31"
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
                    onDateChange={handleChange('harvestDate')}
                  />
                  {errors?.harvestDate && touched.harvestDate && (
                    <Text style={styles.errorMsg}>{errors?.harvestDate}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Plot Address</Text>
                  <TextInput
                    name="plotAddress"
                    style={common.mainInputArea}
                    placeholder="Enter Plot Address"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('plotAddress')}
                    value={values.plotAddress}
                  />
                  {errors?.plotAddress && touched.plotAddress && (
                    <Text style={styles.errorMsg}>{errors?.plotAddress}</Text>
                  )}
                </View>
                {!isLoading ? (
                  <TouchableHighlight
                    style={[buttons.button, styles.mrTop]}
                    onPress={handleSubmit}
                    underlayColor="#20AC6A">
                    <Text style={buttons.buttonText}>Add Plot</Text>
                  </TouchableHighlight>
                ) : (
                  <ActivityIndicator animating={true} color={Colors.blue300} />
                )}
              </>
            )}
          </Formik>
        </View>
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
  mrView: {
    marginBottom: 15,
  },
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 30,
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
  },
  title: {
    marginVertical: 15,
    marginBottom: 40,
  },
  mrLeft: {
    marginLeft: 5,
  },
  mrRight: {
    marginRight: 5,
  },
  mrTop: {
    marginTop: 10,
  },
  devider: {
    marginVertical: 30,
    justifyContent: 'center',
  },
  hr: {
    borderBottomColor: '#525F67',
    borderBottomWidth: 1,
    opacity: 0.3,
    width: '10%',
  },
  or: {
    textAlign: 'center',
    color: '#3D5170',
    fontSize: 14,
    marginHorizontal: 10,
  },
  smallText: {
    fontSize: 12,
  },
  notAmember: {
    textAlign: 'center',
    color: '#707C97',
    fontSize: 18,
  },
  notAmemberReg: {
    textAlign: 'center',
    color: '#00B761',
    fontSize: 18,
    paddingLeft: 5,
  },
  errorMsg: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
  iconView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 10,
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

export default AddPlotsScreen;
