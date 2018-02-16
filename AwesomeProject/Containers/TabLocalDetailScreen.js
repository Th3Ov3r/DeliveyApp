import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, BackHandler, FlatList, TouchableOpacity } from 'react-native'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view'
import { List, Card, Rating  } from "react-native-elements"
import Icon from 'react-native-vector-icons/Ionicons'
import ProgressCircleSnail from 'react-native-progress/CircleSnail';
import ConsumeServer from '../app/services/ConsumeServer'

export default class TabLocalDetailScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      horarios: [],
      establishments: {},
      products: [],
      error: null,
      refreshing: false,
      showProgress: true,
      progress: 0
    };
  }

  componentDidMount() {
    // console.log(this.props.navigation.state.params);
    this.getDataEstablishment();
    this.getDataProducts();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    // this.props.navigation.pop();
    return true; //CHANGE A FALSE IF WANT CLOSE APP
  };

  getDataEstablishment = () => {
    ConsumeServer.get('establishment/datos_personales/'+ this.props.navigation.state.params.item.id)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson); 
        if(responseJson.action === 'OK'){
          this.setState({
            establishments: responseJson.response.establishments,
            horarios: responseJson.response.horarios,
            showProgress: false,
            progress: 1
          });
        }else{
          ToastAndroid.show(responseJson.response, ToastAndroid.SHORT);
        }           
    })
    .catch((error) => {
      ToastAndroid.show(error.response, ToastAndroid.SHORT);
    });
  }

  getDataProducts = () => {
    ConsumeServer.get('products/establishment/'+ this.props.navigation.state.params.item.id)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson); 
        if(responseJson.action === 'OK'){
          this.setState({
            products: responseJson.response,
            showProgress: false,
            progress: 1
          });
        }else{
          ToastAndroid.show(responseJson.response, ToastAndroid.SHORT);
        }           
    })
    .catch((error) => {
      ToastAndroid.show(error.response, ToastAndroid.SHORT);
    });
  }

  showProductDetailScreen(producto)
  {
    this.props.navigation.navigate('productDetalScreen', producto);
  }

  render() {
    return (
      <ScrollableTabView
          style={ {justifyContent: 'center' } }
          tabBarPosition="top" 
          // tabBarUnderlineStyle={ { backgroundColor: 'rgba(231, 76, 60, 1)', height: 4, width: 4,
          //  marginBottom: 4, borderRadius: 2, flexDirection: 'column', justifyContent: 'center',
          //  alignItems: 'center', alignSelf: 'center' } } 
          tabBarUnderlineStyle={ { backgroundColor: 'orange'} } 
          tabBarBackgroundColor= "rgba(255, 255, 255, .92)"
          tabBarActiveTextColor="orange" 
          tabBarInactiveTextColor="rgba(145,145,145,0.64)" 
          tabBarTextStyle={{ fontWeight: '500' }} 
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar style={ {borderColor:'rgba(145,145,145,0.64)', borderWidth:1, backgroundColor: 'white'} } />}
        >
          <ScrollView tabLabel="LOCAL" style={styles.tabView}>
            <View style={styles.cardFirst}>
              <Icon name="logo-usd" style={ {backgroundColor : 'orange'} } size={60} color="white" />

              <Icon name="md-person" style={ {backgroundColor : 'orange'} } size={60} color="white" />

              <Icon name="md-star-outline" style={ {backgroundColor : 'orange'} } size={60} color="white" />
            </View>
            <View style={styles.cardSecond}>
              <Text style={ {color: 'orange', fontSize: 18} }>Resumen</Text>
              <View style={ styles.alignTextRight }>
                <Text style={ {paddingRight: 20} } >Dirección:</Text>
                <Text>{this.state.establishments.address}</Text> 
              </View>
              <View style={ styles.alignTextRight }>
                <Text style={ {paddingRight: 20} }>Ubicación:</Text>
                <Text style={ {color: 'orange'} }>Ver mapa</Text> 
              </View>
              <View style={ styles.alignTextRight }>
                <Text style={ {paddingRight: 20} } >Teléfono:</Text>
                <Text>{this.state.establishments.telephone}</Text> 
              </View>
              <View style={ styles.alignTextRight }>
                <Text style={ {paddingRight: 20} } >Email:</Text>
                <Text>{this.state.establishments.email}</Text> 
              </View>
            </View>
            <ProgressCircleSnail style={ {alignItems: 'center'} } size={40} animating={this.state.showProgress} color={['orange']}
                 hidesWhenStopped={true} indeterminate={this.state.showProgress} progress={this.state.progress} />
            <View style={styles.cardThird}>
              <Text style={ {color: 'orange', fontSize: 18} }>Horario</Text>
                  <FlatList
                    data={this.state.horarios}
                    renderItem={ ({ item }) => 
                      <Text style={ {marginTop: 10} } >Día: {item.day} Desde: {item.since} Hasta: {item.until}</Text>
                    }
                    keyExtractor={item => item.id}
                  />
            </View>
          </ScrollView>
          <ScrollView tabLabel="PLATOS" style={styles.tabView}>
            <View style={ {flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 9} }>
            <Text  style={ {color: 'black', fontSize: 20, fontWeight: 'bold'} }>Platos Principales</Text>            
              <List style={ {marginTop: 10} }>
                <FlatList
                    data = {this.state.products}            
                    renderItem = { ({item}) =>  
                    <TouchableOpacity key={item.id} onPress={ () => this.showProductDetailScreen({item}) }>                     
                      <Card containerStyle={ {borderRadius: 5, margin:0} }>
                          <Image
                            source={ {uri: item.image } }
                            style={ {width: 360, height: 190, borderRadius: 5} }
                          />
                          <Text style={ {color: 'orange', fontSize: 20} }>{item.product}</Text>
                          <Text style={ {fontSize: 16} }>S/. {item.price}</Text>
                          <Rating
                            // showRating
                            type="star"
                            // fractions={1}
                            startingValue={3}
                            readonly
                            imageSize={15}
                            // style={{ paddingVertical: 10 }}
                          />
                      </Card>
                    </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                  />                
              </List> 
            </View>
          </ScrollView>
          <ScrollView tabLabel="OFERTAS" style={styles.tabView}>
            <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
              <Text style={ {fontSize: 18} }>No hay ofertas para este establecimiento</Text>
            </View>
          </ScrollView>
      </ScrollableTabView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  circles: {
    flexDirection: 'column',//row
    alignItems: 'center',
    marginTop: 50
  },
  tabView: {
    flex: 0.5,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.01)'
  },
  cardFirst: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop:5,
    height: 100,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardSecond: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop:5,
    height: 200,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardThird: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop:5,
    height: 300,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  alignTextRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  }
})
