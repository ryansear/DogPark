import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    FlatList
} from "react-native";


import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Hideo} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
      user: "",
      latitude: 0,
      longitude: 0,
      data: ""
        };
        this.logout = this.logout.bind(this);
    }

    async logout() {

      try {

            await firebase.auth().signOut();

            this.props.navigator.push({
                name: "Login"
            })

        } catch (error) {
            console.log(error);
        }

    }


    async componentDidMount() {
        try {
          let user1 = firebase.auth().currentUser;
          this.setState({
            user: user1.displayName
          });

        } catch (error) {
            console.log(error);
        }
this.watchId = navigator.geolocation.watchPosition((position) => {
  let user2 = firebase.auth().currentUser;
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  })
  firebase.database().ref('user/' + user2.uid + '/location/').update({
      longitude: this.state.longitude,
      latitude: this.state.latitude
    });
},
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
    );
    let items = [];
    firebase.database().ref('user/').on('value', (snap) => {
      snap.forEach((child) => {
        items.push({
          name: child.val().owner,
          dog: child.val().dog,
          latitude: child.val().location.latitude,
          longitude: child.val().location.longitude
        })
      });
      this.setState({data: items});
    });
    }

    ComponentWillUnmount(){
      navigator.geolocation.clearWatch(this.watchId);
    }

    RenderSeparator(){
      return (
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "#000000",
        }}
      />
    );
    }

    render() {

        return (
            <TouchableWithoutFeedback>
                <View>
                    <Text style={styles.heading}>Hello {this.state.user}!</Text>
                    <Text style={styles.heading}>Users who are currently at Woodside:</Text>
                    <FlatList
                    data={this.state.data}
                    renderItem={({item}) => {
            if(item.longitude>-122.234400 && item.latitude>37.443000 && item.longitude<-122.228500 && item.latitude<37.448300){
      return <View><Text style={styles.names}>Owner: {item.name}</Text><Text style={styles.names}>Dog: {item.dog}</Text></View>
        };
        }
        }
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.RenderSeparator}
        />
        <View style={styles.logout}>
            <Button onPress={this.logout} textStyle={{fontSize: 18}}>
                Logout
            </Button>
        </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({

    heading: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    names: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'orange'
    },

    logout: {
        padding: 50,
        
    },

    form: {
        paddingTop: 50
    }

});


module.exports = Home;
