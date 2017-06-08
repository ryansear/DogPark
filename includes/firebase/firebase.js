import * as firebase from "firebase";

class Firebase {
    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
          apiKey: "AIzaSyAsFIs0QQszg5a_H-WvbEh8Fa-IzycIeNY",
          authDomain: "dogpark-474ff.firebaseapp.com",
          databaseURL: "https://dogpark-474ff.firebaseio.com",
          projectId: "dogpark-474ff",
          storageBucket: "dogpark-474ff.appspot.com",
          messagingSenderId: "147904946050"
        });
    }

}

module.exports = Firebase;
