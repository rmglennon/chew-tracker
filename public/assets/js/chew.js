var config = {
    apiKey: "AIzaSyAz1tug48F42pTBzhe479jzyJEGIWORkf8",
    authDomain: "stupid-chew.firebaseapp.com",
    databaseURL: "https://stupid-chew.firebaseio.com/",
    storageBucket: ""
};
firebase.initializeApp(config);

var database = firebase.database();

// let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
// let xl = []
// let yl = []

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
    // const dates = snapshot.val().map(i => i[0]);
    // // const vals = snapshot.val().data[0][1];
    // const vals = snapshot.val().map(i => i[1]);

    // xl.push(singleDate);
    // yl.push(singleVal);
    // console.log(snapshot.val().data[0][1]);

    // let trace = {
    //     x: dates,
    //     y: vals,
    // }

    // Plotly.plot(document.getElementById("graph"), [trace]);
    // Plotly.newPlot("div#graph", trace);
        // let data = figure.data
        // for (var i = 0; i < data.length; i++) {
        //     xl.push(data[i][0])
        //     yl.push(data[i][1])
        // }

        // Plotly.plot(document.getElementById("graph"), [trace]);
    // });
});
