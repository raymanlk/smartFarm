import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {common} from '../../../assets/styles/styles';
import {buttons} from '../../../assets/styles/buttons';
import Snackbar from 'react-native-snackbar';
import {updateIncident} from '../../configs/firebase/collections/incidents.collections';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Formik} from 'formik';
import {incidentValidationSchema} from '../../configs/validations';
import {AuthenticationContext} from '../../contexts';

const EditIncidentScreen = ({navigation, route}) => {
  const {isManager, isFarmer} = useContext(AuthenticationContext);

  const [uploading, setUploading] = useState(false);
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const [downloadURL, setDownloadURL] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [categoryValue, setCategoryValue] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [statusValue, setStatusValue] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  const [categories] = useState([
    {
      label: 'Pest',
      value: 'Pest',
    },
    {
      label: 'Fertilizer',
      value: 'Fertilizer',
    },
  ]);

  const [statuses] = useState([
    {
      label: 'Active',
      value: 'Active',
    },
    {
      label: 'Completed',
      value: 'Completed',
    },
  ]);

  useEffect(() => {
    setStatusValue(route.params.data.status);
    setCategoryValue(route.params.data.category);
    setDownloadURL(route.params.data.imageUrl);
  }, []);

  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onMediaSelect);

  const onMediaSelect = async media => {
    if (!media.didCancel) {
      setUploading(true);
      const reference = storage().ref(media.assets[0].fileName);
      const task = reference.putFile(media.assets[0].uri);
      task.on('state_changed', taskSnapshot => {
        setUploadTaskSnapshot(taskSnapshot);
      });
      task.then(async () => {
        const url = await reference.getDownloadURL();
        setDownloadURL(url);
        setUploading(false);
        setUploadTaskSnapshot({});
      });
    }
  };

  const onFormSubmit = state => {
    if (isManager() && statusValue == 'Pending') {
      return;
    }

    setIsLoading(true);

    updateIncident(route.params.data.id, {
      ...state,
      category: categoryValue,
      imageUrl: downloadURL,
      status: isFarmer() ? 'Pending' : statusValue,
    }).then(() => {
      setIsLoading(false);
      Snackbar.show({
        text: 'Incident is Updated',
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
            EDIT INCIDENT
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={[common.container, styles.container]}>
          <Formik
            validationSchema={incidentValidationSchema}
            initialValues={{
              affectedArea: route.params.data.affectedArea,
              description: route.params.data.description,
              category: route.params.data.category,
              date: route.params.data.date,
              imageUrl: route.params.data.imageUrl,
              status: '',
            }}
            onSubmit={values => onFormSubmit(values)}>
            {({handleChange, handleSubmit, values, touched, errors}) => (
              <>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Category</Text>
                  <DropDownPicker
                    name="category"
                    open={openCategory}
                    value={categoryValue}
                    items={categories}
                    setOpen={setOpenCategory}
                    setValue={setCategoryValue}
                    style={styles.dropDownstyle}
                    disabled={isManager()}
                    listMode="SCROLLVIEW"
                  />
                  {errors?.category && touched.category && (
                    <Text style={styles.errorMsg}>Category is Required</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Affected Area</Text>
                  <TextInput
                    name="affectedArea"
                    style={common.mainInput}
                    placeholder="Enter Affected Area"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('affectedArea')}
                    value={values.affectedArea}
                    editable={isFarmer()}
                  />
                  {errors?.affectedArea && touched.affectedArea && (
                    <Text style={styles.errorMsg}>{errors?.affectedArea}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Description</Text>
                  <TextInput
                    name="description"
                    style={common.mainInputArea}
                    placeholder="Enter Description"
                    placeholderTextColor="#94A3AD"
                    selectionColor="#00B761"
                    onChangeText={handleChange('description')}
                    value={values.description}
                    editable={isFarmer()}
                  />
                  {errors?.description && touched.description && (
                    <Text style={styles.errorMsg}>{errors?.description}</Text>
                  )}
                </View>
                <View style={common.customInput}>
                  <Text style={common.customInputLable}>Date</Text>
                  <DatePicker
                    style={common.mainInput}
                    date={values.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2021-01-01"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    disabled={isManager()}
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
                    onDateChange={handleChange('date')}
                  />
                  {errors?.date && touched.date && (
                    <Text style={styles.errorMsg}>{errors?.date}</Text>
                  )}
                </View>
                {isManager() && (
                  <View style={common.customInput}>
                    <Text style={common.customInputLable}>Status</Text>
                    <DropDownPicker
                      name="status"
                      open={openStatus}
                      value={statusValue}
                      items={statuses}
                      setOpen={setOpenStatus}
                      setValue={setStatusValue}
                      style={styles.dropDownstyle}
                      listMode="SCROLLVIEW"
                    />
                    {statusValue == 'Pending' && touched.status && (
                      <Text style={styles.errorMsg}>* Status is Required</Text>
                    )}
                  </View>
                )}
                {uploading && (
                  <View style={styles.uploading}>
                    <Text style={styles.statusText}>Uploading</Text>
                    <Text style={styles.statusText}>
                      {`${(
                        (uploadTaskSnapshot.bytesTransferred /
                          uploadTaskSnapshot.totalBytes) *
                        100
                      ).toFixed(2)}% / 100%`}
                    </Text>
                  </View>
                )}
                {isFarmer() && downloadURL && (
                  <View style={common.rowSpread}>
                    <Image
                      style={{width: '50%', height: '100%', marginRight: 5}}
                      source={{
                        uri: downloadURL,
                      }}
                    />
                    <TouchableHighlight
                      style={[buttons.button, styles.mrTop]}
                      onPress={onSelectImagePress}
                      underlayColor="#20AC6A">
                      <Text style={buttons.buttonText}>Reupload a Photo</Text>
                    </TouchableHighlight>
                  </View>
                )}

                {isFarmer() && !isLoading ? (
                  <TouchableHighlight
                    style={[buttons.button, styles.mrTop]}
                    onPress={handleSubmit}
                    underlayColor="#20AC6A">
                    <Text style={buttons.buttonText}>Update Incident</Text>
                  </TouchableHighlight>
                ) : (
                  !isManager() && (
                    <ActivityIndicator
                      animating={true}
                      color={Colors.blue300}
                    />
                  )
                )}

                {isManager() &&
                  (!isLoading ? (
                    downloadURL && (
                      <View style={common.rowSpread}>
                        <Image
                          style={{width: '50%', height: '100%', marginRight: 5}}
                          source={{
                            uri: downloadURL,
                          }}
                        />
                        <TouchableHighlight
                          style={[buttons.button, styles.mrTop]}
                          onPress={handleSubmit}
                          underlayColor="#20AC6A">
                          <Text style={buttons.buttonText}>
                            Update Incident
                          </Text>
                        </TouchableHighlight>
                      </View>
                    )
                  ) : (
                    <ActivityIndicator
                      animating={true}
                      color={Colors.blue300}
                    />
                  ))}
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
  pdView: {
    marginBottom: 100,
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
export default EditIncidentScreen;
