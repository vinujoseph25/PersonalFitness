/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import HistoryScreen from './src/screens/History/HistoryScreen';
import EditDetailScreen from './src/screens/EditDetail/EditDetailScreen';

import configureStore from './src/store/store';

const store = configureStore();

storeTracker = [];

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: createStackNavigator(
        {
          Dashboard: {
            screen: DashboardScreen,
            navigationOptions: ({navigation}) => ({
              title: 'Personal Fitness', // <=== remove this
            }),
          },
          EditDetail: {
            screen: EditDetailScreen,
            navigationOptions: ({navigation}) => ({
              title: navigation.getParam('headerTitle', 'Edit'), // <=== remove this
            }),
          },
        },
        {
          initialRouteName: 'Dashboard',
        },
      ),
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },
    History: {
      // screen: HistoryScreen,
      screen: createStackNavigator(
        {
          History: {
            screen: HistoryScreen,
            navigationOptions: ({navigation}) => ({
              title: 'Personal Fitness', // <=== remove this
            }),
          },
        },
        {
          initialRouteName: 'History',
        },
      ),
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-archive'} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    activeColor: '#010d10',
    inactiveColor: '#f0edf6',
    barStyle: {backgroundColor: '#14acd5'},
  },
);

const InitialNavigator = createSwitchNavigator({
  App: AppNavigator,
});

const AppContainer = createAppContainer(InitialNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
