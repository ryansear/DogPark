import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback,
    Image,
} from "react-native";

import React, {Component} from "react";
import * as firebase from "firebase";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Sae} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";
import Button from "apsl-react-native-button";

class Setup extends Component {
  constructor(props){
    super(props);

    this.state = {
        ownerName: "",
        dogName: "",
        response: "",
        latitude: 0,
        longitude: 0
    };

    this.setup = this.setup.bind(this);
  }

setup() {
  try{
let user1 = firebase.auth().currentUser;
  user1.updateProfile({
    displayName: this.state.ownerName
  });
  navigator.geolocation.getCurrentPosition((position) => {
      firebase.database().ref('user/' + user1.uid + '/').set({
        owner: this.state.ownerName,
        dog: this.state.dogName,
        location: {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude }
      });
  }, (error) => {
alert(error.message);
}, {enableHighAccuracy: true, timeout: 20000, distanceFilter: 10}
);

  setTimeout(() => {
      this.props.navigator.push({
          name: "Home"
      })
  }, 1500);
} catch (error){
  this.setState({
    response: error.toString
  })
}
}

  render() {
    return(
      <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
               <Image
               source={require('./grass.jpg')}
               style={styles.main}>

                   <View style={styles.formGroup}>
                       <Text style={styles.title}>Setup</Text>
                       <Sae
                           label={"Your Name"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"key"}
                           iconColor={"white"}
                           onChangeText={(ownerName) => this.setState({ownerName})}
                           autoCapitalize="none"
                       />
                       <Sae
                           label={"Dog's Name"}
                           labelStyle={{color: "#fff"}}
                           iconClass={FontAwesomeIcon}
                           iconName={"key"}
                           iconColor={"white"}
                           onChangeText={(dogName) => this.setState({dogName})}
                           autoCapitalize="none"
                       />

                       <View style={styles.submit}>
                           <Button onPress={this.setup} style={styles.buttons} textStyle={{fontSize: 18, color: "#000"}}>
                               Login
                           </Button>
                       </View>
                   </View>
                   <View>
                       <Text style={styles.response}>{this.state.response}</Text>
                   </View>
                   </Image>
           </TouchableWithoutFeedback>
       );
   }

}

const styles = StyleSheet.create({

   main: {
     flex: 1,
     width: null,
     height: null,
   },

    formGroup: {
        padding: 50,
    },

    buttons: {
      backgroundColor: "#fff",
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
    },

    submit: {
        paddingTop: 30,
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50,
    }
});

module.exports = Setup;
