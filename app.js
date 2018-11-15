var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');
var Breite = canvas.width;
var Höhe = canvas.height;

var canvas2 = document.getElementById("canvas2");
var c2 = canvas2.getContext('2d');
var Breite2 = canvas2.width;
var Höhe2 = canvas2.height;

init();
draw();

function draw() {
  c.clearRect(0, 0, Breite, Höhe);
  var g = document.getElementById("g").value;
  var N = document.getElementById("N").value;
  var a = document.getElementById("a").value;
  var projektor = document.getElementById("projektor").value;
  var lambda = document.getElementById("lambda").value;
  var method = document.getElementById("method").value;

  var spalt = [];
  for (var i = 0; i < N; i++) {
    spalt[i] = i * g;
  }

  c.beginPath();
  for (var i = 0; i < Breite; i++) {
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
  document.getElementById("g").value = 0.00004;
  document.getElementById("N").value = 10;
  document.getElementById("a").value = 4;
  document.getElementById("projektor").value = 0.5;
  document.getElementById("lambda").value = 0.00000078;
  document.getElementById("method").value = "true";
}