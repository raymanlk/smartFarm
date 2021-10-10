import firestore from '@react-native-firebase/firestore';

const plotsCollection = firestore().collection('plots');

export const getPlotsRef = () => plotsCollection;

export const createPlot = data => plotsCollection.add({...data});

export const updatePlot = (id, data) =>
  plotsCollection.doc(id).update({...data});

export const deletePlot = id => plotsCollection.doc(id).delete();

export const assignFarmer = (plotId, email) =>
  plotsCollection.doc(plotId).update({
    farmer: email,
  });
