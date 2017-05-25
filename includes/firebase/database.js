class Database {
  static setUser (user1, ownerName, dogName){
    firebaseApp.database().ref("user/").set({
        user1: {
          owner: ownerName,
          dog: dogName
        }
    });
  }
}
