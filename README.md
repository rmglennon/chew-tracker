# Measure your chews

Use this site to view the stats of your mastication device. Think of this as "Fitbit for chewing."

# Technology

Wear the stylish mastication measuring device, which is connected to an Arduino unit.

The data is stored in a Firebase realtime database. Each chew is set through the Firebase REST endpoint to the database.

On the front-end, [Plotly.js](https://plot.ly/javascript/basic-charts/) is used to make the various charts. Each time the database values update (in other words, when a chew is recorded), the graphs redraw with updated timestamps.
