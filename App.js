import * as React from 'react';
import 'react-native-gesture-handler';
import AppNavigation from './Components/AppNavigation.js/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>

  );
}
export default App;