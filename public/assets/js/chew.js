
let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
let xl = []
let yl = []
Plotly.d3.json(url, function (figure) {
    let data = figure.data
    for (var i = 0; i < data.length; i++) {
        xl.push(data[i][0])
        yl.push(data[i][1])
    }
    let trace = {
        x: xl,
        y: yl
    }
    Plotly.plot(document.getElementById("graph"), [trace]);
})