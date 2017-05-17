import * as firebase from "firebase";

class Database{
  static setUser(userId){
    return firebase.database().ref('/users/').set({
      user: userId
    })
  }
  static setLocation(userId, location){
    return firebase.database().ref('/users/' + userId + '/').set({
      location: location
    })
  }
  static setOwnerName(userId, ownerName){
    return firebase.database().ref('/users/' + userId + '/').set({
      owner: ownerName
    })
  }
  static setDogName(userId, dogName){
    let dog = "/user/" + dName;
    return firebase.database().ref('/users/' + userId + '/').set({
      dog: dogName
    })
  }
}
module.exports = Database;
