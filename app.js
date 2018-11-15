var canvas = document.getElementById("graph");
var c = canvas.getContext('2d');
var Breite;
var Höhe;

var canvas2 = document.getElementById("muster");
var c2 = canvas2.getContext('2d');
var Breite2;
var Höhe2;

init();
draw();

function draw() {
  location.href = '#canvases';
  c.clearRect(0, 0, Breite, Höhe);
  //millimeter zu meter konvertieren
  var g = document.getElementById("g").value / 1000;
  var N = document.getElementById("N").value;
  var a = document.getElementById("a").value;
  var projektor = document.getElementById("projektor").value;
  //nanometer zu meter konvertieren
  var lambda = document.getElementById("lambda").value / Math.pow(10, 9);
  var method = document.getElementById("method").value;

  var spalt = [];
  for (let i = 0; i < N; i++) {
    spalt[i] = i * g;
  }

  c.beginPath();
  for (let i = 0; i < Breite; i++) {
    var x = 0;
    var y = 0;
    for (var j = 0; j < N; j++) {
      x = x + Math.sin(phase((i / Breite - 0.5) * projektor, a, spalt[j], lambda));
      y = y + Math.cos(phase((i / Breite - 0.5) * projektor, a, spalt[j], lambda));
    }
    if (method == "true") {
      c.lineTo(i, Höhe - Math.pow(Math.sqrt(x * x + y * y) / N, 2) * (Höhe - 10) - 1);
    } else {
      c.lineTo(i, Höhe - Math.sqrt(x * x + y * y) / N * (Höhe - 10) - 1);
    }
    var col = Math.pow(Math.sqrt(x * x + y * y) / N, 2) * 255;
    c2.fillStyle = "rgb(" + col + ", " + col + ", " + col + ")";
    c2.fillRect(i, 0, 1, Höhe2);

  }
  c.stroke();
}

function phase(ed, a, sd, lambda) {
  return ((Math.sqrt(a * a + (sd - ed) * (sd - ed)) / lambda) % 1) * Math.PI * 2;
}

function init() {
  canvas.width = Breite = canvas.clientWidth;
  canvas.height = Höhe = canvas.clientHeight;

  canvas2.width = Breite2 = canvas2.clientWidth;
  canvas2.height = Höhe2 = canvas2.clientHeight;
  document.getElementById("g").value = 0.04;
  document.getElementById("N").value = 10;
  document.getElementById("a").value = 4;
  document.getElementById("projektor").value = 0.5;
  document.getElementById("lambda").value = 780;
  document.getElementById("method").value = "true";
}
