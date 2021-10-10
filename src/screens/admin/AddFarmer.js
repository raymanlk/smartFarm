import React, {useState, useContext} from 'react';

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {ROLE_FARMER} from '../../configs/constants';
import {common} from '../../../assets/styles/styles';
import {buttons} from '../../../assets/styles/buttons';
import {AuthenticationContext} from '../../contexts';
import Snackbar from 'react-native-snackbar';
import {Formik} from 'formik';
import {farmerValidationSchema} from '../../configs/validations';

const AddFarmerScreen = ({navigation}) => {
  const {onRegister, isLoading} = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);

  const [items] = useState([
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ]);

  const onFormSubmit = async state => {
    await onRegister(ROLE_FARMER, {
      ...state,
      gender: genderValue,
    });

    setTimeout(() => {
      Snackbar.show({
        text: 'New Farmer Added',
        duration: Snackbar.LENGTH_SHORT,
      });
      navigation.goBack();
    }, 1500);
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
            ADD FARMER
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={[common.container, styles.container]}>
          <Formik
            validationSchema={farmerValidationSchema}
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              dob: '',
              gender: '',
              address: '',
              email: '',
              password: '',
            }}
            onSubmit={values => onFormSubmit(values)}>
            {({handleChange, handleSubmit, values, touched, errors}) => (
              <>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>FirstName</Text>
                  <TextInput
                    name="firstName"
                    style={common.mainInput}
                    placeholder="Enter FirstName"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('firstName')}
                    value={values.firstName}
                  />
                  {errors?.firstName && touched.firstName && (
                    <Text style={styles.errorMsg}>{errors?.firstName}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>LastName</Text>
                  <TextInput
                    name="lastName"
                    style={common.mainInput}
                    placeholder="Enter LastName"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                  />
                  {errors?.lastName && touched.lastName && (
                    <Text style={styles.errorMsg}>{errors?.lastName}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Phone Number</Text>
                  <TextInput
                    name="phoneNumber"
                    style={common.mainInput}
                    dataDetectorTypes="phoneNumber"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  {errors?.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.errorMsg}>{errors?.phoneNumber}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>DOB</Text>
                  <DatePicker
                    style={common.mainInput}
                    date={values.dob}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    maxDate="2003-12-31"
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
                    onDateChange={handleChange('dob')}
                  />
                  {errors?.dob && touched.dob && (
                    <Text style={styles.errorMsg}>{errors?.dob}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Gender</Text>
                  <DropDownPicker
                    name="gender"
                    open={open}
                    value={genderValue}
                    items={items}
                    setValue={setGenderValue}
                    setOpen={setOpen}
                    style={styles.dropDownstyle}
                    listMode="SCROLLVIEW"
                  />
                  {!genderValue && touched.gender && (
                    <Text style={styles.errorMsg}>Gender is Required</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Address</Text>
                  <TextInput
                    name="address"
                    style={common.mainInputArea}
                    placeholder="Enter Address"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('address')}
                    value={values.address}
                  />
                  {errors?.address && touched.address && (
                    <Text style={styles.errorMsg}>{errors?.address}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Email</Text>
                  <TextInput
                    name="email"
                    style={common.mainInput}
                    placeholder="Enter Email"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {errors?.email && touched.email && (
                    <Text style={styles.errorMsg}>{errors?.email}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Password</Text>
                  <TextInput
                    name="password"
                    style={common.mainInput}
                    placeholder="Enter Password"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {errors?.password && touched.password && (
                    <Text style={styles.errorMsg}>{errors?.password}</Text>
                  )}
                </View>
                {!isLoading ? (
                  <TouchableHighlight
                    style={[buttons.button, styles.mrTop]}
                    onPress={handleSubmit}
                    underlayColor="#20AC6A">
                    <Text style={buttons.buttonText}>Create Farmer</Text>
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
export default AddFarmerScreen;
