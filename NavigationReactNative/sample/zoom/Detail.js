import { NavigationContext } from 'navigation-react';
import { BarButton, NavigationBar, RightBar, SharedElement, TitleBar, LeftBar } from 'navigation-react-native';
import React, { useContext } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const Detail = ({colors, color, name, filter, search}) => {
  const {stateNavigator} = useContext(NavigationContext);
  return (
    <>
      <NavigationBar
        title="Color"
        barTintColor={Platform.OS === 'android' ? '#fff' : null}>
        <TitleBar style={styles.titleBar}>
          <Text style={styles.titleBarText}>Color</Text>
          <View style={{backgroundColor: color, width: 28, height: 28}}/>
        </TitleBar>
        <LeftBar>
          <BarButton title="cancel 1" show="always" onPress={() => {
            stateNavigator.navigateBack(1);
          }} />
          <BarButton title="cancel 2" show="always" onPress={() => {
            stateNavigator.navigateBack(1);
          }} />
        </LeftBar>
        <RightBar>
          <BarButton title="cancel 1" show="always" onPress={() => {
            stateNavigator.navigateBack(1);
          }} />
          <BarButton title="cancel 2" show="always" onPress={() => {
            stateNavigator.navigateBack(1);
          }} />
        </RightBar>
      </NavigationBar>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SharedElement name={name} style={styles.color} transition="overshoot">
          <View style={{backgroundColor: color, flex: 1}} />
        </SharedElement>
        <Text style={styles.text}>{color}</Text>
        <View style={styles.colors}>
          {[1,2,3].map(i => colors[(colors.indexOf(color) + i) % 15])
            .map(subcolor => {
              const suffix = search ? '_search' : '';
              const matched = !filter || subcolor.indexOf(filter.toLowerCase()) !== -1;
              const name = matched ? subcolor + suffix : null;
              return (
                <TouchableHighlight
                  key={subcolor}
                  style={[styles.subcolor, {backgroundColor: subcolor}]}
                  underlayColor={subcolor}
                  onPress={() => {
                    stateNavigator.navigate('detail', {color: subcolor, name, filter, search});
                  }}>
                    <View />
                </TouchableHighlight>
              )
            }
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleBarText: {
    marginRight: 4,
    fontSize: Platform.OS === 'ios' ? 16 : 20,
  },
  back: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
  },
  color: {
    height: 300,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  text:{
    fontSize: 80,
    color: '#000',
    textAlign:'center',
    fontWeight: 'bold',
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  subcolor: {
    width: 100,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 10,
  },
});
