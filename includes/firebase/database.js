import * as firebase from "firebase";

class Database{
  static setFeedback(teamNum, feedback){
    let teamFeedback = "/user/" + teamNum + "/details";
    return firebase.database().ref(teamFeedback).set({
      feedback: feedback
    })
  }

  static listenFeedback(teamNum, callback){
    let teamFeedback = "/user/" + teamNum + "/details";

    firebase.database().ref(teamFeedback).on('value', (snapshot) => {
      var feedback = "";

      if (snapshot.val()) {
        feedback = snapshot.val().feedback;
      }

      callback(feedback)
    });
  }
}
module.exports = Database;
