import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {NavigationContext} from 'navigation-react';
import {NavigationBar} from 'navigation-react-native';

const nextDirection = {
  north: 'east',
  east: 'south',
  south: 'west',
  west: 'north',
};

export default ({direction, color}) => (
  <NavigationContext.Consumer>
    {({stateNavigator: {stateContext: {crumbs}}, stateNavigator}) => (
      <>
        <NavigationBar
          hidden={Platform.OS === 'android'}
          title={direction[0].toUpperCase() + direction.slice(1)} />
        <View style={[
          styles.scene,
          {backgroundColor: color}
        ]}>
          <TouchableHighlight
            underlayColor={color}
            onPress={() => {
              stateNavigator.navigate(nextDirection[direction]);
          }}>
            <Text style={styles.text}>{direction} {crumbs.length}</Text>
          </TouchableHighlight>
          {stateNavigator.canNavigateBack(1) && <TouchableHighlight
            underlayColor={color}
            onPress={() => {
              stateNavigator.navigateBack(1);
          }}>
            <Text style={styles.text}>back</Text>
          </TouchableHighlight>}
        </View>
      </>
    )}
  </NavigationContext.Consumer>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
});
