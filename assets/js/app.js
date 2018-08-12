var config = {
    apiKey: "AIzaSyAz1tug48F42pTBzhe479jzyJEGIWORkf8",
    authDomain: "stupid-chew.firebaseapp.com",
    databaseURL: "https://stupid-chew.firebaseio.com/",
    storageBucket: ""
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function (snapshot) {

    var myData = snapshot.val();

    var myTimes = []
    for (var key in myData) {
        if (myData.hasOwnProperty(key)) {
            for (var key2 in myData[key]) {
                myTimes.push(myData[key][key2])
            }
        }
    }

    const dates = myTimes.map(i => new Date(i));

    $('#animated-pacman').addClass('animated');
    setTimeout(function () { $('#animated-pacman').removeClass('animated') }, 2000);

    makeScatter(dates);
    makeBarChart(dates);
    makeBubbleChart(dates);

});

function makeBarChart(dates) {

    var trace = {
        x: dates,
        type: 'histogram',
    };

    var data = [trace];
    Plotly.newPlot('histogram', data);
}

function makeScatter(dates) {
    var trace = {
        x: dates,
        type: 'scatter',
        mode: 'markers'
    };

    var layout = {
        title: 'Your recent chews',
        xaxis: {
            title: 'Time',
            titlefont: {
                family: "Comic Sans MS, cursive, sans-serif",
                size: 18,
                color: "#ff66ff"
            }
        },
        yaxis: {
            title: 'Number of chews',
            titlefont: {
                family: "Comic Sans MS, cursive, sans-serif",
                size: 18,
                color: '#ff66ff'
            }
        }
    };

    var data = [trace];

    Plotly.newPlot("line-graph", data, layout);
}

function makeBubbleChart(dates) {
    var trace = {
        x: dates,
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            opacity: [1, 0.8, 0.6, 0.4],
            size: [40, 60, 80, 100]
        }
    };

    var data = [trace];

    var layout = {
        title: 'With bubbles',
        height: 400,
        width: 480
    };

    Plotly.newPlot('bubble-chart', data, layout);
}