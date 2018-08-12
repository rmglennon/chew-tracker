var config = {
    apiKey: "AIzaSyAz1tug48F42pTBzhe479jzyJEGIWORkf8",
    authDomain: "stupid-chew.firebaseapp.com",
    databaseURL: "https://stupid-chew.firebaseio.com/",
    storageBucket: ""
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function(snapshot) {
   // console.log('EVENT: value')
    console.log(snapshot.val())
    var myData = snapshot.val();
    
    var myTimes = []
    for (var key in myData) {
        if (myData.hasOwnProperty(key)) {
         //   console.log(key + " -> " + myData[key]);
            for (var key2 in myData[key]) {
              //  console.log(myData[key][key2])
                myTimes.push(myData[key][key2])
            }
        }
    }
    console.log(myTimes);
    //const dates = snapshot.val().data[i][0];

    const dates = myTimes.map(i => new Date(i));

    console.log(dates);
    var trace1 = {
        x: myTimes,
        type: 'scatter'
      };
      
      var data = [trace1];
      
      Plotly.newPlot("graph", data);
});
