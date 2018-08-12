var config = {
    apiKey: "AIzaSyAz1tug48F42pTBzhe479jzyJEGIWORkf8",
    authDomain: "stupid-chew.firebaseapp.com",
    databaseURL: "https://stupid-chew.firebaseio.com/",
    storageBucket: ""
};
firebase.initializeApp(config);

var database = firebase.database();

// TODO: will graphs inititalize with empty db?

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
    setTimeout(function () { $('#animated-pacman').removeClass('animated') }, 100);

    makeScatter(dates);
    makeBarChart(dates);
    makeBubbleChart(dates);

    const recentChews = chewsToday(dates);
    makePieChart(recentChews);
    makeGaugeChart(recentChews);
    makeProgressChart(recentChews);

});

function makeBarChart(dates) {

    var trace = {
        x: dates,
        type: 'histogram',
    };

    var layout = {
		title: 'Chews in Time',
		width: 500,
		height: 450,
    };

    var data = [trace];
    Plotly.react('histogram', data, layout);
}

function makeScatter(dates) {
    var trace = {
        x: dates,
        type: 'scatter',
        mode: 'markers'
    };

    var layout = {
        title: 'Your recent chews',
        width: 500,
        height: 450,
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

    Plotly.react("line-graph", data, layout);
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
        height: 450,
        width: 500
    };

    Plotly.react('bubble-chart', data, layout);
}

function chewsToday(dates) {
    const now = new Date();
    return dates.filter(d => (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
    ));
}

function makePieChart(todayDates) {
    const didChewToday = todayDates.length > 0;
    const values = didChewToday ? [1, 0] : [0, 1];
    const data = [{
        values,
        labels: ['Chewed today', 'Did not chew today'],
        type: 'pie'
    }];

    const layout = {
        title: 'Did you chew today?',
        height: 300,
        width: 500,
    };
    Plotly.react('pie-chart', data, layout);
}

/**
 * Helper method to get total chews in last 2 minutes
 */
function recentFreqChews(todayDates) {
    const now = new Date();
    // Get dates in the last 2 minutes
    const threshold = 2 * 60; // 2 minutes in seconds
    return todayDates.filter(d => (
        Math.floor((now.getTime() - d.getTime()) / 1000) <= threshold
    )).length;
}

/**
 * Helper method to get gauge factor. The number of chews per 1 degree of 180
 * @param {number} max - number of chews considered to be very fast on gauge
 * @param {number} sections - number of guage sections shown
 */
function gaugeFactor(max, sections) {
    const chewsPerSection = (max / (sections - 1)) * sections;
    return max / 180
}

function makeGaugeChart(todayDates) {
    // based on 2 minutes
    const maxChews = (2 * 60) * 2;  // 2 chews per second for 2 minutes
    const intervals = 6;
    // Estimate very fast as 2 chews per second
    const factor = gaugeFactor(maxChews, intervals);
    const recentChews = recentFreqChews(todayDates) || 1;
    let level = Math.floor(recentChews / factor);
    // cap to 180
    if (level > 180) {
        level = 180
    }

    // Trig to calc meter point
    const degrees = 180 - level,
         radius = .5;
    const radians = degrees * Math.PI / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    const mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    const path = mainPath.concat(pathX,space, pathY,pathEnd);

    // TODO: intervals also affects how the graph looks
    const labels = [''];
    const chewPerInterval = maxChews / (intervals - 1);
    for (let i = 0; i < intervals; i++) {
        if (i + 1 == intervals) {
            labels.unshift(`${maxChews + 1}+`)
        } else {
            labels.unshift(`${i * chewPerInterval +1}-${(i + 1) * chewPerInterval}`);
        }
    }

    const data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
             'Slow', 'Super Slow', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {
          colors: [
              'rgba(14, 127, 0, .5)', 'rgba(170, 54, 22, .5)',
              'rgba(10, 20, 100, .5)', 'rgba(255, 109, 95, .5)',
              'rgba(210, 206, 145, 1)', 'rgba(122, 26, 202, .5)',
              'rgba(255, 255, 255, 0)',
          ]
      },
      labels,
      hoverinfo: 'label',
      hole: .4,
      type: 'pie',
      showlegend: false
    }];

    const layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Chew Frequency',
      height: 450,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.react('gauge-chart', data, layout);
}


function makeProgressChart(todayDates) {
    const current = {
        x: [todayDates.length],
        y: ['Chews'],
        type: 'bar',
        orientation: 'h',
        name: 'Chews',
        marker: {
            color: 'rgba(230,25,25,0.5)',
            width: 1
        }
    };

    const goal = {
        x: [10000],
        y: ['Chews'],
        type: 'bar',
        orientation: 'h',
        name: '10k Goal',
        marker: {
            color: 'rgba(123,57,255,0.3)',
            width: 1
        }
    };

    const data = [current, goal];

    const layout = {
        title: 'Progress Today',
        height: 450,
        width: 500,
        barmode: 'stack',
    };
    Plotly.react('progress-bar', data, layout);
}