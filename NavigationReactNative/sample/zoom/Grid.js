import React from 'react';
import {StyleSheet, Platform, ScrollView, View, TouchableHighlight} from 'react-native';
import {NavigationContext} from 'navigation-react';
import {SharedElementAndroid, NavigationBar, SearchBarIOS} from 'navigation-react-native';

const Colors = ({colors, children}) => (
  <NavigationContext.Consumer>
    {({stateNavigator}) => (
      <View style={styles.colors}>
        {colors.map(color => (
          <TouchableHighlight
            key={color}
            style={styles.color}
            underlayColor={color}                
            onPress={() => {
              stateNavigator.navigate('detail', {color});
            }}>
            <SharedElementAndroid name={color} style={{flex: 1}}>
              <View style={{backgroundColor: color, flex: 1}} />
            </SharedElementAndroid>
          </TouchableHighlight>
        ))}
        {children}
      </View>
    )}
  </NavigationContext.Consumer>
);

const Container = (props) => (
  Platform.OS === 'ios' ? <ScrollView {...props}/> : <>{props.children}</>
);

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {colors} = this.props;
    const {text} = this.state;
    const matchedColors = colors.filter(color => (
      color.indexOf(text.toLowerCase()) !== -1
    ));
    return (
      <Container
        style={styles.scene}
        contentInsetAdjustmentBehavior="automatic">
        <NavigationBar largeTitle={true} title="Colors">
          <SearchBarIOS
            text={text}
            autoCapitalize="none"
            obscureBackground={false}
            onChangeText={text => this.setState({text})}>
            <ScrollView
              style={styles.scene}
              contentInsetAdjustmentBehavior="automatic">
              <Colors colors={matchedColors} />
            </ScrollView>
          </SearchBarIOS>
        </NavigationBar>
        <Colors colors={colors} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#fff',
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