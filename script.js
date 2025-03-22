// Configuration for the moving lines
const config = {
  lineCount: 15,
  lineMinWidth: 1,
  lineMaxWidth: 3,
  lineMinHeight: 10,
  lineMaxHeight: 30,
  lineMinSpeed: 20,
  lineMaxSpeed: 50,
  lineColors: [
    "rgba(255, 255, 255, 0.05)",
    "rgba(255, 255, 255, 0.02)",
    "rgba(255, 255, 255, 0.03)",
  ],
};

// Initialize the moving lines
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("movingLines");
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Create lines
  for (let i = 0; i < config.lineCount; i++) {
    createLine(container, containerWidth, containerHeight);
  }
});

// Function to create a single line
function createLine(container, containerWidth, containerHeight) {
  const line = document.createElement("div");
  line.className = "line";

  // Random properties
  const width = randomBetween(config.lineMinWidth, config.lineMaxWidth);
  const height = randomBetween(config.lineMinHeight, config.lineMaxHeight);
  const speed = randomBetween(config.lineMinSpeed, config.lineMaxSpeed);
  const color =
    config.lineColors[Math.floor(Math.random() * config.lineColors.length)];

  // Set initial position
  const x = Math.random() * containerWidth;
  const y = Math.random() * containerHeight;

  // Set styles
  line.style.width = `${width}px`;
  line.style.height = `${height}px`;
  line.style.left = `${x}px`;
  line.style.top = `${y}px`;
  line.style.background = color;

  container.appendChild(line);

  // Animate the line
  animateLine(line, containerWidth, containerHeight, speed);
}

// Function to animate a line
function animateLine(line, containerWidth, containerHeight, speed) {
  let x = parseFloat(line.style.left);
  let y = parseFloat(line.style.top);

  // Random direction
  const directionX = Math.random() > 0.5 ? 1 : -1;
  const directionY = Math.random() > 0.5 ? 1 : -1;

  function move() {
    // Update position
    x += directionX * (speed / 100);
    y += directionY * (speed / 100);

    // Check boundaries and reverse direction if needed
    if (x < -50) x = containerWidth + 50;
    if (x > containerWidth + 50) x = -50;
    if (y < -50) y = containerHeight + 50;
    if (y > containerHeight + 50) y = -50;

    // Apply new position
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;

    // Continue animation
    requestAnimationFrame(move);
  }

  // Start animation
  move();
}

// Helper function to get random number between min and max
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
