/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Routes from './app/utils/Routes';
import BottomTabBar from './app/component/BottomTabBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// -------- Import Screen -----------
import HomeScreen from './app/screens/home/HomeScreen';
import CategoryScreen from './app/screens/category/Category';
import AccountScreen from './app/screens/account/AccountScreen';
import LoginScreen from './app/screens/login/LoginScreen';
import RegisterScreen from './app/screens/login/RegisterScreen';
import MailScreen from './app/screens/mail/MailScreen';
import TestScreen from './app/screens/test/TestScreen';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import axios from 'axios';
import {API_KEY} from './app/utils/Consts';
import AppConfig from './app/utils/AppConfig';
import ProductDetailScreen from './app/screens/product/ProductDetailScreen';
import ProductListScreen from './app/screens/product/ProductListScreen';
import CartScreen from './app/screens/cart/CartScreen';
import Toast from 'react-native-toast-message';
import PaymentScreen from './app/screens/payment/PaymentScreen';
import HomeScreen2 from './app/screens/home/HomeScreen2';

axios.interceptors.request.use(
  async function (config) {
    config.headers.XApiKey = API_KEY;
    config.headers.post['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${AppConfig.ACCESS_TOKEN}`;
    // console.log(config);
    return config;
  },
  function (error) {
    if (typeof window !== 'undefined') {
      console.log('interceptors: ', error);
    }
    return Promise.reject(error);
  },
);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName={Routes.HOME}>
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      <Tab.Screen name={Routes.CATEGORY} component={CategoryScreen} />
      <Tab.Screen name={'test'} component={TestScreen} />
      <Tab.Screen name={Routes.MAIL} component={MailScreen} />
      <Tab.Screen name={Routes.ACCOUNT} component={AccountScreen} />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
      }}
      initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
    </Stack.Navigator>
  );
}
function MainScreen() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <Toast />
    </View>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
