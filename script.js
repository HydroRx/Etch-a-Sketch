// Get elements
const slider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const gridContainer = document.querySelector(".thegrid");
const colorPicker = document.getElementById("colorPicker");
const selectedColor = document.getElementById("selectedColor");
const clearBtn = document.getElementById("clearBtn");
const randomColorBtn = document.getElementById("randomColorBtn");

let currentColor = colorPicker ? colorPicker.value : "#000000"; // Default color
let isMouseDown = false;
let useRandomColor = false; // Flag to toggle random color mode

// Function to create grid
function createGrid(size) {
  console.log(`Creating grid with size ${size}`); // Debugging output
  gridContainer.innerHTML = ""; // Clear existing grid items
  gridContainer.style.setProperty("--grid-size", size);

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    // Apply color on mouse down
    gridItem.addEventListener("mousedown", () => {
      gridItem.style.backgroundColor = useRandomColor
        ? getRandomColor()
        : currentColor;
      isMouseDown = true; // Start painting
    });

    // Apply color while dragging
    gridItem.addEventListener("mouseover", () => {
      if (isMouseDown) {
        gridItem.style.backgroundColor = useRandomColor
          ? getRandomColor()
          : currentColor;
      }
    });

    // Stop painting when mouse is released
    gridItem.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    // Stop painting when mouse leaves the grid container
    gridContainer.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });

    gridContainer.appendChild(gridItem);
  }
}

// Initialize grid with default size
const initialSize = slider.value;
createGrid(initialSize);
gridSizeValue.textContent = `${initialSize} x ${initialSize}`; // Set initial value

// Update grid and span when slider value changes
slider.addEventListener("input", (event) => {
  console.log("Slider input event triggered"); // Debugging output
  const size = event.target.value;
  console.log(`Slider value: ${size}`); // Debugging output
  createGrid(size);
  gridSizeValue.textContent = `${size} x ${size}`; // Update span with new value
});

// Update current color and display selected color
if (colorPicker) {
  colorPicker.addEventListener("input", (event) => {
    currentColor = event.target.value;
    selectedColor.textContent = currentColor;
    useRandomColor = false;
  });
}

// Prevent default behavior only on the grid
gridContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

function clearGrid() {
  const gridItems = document.querySelectorAll(".thegrid .grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = "#fff"; // Reset to default color
    useRandomColor = false;
  });
}

// Add event listener to the clear button
clearBtn.addEventListener("click", clearGrid);

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Toggle random color mode when the random color button is clicked
randomColorBtn.addEventListener("click", () => {
  useRandomColor = !useRandomColor;
});
