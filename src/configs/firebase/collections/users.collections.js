import firestore from '@react-native-firebase/firestore';
import {ROLE_FARMER} from '../../constants';

const usersCollection = firestore().collection('users');

export const getFarmers = () =>
  usersCollection.where('role', '==', ROLE_FARMER);

export const getUser = id => usersCollection.doc(id).get();

export const createUser = (uid, data) =>
  usersCollection.doc(uid).set({...data});

export const updateUser = (uid, data) => usersCollection.doc(uid).update({...data});

export const deleteUser = id => usersCollection.doc(id).delete();
