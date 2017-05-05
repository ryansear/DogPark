import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ListView
} from "react-native";

import Button from "apsl-react-native-button";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Hideo} from "react-native-textinput-effects";
import Database from "../firebase/database";
import DismissKeyboard from "dismissKeyboard";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      teamNum: teamNum,
      feedbackForm:feedbackForm,
      feedback:feedback
        };

        this.logout = this.logout.bind(this);
        this.saveFeedback = this.saveFeedback.bind(this);

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

            // Get User Credentials
            let user = await firebase.auth().currentUser;

            // Listen for Mobile Changes
            Database.listenFeedback(user.uid, (feedback) => {
                this.setState({
                    feedback: feedback,
                    feedbackForm: feedbackForm
                });
            });

            this.setState({
                uid: user.uid
            });

        } catch (error) {
            console.log(error);
        }

    }

    saveFeedback() {

        // Set Mobile
        if (this.state.uid && this.state.feedbackForm) {
            Database.setFeedback(this.state.uid, this.state.feedbackForm);
            DismissKeyboard();
        }

    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
                <View>
                    <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
                    <Text style={styles.heading}>Team Feedback (From Database): {this.state.feedback}</Text>
                    <View style={styles.form}>
                        <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderTeamNum.bind(this)}
                        enableEmptySections={true}
                        />
                        <Button onPress={this.saveFeedback} textStyle={{fontSize: 18}}>
                            Save
                        </Button>
                    </View>
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
