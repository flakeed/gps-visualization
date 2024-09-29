const socket = new WebSocket('ws://localhost:4001');

let objectId = null;
let satellites = [];
let objectPosition = null;

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (objectId === null) {
        objectId = data.id;
    }

    if (data.id === objectId) {
        objectPosition = { x: data.x, y: data.y };
    } else {
        const existingSatellite = satellites.find(sat => sat.id === data.id);
        if (existingSatellite) {
            existingSatellite.x = data.x;
            existingSatellite.y = data.y;
        } else {
            satellites.push({ id: data.id, x: data.x, y: data.y });
        }
    }

    updateGraph();
};

function updateGraph() {
    const satelliteXs = satellites.map(sat => sat.x);
    const satelliteYs = satellites.map(sat => sat.y);
    
    Plotly.react('graph', [
        {
            x: satelliteXs,
            y: satelliteYs,
            mode: 'markers',
            type: 'scatter',
            name: 'Satellites',
            marker: { color: 'blue', size: 10 }
        },
        {
            x: [objectPosition.x],
            y: [objectPosition.y],
            mode: 'markers',
            type: 'scatter',
            name: 'Object',
            marker: { color: 'red', size: 15 }
        }
    ]);
}

document.getElementById('gps-settings').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const satelliteSpeed = document.getElementById('satelliteSpeed').value;
    const objectSpeed = document.getElementById('objectSpeed').value;

    fetch('http://localhost:4001/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            satelliteSpeed: parseFloat(satelliteSpeed),
            objectSpeed: parseFloat(objectSpeed)
        })
    })
    .then(response => response.json())
    .then(data => console.log('GPS parameters updated:', data))
    .catch(error => console.error('Error updating GPS parameters:', error));
});
