import React, {useState} from 'react';
import {AuthenticationContextProvider} from './src/contexts';
import {Navigation} from './src/navigation';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

const App = () => {
  const [isInternetAvailable, setIsInternetAvailable] = useState(false);

  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        console.log('Connection State: ', connectionState);
        setIsInternetAvailable(connectionState.isConnected);
      }}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </InternetConnectionAlert>
  );
};

export default App;
