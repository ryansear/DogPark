import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ListView
} from "react-native";

import * as firebase from "firebase";
import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Hideo} from "react-native-textinput-effects";
import DismissKeyboard from "dismissKeyboard";


class Home extends Component {

    constructor(props) {
        super(props);
this.itemsRef = firebase.database().ref();
let user1 = firebase.auth().currentUser;
let userID = user1.uid;
        this.state = {
            dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      user: userID
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

    listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          ownerName: child.val().owner,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

    async componentDidMount() {

        try {
          let user1 = firebase.auth().currentUser;
          this.setState({
            user: user1.email
          });
            // Get User Credentials

        } catch (error) {
            console.log(error);
        }

    }



    render() {

        return (
            <TouchableWithoutFeedback>
                <View>
                    <Text style={styles.heading}>Hello {this.state.user}</Text>
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
        textAlign: "center"
    },

    logout: {
        padding: 50
    },

    form: {
        paddingTop: 50
    }

});


module.exports = Home;
