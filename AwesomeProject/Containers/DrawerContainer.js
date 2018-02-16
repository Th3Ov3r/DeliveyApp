import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from "react-native-elements";
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  // constructor(props){
  //   super(props);

  //   this.state = {
  //     color: 'black'
  //   };

  // }

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  elementActive(screen){
    if(this.props.activeItemKey === screen){
      // this.setState({
      //   color: 'white'
      // });
      return {fontSize: 16,
              color: 'black',
              borderColor: '#faf7a7',
              borderWidth: 1,
              shadowColor: '#f9d804',
              backgroundColor: '#faf7a7',
              // opacity: 100,
              padding: 10,
              margin: 4
              }; 
    }else{
      // this.setState({
      //   color: 'black'
      // });

      return {fontSize: 16,
              color: 'black',
              padding: 10,
              margin: 4}; 
    }
  };

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.containerAvatar}><Text><Icon name="md-contact" size={80} color="black" /></Text></View>
        <View style={styles.containerMenu}>
          <Text
            onPress={() => navigation.navigate('home')}
            style={this.elementActive('home')}>
              <Icon name="md-home" size={25} color="black" />   Inicio
          </Text>
          <Text
            onPress={() => navigation.navigate('screen1')}
            style={this.elementActive('screen1')}>
              <Icon name="md-cart" size={25} color="black" />   CheckOut
          </Text>
          <Text
            onPress={() => navigation.navigate('screen2')}
            style={this.elementActive('screen2')}>
            <Icon name="md-time" size={25} color="black" />   En espera
          </Text>
          <Text
            onPress={() => navigation.navigate('screen3')}
            style={this.elementActive('screen3')}>
            <Icon name="md-checkmark-circle" size={25} color="black" />   Aceptadas
          </Text>
          <Text
            onPress={() => navigation.navigate('cancelScreen')}
            style={this.elementActive('cancelScreen')}>
            <Icon name="md-close-circle" size={25} color="black" />   Canceladas
          </Text>
          <Divider style={{ backgroundColor: 'black' }} />
          <Text
            onPress={() => navigation.navigate('screen3')}
            style={styles.uglyDrawerItem}>
            <Icon name="md-share" size={25} color="black" />   Share
          </Text>
          <Text
            onPress={() => navigation.navigate('cancelScreen')}
            style={styles.uglyDrawerItem}>
            <Icon name="md-send" size={25} color="black" />   Send
          </Text>
        </View>
      </View>
    )
  } //END Render

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  containerAvatar: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  containerMenu: {
    flex: 0.75,
    backgroundColor: '#f6f6f6',
    paddingTop: 10,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    margin: 4,
  }
})
