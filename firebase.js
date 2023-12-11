const firebaseConfig = {
    apiKey: "AIzaSyDnowMuwB9M_ICP6zMfaa87ed1JMV0sgCw",
    authDomain: "infinitecanvas-fd2d5.firebaseapp.com",
    projectId: "infinitecanvas-fd2d5",
    storageBucket: "infinitecanvas-fd2d5.appspot.com",
    messagingSenderId: "416178716758",
    appId: "1:416178716758:web:62769d4f4d95a5b17f3bf7"
};
const app = firebase.initializeApp(firebaseConfig);

let pixels = [];
const pixelRef = firebase.database().ref('pixels')
let t = new Date;
pixelRef.on('child_added', snapshot =>{
    render.addPixel(snapshot.val())
})
pixelRef.on('child_changed', snapshot =>{
    render.updatePixel(snapshot.val())
})

firebase.auth().onAuthStateChanged((user) => {
    //console.log(user)
    if (user) {
        UID = user.uid;
    } else {
        //not logged in
    }
});
firebase.auth().signInAnonymously()
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('[FIREBASE ERROR]',errorCode,errorMessage)
});
function firebasePlaceRequest(x, y, c){
    pixelRef.child(`${x}x${y}`).update({x: x, y: y, color: c});
}