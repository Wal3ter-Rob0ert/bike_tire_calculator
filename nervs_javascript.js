var darkModeBtn = document.getElementById("darkModeBtn");
var weightSlider = document.getElementById("weightSlider");
var weightValue = document.getElementById("weightValue");
var widthSlider = document.getElementById("widthSlider");
var widthValue = document.getElementById("widthValue");
var calculateBtn = document.getElementById("calculateBtn");
var frontPsi = document.getElementById("frontPsi");
var rearPsi = document.getElementById("rearPsi");
var pressureLevel = document.getElementById("pressureLevel");
var warningText = document.getElementById("warningText");
var tipText = document.getElementById("tipText");
var bikeRoadBtn = document.getElementById("bikeRoad");
var bikeGravelBtn = document.getElementById("bikeGravel");
var bikeMTBBtn = document.getElementById("bikeMTB");
var surfaceSmoothBtn = document.getElementById("surfaceSmooth");
var surfaceRoughBtn = document.getElementById("surfaceRough");
var surfaceGravelBtn = document.getElementById("surfaceGravel");
var surfaceTrailBtn = document.getElementById("surfaceTrail");

var selectedBikeType = "road";
var selectedSurface = null;

var tips = [
  "Lower pressure increases comfort and grip.",
  "Higher pressure reduces rolling resistance on smooth roads.",
  "Rear tire pressure is usually slightly higher than the front.",
  "Wider tires can run lower pressure.",
  "Check your tire pressure before every ride.",
];

function updateWeightText() {
  weightValue.textContent = weightSlider.value;
}
function updateWidthText() {
  widthValue.textContent = widthSlider.value;
}

function selectBike(type) {
  selectedBikeType = type;
  bikeRoadBtn.classList.remove("selected");
  bikeGravelBtn.classList.remove("selected");
  bikeMTBBtn.classList.remove("selected");
  if (type === "road") {
    bikeRoadBtn.classList.add("selected");
  } else if (type === "gravel") {
    bikeGravelBtn.classList.add("selected");
  } else if (type === "mtb") {
    bikeMTBBtn.classList.add("selected");
  }
}

function selectSurface(type) {
  selectedSurface = type;
  surfaceSmoothBtn.classList.remove("active");
  surfaceRoughBtn.classList.remove("active");
  surfaceGravelBtn.classList.remove("active");
  surfaceTrailBtn.classList.remove("active");
  if (type === "smooth") {
    surfaceSmoothBtn.classList.add("active");
  } else if (type === "rough") {
    surfaceRoughBtn.classList.add("active");
  } else if (type === "gravel") {
    surfaceGravelBtn.classList.add("active");
  } else if (type === "trail") {
    surfaceTrailBtn.classList.add("active");
  }
}

function calculatePressure() {
  var weight = Number(weightSlider.value);
  var width = Number(widthSlider.value);
  var pressure = (weight / width) * 20;
  if (selectedBikeType === "road") {
    pressure = pressure + 12;
  } else if (selectedBikeType === "gravel") {
    pressure = pressure + 0;
  } else if (selectedBikeType === "mtb") {
    pressure = pressure - 12;
  }
  if (selectedSurface === "smooth") {
    pressure = pressure + 6;
  } else if (selectedSurface === "rough") {
    pressure = pressure + 0;
  } else if (selectedSurface === "gravel") {
    pressure = pressure - 4;
  } else if (selectedSurface === "trail") {
    pressure = pressure - 8;
  }
  if (pressure < 35) {
    pressure = 35;
  } else if (pressure > 95) {
    pressure = 95;
  }
  var front = Math.round(pressure);
  var rear = front + 5;
  return { front: front, rear: rear };
}

function showPressureLevel(psi) {
  if (psi < 50) {
    pressureLevel.textContent = "Low";
  } else if (psi >= 50 && psi <= 80) {
    pressureLevel.textContent = "Optimal";
  } else {
    pressureLevel.textContent = "High";
  }
}

function showWarning(front, rear) {
  if (front < 40) {
    warningText.textContent = "Warning: Pressure may be too low for rough terrain.";
  } else if (front > 90) {
    warningText.textContent = "Warning: Pressure may be too high for comfort.";
  } else {
    warningText.textContent = "Pressure is in a good range.";
  }
}

function showTip() {
  var index = Math.floor(Math.random() * tips.length);
  tipText.textContent = tips[index];
}
function toggleTheme() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    darkModeBtn.textContent = "Dark Mode";
  } else {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "Light Mode";
  }
}

weightSlider.addEventListener("input", updateWeightText);
widthSlider.addEventListener("input", updateWidthText);
bikeRoadBtn.addEventListener("click", function () { selectBike("road"); });
bikeGravelBtn.addEventListener("click", function () { selectBike("gravel"); });
bikeMTBBtn.addEventListener("click", function () { selectBike("mtb"); });
surfaceSmoothBtn.addEventListener("click", function () { selectSurface("smooth"); });
surfaceRoughBtn.addEventListener("click", function () { selectSurface("rough"); });
surfaceGravelBtn.addEventListener("click", function () { selectSurface("gravel"); });
surfaceTrailBtn.addEventListener("click", function () { selectSurface("trail"); });
calculateBtn.addEventListener("click", function () {
  if (selectedSurface === null) {
    warningText.textContent = "Please select a surface first.";
    return;
  }
  var result = calculatePressure();
  frontPsi.textContent = result.front;
  rearPsi.textContent = result.rear;
  showPressureLevel(result.front);
  showWarning(result.front, result.rear);
  showTip();
});
darkModeBtn.addEventListener("click", toggleTheme);

updateWeightText();
updateWidthText();
selectBike("road");
