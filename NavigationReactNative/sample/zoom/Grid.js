import React from 'react';
import {Platform, StyleSheet, ScrollView, View, TouchableHighlight} from 'react-native';
import {NavigationContext} from 'navigation-react';
import {SharedElement, NavigationBar, SearchBar, RightBar, BarButton} from 'navigation-react-native';

const Colors = ({colors, children, filter}) => {
  const suffix = filter != null ? '_search' : '';
  const matchedColors = colors.filter(color => (
    !filter || color.indexOf(filter.toLowerCase()) !== -1
  ));
  return (
    <NavigationContext.Consumer>
      {({stateNavigator}) => (
        <ScrollView
          style={styles.scene}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.colors}>
            {matchedColors.map(color => (
              <TouchableHighlight
                key={color}
                style={styles.color}
                underlayColor={color}                
                onPress={() => {
                  stateNavigator.navigate('detail', {
                    color, name: color + suffix, filter, search: filter != null
                  });
                }}>
                <SharedElement name={color + suffix} style={{flex: 1}}>
                  <View style={{backgroundColor: color, flex: 1}} />
                </SharedElement>
              </TouchableHighlight>
            ))}
            {children}
          </View>
        </ScrollView>
      )}
    </NavigationContext.Consumer>
  );
}

const Container = (props) => (
  Platform.OS === 'ios' ? <ScrollView {...props}/> : <View {...props} />
);

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {colors} = this.props;
    const {text} = this.state;
    return (
      <Container
        style={styles.scene}
        collapsable={false}
        contentInsetAdjustmentBehavior="automatic">
        <NavigationBar
          largeTitle={true}
          title="Colors"
          barTintColor="#f00"
          tintColor="#fff"
          titleColor="#fff">
          <SearchBar
            text={text}
            autoCapitalize="none"
            obscureBackground={false}
            onChangeText={text => this.setState({text})}>
            <Colors colors={colors} filter={text} />
          </SearchBar>
          <RightBar>
            <BarButton title="search" show="always" search={true} />
          </RightBar>
        </NavigationBar>
        <Colors colors={colors} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#fff',
    flex: 1,
  },
  colors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  color: {
    width: 100,
    height: 150,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
});