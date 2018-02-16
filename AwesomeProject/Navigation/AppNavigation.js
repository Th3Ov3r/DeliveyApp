import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
// import Icon from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'
import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'
import Home from '../Containers/Home'
import Screen1 from '../Containers/Screen1'
import Screen2 from '../Containers/Screen2'
import Screen3 from '../Containers/Screen3'
import CancelScreen from '../Containers/CancelScreen'
import DrawerContainer from '../Containers/DrawerContainer'
import EstablishmentScreen from '../Containers/EstablishmentScreen'
import TabLocalDetailScreen from '../Containers/TabLocalDetailScreen'
import ProductDetalScreen from '../Containers/ProductDetalScreen'

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  home: {screen: Home},
  screen1: { screen: Screen1 },
  screen2: { screen: Screen2 },
  screen3: { screen: Screen3 },
  cancelScreen: { screen: CancelScreen },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer //Agrega un componente personalizado
})

const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'black'}}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>  <Icon name="md-menu" size={25} /></Text>

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#f8f8f8'},//4C3E54
    title: 'Delivery',
    headerTintColor: 'black',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation)
  })
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
  signupScreen: { screen: SignupScreen },
  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, 
  navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#f8f8f8'},//E73536
    title: 'Iniciar',
    headerTintColor: 'black'
  }
})

//PILA DE NAVEGACIÓN SECUNDARIA
const SecundaryStack = StackNavigator({
  establishmentScreen: { screen: EstablishmentScreen, navigationOptions: { title: 'Establecimiento',  headerMode: 'float' } },
  tabLocalDetailScreen: { screen: TabLocalDetailScreen, navigationOptions: { header: null } },
  productDetalScreen: { screen: ProductDetalScreen, navigationOptions: { title: 'Producto',  headerMode: 'float' } }
})

//Pila de navegación principal
// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
  secundaryStack: { screen: SecundaryStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack', //pila inicial
  transitionConfig: noTransitionConfig
})

export default PrimaryNav
