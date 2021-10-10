import firestore from '@react-native-firebase/firestore';

const incidentsCollection = firestore().collection('incidents');

export const getIncidentsRef = () => incidentsCollection;

export const createIncident = data => incidentsCollection.add({...data});

export const deleteIncident = id => incidentsCollection.doc(id).delete();

export const updateIncident = (id, data) =>
  incidentsCollection.doc(id).update({...data});
