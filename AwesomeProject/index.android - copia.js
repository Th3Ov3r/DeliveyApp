import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text,View,FlatList,ToastAndroid,TouchableHighlight,TouchableOpacity,
         ToolbarAndroid } from 'react-native';
import { List, ListItem, Card, CardItem } from "react-native-elements";
// import { StackNavigator } from 'react-navigation';
// import HomeScreen  from './app/components/HomeComponent/HomeScreen';

export default class AwesomeProject extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount = () => { //Al hacer esto ignoras el return, o eso creo 
    fetch('http://192.168.1.2:8090/serverEvaluation/public/index.php/categories', {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);      
       this.setState({
          data: responseJson.response
       });
    })
    .catch((error) => {
       console.error(error);
    });
 };

 onPressButtonCategory(category)
 {
    console.log(category);
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
      // return(
      //   <ToolbarAndroid title="AwesomeApp" />
      // );
      return (
        <List>
          <FlatList
              data = {this.state.data}            
              renderItem = { ({item}) =>
                    <TouchableOpacity onPress={ ({item})  => this.onPressButtonCategory(item) }> 
                      <Card containerStyle={{ backgroundColor: 'orange', margin: 4,marginBottom: 4,
                                              height: 50,width: 120, borderRadius: 40,
                                              alignItems: 'center'}}>
                          <Text style={ {color: 'white'} }>{item.category}</Text>
                      </Card>
                    </TouchableOpacity>
                  }
              horizontal = {true}
            />                
        </List>      
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


// const App = StackNavigator({
//   Home: { screen: HomeScreen }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
