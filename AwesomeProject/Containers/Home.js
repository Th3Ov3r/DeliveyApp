import React, { Component } from 'react'
import { AppRegistry,StyleSheet,Text,View,FlatList,ToastAndroid,TouchableHighlight,TouchableOpacity,
         ToolbarAndroid, Image } from 'react-native'
import { List, ListItem, Card, CardItem } from "react-native-elements"
import { NavigationActions } from 'react-navigation'
import ProgressCircleSnail from 'react-native-progress/CircleSnail';
import ConsumeServer from '../app/services/ConsumeServer'

export default class Home extends Component {
  
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

componentDidMount()
{ 
  this.getCategories();
  this.getEstablishmentsPopular();
}

getCategories = () =>
{
  ConsumeServer.get('categories')
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
};

getEstablishmentsPopular = () =>
{
 ConsumeServer.get('products/popular')
 .then((response) => response.json())
 .then((responseJson) => {
    console.log(responseJson);      
    this.setState({
      dataEstablishmentsPopu: responseJson.response,
      showProgress: false,
      progress: 1
    });
 })
 .catch((error) => {
    console.error(error);
 });
};

onPressButtonCategory(category)
{
  console.log(category);
  this.props.navigation.navigate('secundaryStack', category);
}

showScreenTabsLocal(establishment)
{
  console.log(establishment);
  this.props.navigation.navigate('secundaryStack', establishment, 
  { routeName: 'tabLocalDetailScreen', params: establishment });
  // const actionToDispatch = NavigationActions.reset({
  //   index: 0,
  //   key: null,  // black magic
  //   actions: [NavigationActions.navigate(
  //     { routeName: 'secundaryStack', params: establishment })]
  // })
  // this.props.navigation.dispatch(actionToDispatch)
}

//  renderCards(stories) {
//   return (
//     <Card>
//       <CardItem>
//         <Left style={{flex:0.8}}>
//           <Icon name="ios-book" />
//           <Body>
//             <Text style={{fontWeight:'bold',fontSize:17}}>{stories.title}</Text>
//             <Text note style={{fontSize:15}}>{stories.topicName}</Text>
//           </Body>
//         </Left>
//         <Right style={{flex:0.2}}>
//           <Icon name="ios-heart"/>
//         </Right>
//       </CardItem>
//       <CardItem cardBody>
//         <ProgressiveImage source={{ uri: stories.imageurl }} thumbnail={require("../../images/placeholder.png")} style={{ width: viewportWidth, height: 170 }} thumbnailresizeMode={"cover"} thumbnailkey={"pimg"} />
//       </CardItem>
//       <CardItem content>
//         <Text>{stories.story}</Text>
//       </CardItem>
//     </Card>
//   )
// }


render() { 
      return (
        <View style={styles.container}>
          <View style={styles.listCategories}>
            <List containerStyle={ {borderTopWidth: 0, paddingTop:0, marginTop:0, marginBottom: 10,
              justifyContent: 'center', alignItems: 'center'} }>
              <FlatList
                  data = {this.state.data}            
                  renderItem = { ({item}) =>
                        <TouchableOpacity onPress={ () => this.onPressButtonCategory({item}) }> 
                          <Card containerStyle={{ backgroundColor: 'orange', marginBottom: 5,
                                                  height: 40,width: 110, borderRadius: 40,
                                                  justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={ {textAlign:'center',color: 'white', fontWeight: 'bold'} }>{item.category}</Text>
                          </Card>
                        </TouchableOpacity>
                      }
                  horizontal = {true}
                  keyExtractor={item => item.id}
                />                
            </List>    
          </View>

          <View style={styles.listEstablishmentspopular}>
          <Card containerStyle={{margin:0,padding:0, height:340, justifyContent: 'center'}}>
              <Text style={ {color: 'black', fontSize: 18, textAlign: 'center', textAlignVertical: 'top'} }>Restaurantes populares</Text>  
              <ProgressCircleSnail style={ {alignItems: 'center'} } size={40} animating={this.state.showProgress} color={['orange']}
                 hidesWhenStopped={true} indeterminate={this.state.showProgress} progress={this.state.progress} />

              <List containerStyle={ {margin:0, marginTop: 10,  borderTopWidth: 0} }>
                <FlatList
                    data = {this.state.dataEstablishmentsPopu}            
                    renderItem = { ({item}) =>               
                      <TouchableOpacity onPress={ () => this.showScreenTabsLocal({item}) }>         
                        <Card containerStyle={ {width: 280, height: 280, borderRadius: 5, margin:2} }>
                            <Image
                              source={{uri: item.image_product }}
                              style={{width: 270, height: 180, borderRadius: 5}}
                            />
                            <ListItem
                              contentInset={{bottom:49}}
                              automaticallyAdjustContentInsets={false}
                              roundAvatar
                              title={`${item.establishment}`}
                              subtitle={item.product}
                              avatar={{ uri: item.image_establishment }}
                              containerStyle={{ borderBottomWidth: 0 }}
                            />
                        </Card>
                      </TouchableOpacity>
                    }
                    horizontal = {true}
                    keyExtractor={item => item.id}
                  />                
              </List> 
            </Card>   
          </View>
        </View>  
      );
    }
    // render() {
      
    //       return (
    //         <List>
    //           <FlatList
    //               data = {this.state.data}            
    //               renderItem = { ({item}) => 
    //                       <Card containerStyle={{ backgroundColor: 'orange', marginBottom: 15,
    //                                               height: 50,width: 120, borderRadius: 40, marginRight:3 }}>
    //                           <ListItem containerStyle={{ borderBottomWidth: 0, marginBottom: 10 }} title={item.category} /> 
    //                       </Card>
    //                       }
    //               horizontal = {true}
    //             />                
    //         </List>
    //       );
    //     }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  circles: {
    flexDirection: 'column',//row
    alignItems: 'center',
    marginTop: 50
  },
  listCategories: {
    flex: 0.36,
  },
  listEstablishmentspopular: {
    flex: 2.5,
  }
});
