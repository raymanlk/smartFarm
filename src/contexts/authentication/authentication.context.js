import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {
  getUser,
  createUser,
  getFarmers,
} from '../../configs/firebase/collections/users.collections';
import {getPlotsRef} from '../../configs/firebase/collections/plots.collections';
import {ROLE_FARMER, ROLE_MANGER} from '../../configs/constants';
import {getIncidentsRef} from '../../configs/firebase/collections/incidents.collections';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(null);
  const [error, setError] = useState(null);

  const [farmers, setFarmers] = useState([]);
  const [plots, setPlots] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const isManager = () => user?.role == ROLE_MANGER;
  const isFarmer = () => user?.role == ROLE_FARMER;

  const onLogin = (email, password) => {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        getUser(data.user.uid).then(ref => {
          const userData = ref.data();
          data.user.role = userData.role;
          data.user.firstName = userData.firstName;
          data.user.lastName = userData.lastName;
          data.user.email = userData.email;
          data.user.phoneNo = userData.phoneNumber;
          data.user.address = userData.address;
          setUser(data.user);
          setIsLoading(false);
        });
      })
      .catch(err => {
        setIsLoading(false);
        setError('Invalid email address or password!');
        setTimeout(() => setError(null), 1500);
      });
  };

  const onRegister = (role, userData) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        createUser(data.user.uid, {
          ...userData,
          role: role,
        });
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        if (err.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
        setTimeout(() => setError(null), 1500);
      });
  };

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
  };

  useEffect(() => {
    if (user) {
      getPlotsRef().onSnapshot(querySnapshot =>
        setPlots(filterData(querySnapshot)),
      );
    }
  }, [user, refreshData]);

  useEffect(() => {
    if (user && isManager()) {
      getFarmers().onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const farmer = doc.data();
          farmer.id = doc.id;
          list.push(farmer);
        });
        setFarmers(list);
      });
    }
  }, [user, refreshData]);

  useEffect(() => {
    if (user) {
      getIncidentsRef().onSnapshot(querySnapshot =>
        setIncidents(filterData(querySnapshot)),
      );
    }
  }, [user, refreshData]);

  const filterData = querySnapshot => {
    const list = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      if (isManager()) {
        list.push(data);
      }

      if (isFarmer() && data.farmer == user.email) {
        list.push(data);
      }
    });

    return list;
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        farmers,
        plots,
        incidents,
        isManager,
        isFarmer,
        setRefreshData,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
