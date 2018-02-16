import React from 'react'
import { AppRegistry, StyleSheet, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import createStore from './Redux'

// We're going to use navigation with redux
import ReduxNavigation from './Navigation/ReduxNavigation'

// create our store
const store = createStore()


export default class AwesomeProject extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);