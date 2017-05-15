import * as firebase from "firebase";

class Database{
  static setLocation(location){
    let userLocation = "/user/" + userLocation;
    return firebase.database().ref(userLocation).set({
      location: location
    })
  }
  static setOwnerName(ownerName){
    let owner = "/user/" + owner;
    return firebase.database().ref(owner).set({
      owner: ownerName
    })
  }
  static setDogName(dogName){
    let dog = "/user/" + dName;
    return firebase.database().ref(dog).set({
      dog: dogName
    })
  }
}
module.exports = Database;
