import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Image,
} from 'react-native';
import {common} from '../../assets/styles/styles';
import {buttons} from '../../assets/styles/buttons';
import {AuthenticationContext} from '../contexts';
import {Formik} from 'formik';
import Snackbar from 'react-native-snackbar';
import {updateUser} from '../configs/firebase/collections/users.collections';
import {profileValidationSchema} from '../configs/validations';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Profile = props => {
  const {navigation} = props;
  const {user, setUser} = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = state => {
    setIsLoading(true);
    updateUser(user.uid, {
      firstName: state.firstName,
      lastName: state.lastName,
      phoneNumber: state.phoneNumber,
      address: state.address,
    })
      .then(() => {
        user.firstName = state.firstName;
        user.lastName = state.lastName;
        user.phoneNo = state.phoneNumber;
        user.address = state.address;
        user.email = state.email;
        setUser(user);
      })
      .finally(() => {
        Snackbar.show({
          text: 'Profile is Updated',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('HomeScreen');
        setIsLoading(false);
      });
  };

  return (
    <ScrollView>
      <View style={[common.container, styles.container]}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/user.png')}
          />
        </View>
        <Formik
          validationSchema={profileValidationSchema}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNo,
            address: user.address,
            email: user.email,
          }}
          onSubmit={values => onFormSubmit(values)}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <View style={common.customInput}>
                <Text style={common.customInputLable}>Email</Text>
                <TextInput
                  name="email"
                  style={common.mainInput}
                  placeholderTextColor="#94A3AD"
                  selectionColor="#00B761"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  editable={false}
                />
              </View>
              <View style={common.customInput}>
                <Text style={common.customInputLable}>First Name</Text>
                <TextInput
                  name="firstName"
                  style={common.mainInput}
                  placeholder="Enter First Name"
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
                <Text style={common.customInputLable}>Last Name</Text>
                <TextInput
                  name="lastName"
                  style={common.mainInput}
                  placeholder="Enter Last Name"
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

              {!isLoading ? (
                <TouchableHighlight
                  style={[buttons.button, styles.mrTop]}
                  onPress={handleSubmit}
                  underlayColor="#20AC6A">
                  <Text style={buttons.buttonText}>Update Profile</Text>
                </TouchableHighlight>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )}
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
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
    marginBottom: 10,
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
});

export default Profile;
