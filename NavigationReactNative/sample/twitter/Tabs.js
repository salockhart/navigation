import {StateNavigator} from 'navigation';
import {NavigationContext, NavigationHandler} from 'navigation-react';
import {
  NavigationBar,
  NavigationStack,
  TabBar,
  TabBarItem,
} from 'navigation-react-native';
import React, {useContext, useMemo, useState} from 'react';
import {Platform} from 'react-native';
import Home from './Home';
import Notifications from './Notifications';

const useStateNavigator = (start) => {
  const {stateNavigator} = useContext(NavigationContext);
  return useMemo(() => {
    const navigator = new StateNavigator(stateNavigator);
    navigator.navigate(start);
    return navigator;
  }, []);
};

export default ({tweets, notifications}) => {
  const [notified, setNotified] = useState(false);
  const homeNavigator = useStateNavigator('home');
  const notificationsNavigator = useStateNavigator('notifications');
  return (
    <>
      <NavigationBar hidden={true} />
      <TabBar
        primary={true}
        selectedTintColor={Platform.OS === 'android' ? '#1da1f2' : null}>
        <TabBarItem title="Home" image={require('./home.png')} testID="homeTab">
          {Platform.OS === 'ios' ? (
            <NavigationHandler stateNavigator={homeNavigator}>
              <NavigationStack />
            </NavigationHandler>
          ) : (
            <Home tweets={tweets} />
          )}
        </TabBarItem>
        <TabBarItem
          title="Notifications"
          image={require('./notifications.png')}
          badge={!notified ? notifications.length : null}
          onPress={() => {
            setNotified(true);
          }}
          testID="notificationsTab">
          {Platform.OS === 'ios' ? (
            <NavigationHandler stateNavigator={notificationsNavigator}>
              <NavigationStack />
            </NavigationHandler>
          ) : (
            <Notifications notifications={notifications} />
          )}
        </TabBarItem>
      </TabBar>
    </>
  );
};
