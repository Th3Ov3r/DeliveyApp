import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, Button } from 'react-native'
import { Card, CardItem, FormLabel, FormInput } from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'
import ConsumeServer from '../app/services/ConsumeServer'

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = { 
      email: 'josuearies13@hotmail.com',
      password: 'secret'
   };
  }

  signIn()
  {
    ConsumeServer.post('autenticacion', this.state)
    .then((response) => response.json())
    .then(
      (res) => {
        console.log(res);      
        if(res.respuesta){
            //Guardar sesión en sqlite
            this.props.navigation.navigate('drawerStack')
        }else{
          ToastAndroid.show(res.mensaje, ToastAndroid.LONG);
          this.props.navigation.navigate('drawerStack')
        }
      },
      (err) => {
        ToastAndroid.show(err.response, ToastAndroid.SHORT);
      } 
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        
        <Image
          // source={{uri: 'asset:/fondo1.jpg' }}
          source={require('../assets/images/fondo1.jpg')}
          style={{width: 200, height: 250, borderRadius: 15}}
        />
        
        <Card>
          <FormLabel>Emáil</FormLabel>
          <TextInput
              style={{height: 50, width: 300}}
              onChangeText={(email) => this.setState({email})}
              keyboardType={'email-address'} 
              value={this.state.email}
            />
          <FormLabel>Contraseña</FormLabel>
          <TextInput
              style={{height: 50, width: 300}}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
              value={this.state.password}
            />
          <Button
            large
            color='orange'
            // icon={{name: 'envira', type: 'font-awesome'}}
            title='Entrar'
            onPress={() => this.signIn()} />

        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linky: {
    fontWeight: 'bold',
    color: '#4C3E54',
    paddingTop: 10
  },
  buttonStyle: {
    backgroundColor: 'orange',
    color: 'black'
  }

})
