import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {common} from '../../assets/styles/styles';
import {buttons} from '../../assets/styles/buttons';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {AuthenticationContext} from '../contexts';
import Snackbar from 'react-native-snackbar';
import {Formik} from 'formik';
import {loginValidationSchema} from '../configs/validations';

const Login = () => {
  const {onLogin, error, isLoading} = useContext(AuthenticationContext);

  useEffect(() => {
    if (error) {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [error]);

  return (
    <ScrollView>
      <View style={[common.container, styles.container]}>
        <View style={styles.logoContainer}>
          {/* <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          /> */}
        </View>

        <Text style={[common.titleSection, common.center, styles.title]}>
          It’s a pleasure to have you here lets get you started soon{' '}
        </Text>

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => onLogin(values.email, values.password)}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <View style={common.customInput}>
                <Text style={common.customInputLable}>Email</Text>
                <TextInput
                  name="email"
                  style={common.mainInput}
                  placeholder="Enter Email Address"
                  placeholderTextColor="#94A3AD"
                  selectionColor="#00B761"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
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
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors?.password && touched.password && (
                  <Text style={styles.errorMsg}>{errors?.password}</Text>
                )}
              </View>

              {/* <TouchableHighlight style={[buttons.noBackgroundBtn]}>
                <Text style={[buttons.noBackgroundBtnText, common.right]}>
                  Forgot password ?
                </Text>
              </TouchableHighlight> */}
              {!isLoading ? (
                <TouchableHighlight
                  style={[buttons.button, styles.mrTop]}
                  underlayColor="#20AC6A"
                  onPress={handleSubmit}>
                  <Text style={buttons.buttonText}>Login</Text>
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
});

export default Login;
