import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, BackHandler, Button, TouchableOpacity } from 'react-native'
import { List, ListItem, Card, CardItem, Avatar } from "react-native-elements"
import ProgressCircleSnail from 'react-native-progress/CircleSnail';
import ConsumeServer from '../app/services/ConsumeServer'

export default class EstablishmentScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      data: [],
      dataEstablishmentsPopu: [],
      error: null,
      refreshing: false,
      showProgress: true,
      progress: 0
    };
  }

  static navigationOptions = {
    drawerLabel: 'Establecimiento',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }

  componentDidMount()
  { 
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getEstablishmentsForCategories();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('drawerStack');
    // this.props.navigation.popToTop();
    return true; //CHANGE A FALSE IF WANT CLOSE APP
  };
  
  showScreenTabsLocal(establishment)
  {
    console.log(establishment);
    this.props.navigation.navigate('tabLocalDetailScreen', establishment);
    // this.props.navigation.push('tabLocalDetailScreen', establishment);
  }

  getEstablishmentsForCategories = () =>
  {
    ConsumeServer.get('establishments/category/'+ this.props.navigation.state.params.item.id)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);      
        this.setState({
          data: responseJson.response,
          showProgress: false,
          progress: 1
        });
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.circles}>
        <ProgressCircleSnail size={40} animating={this.state.showProgress} color={['orange']}
        hidesWhenStopped={true} indeterminate={this.state.showProgress} progress={this.state.progress} />
      </View>
      <List containerStyle={ {borderTopWidth: 0, paddingTop:0, marginTop:0, marginBottom: 20} }>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              contentInset={{bottom:49}}
              automaticallyAdjustContentInsets={false}
              // roundAvatar
              title={ <Text style={styles.titleList}>  {item.establishment}</Text>}
              subtitle={item.category}
              avatar={ <Avatar
                rounded
                medium
                source={{uri: item.image}}
              /> }
              // avatar={{ uri: item.image}}
              containerStyle={{ borderBottomWidth: 0 }}
              // rightIcon={<Button
              //   title="ABIERTO"
              //   color="orange"
              //   accessibilityLabel="Establecimiento abierto"
              //   onPress={ () => this.showScreenTabsLocal({item})}
              // /> }
              rightIcon={
              <TouchableOpacity
                  style={styles.button}
                  onPress={ () => this.showScreenTabsLocal({item})}>
                <Text style={ {color: 'white', textAlign: 'center'} }>ABIERTO </Text>
              </TouchableOpacity> }
              onPress={ () => this.showScreenTabsLocal({item})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </List>
      </View>
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
  titleList:{
    fontSize: 15, 
    fontWeight: 'bold'
  },
  button:{
    width: 80,
    height: 40,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  subtitleList: {
    fontSize: 15, 
    fontWeight: 'bold'
  }
})
