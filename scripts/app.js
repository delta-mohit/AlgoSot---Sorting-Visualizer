// "use strict";
// const start = async () => {
//   let algoValue = Number(document.querySelector(".algo-menu").value);
//   let speedValue = Number(document.querySelector(".speed-menu").value);

//   if (speedValue === 0) {
//     speedValue = 1;
//   }
//   if (algoValue === 0) {
//     alert("No Algorithm Selected");
//     return;
//   }

//   let algorithm = new sortAlgorithms(speedValue);
//   if (algoValue === 1) await algorithm.BubbleSort();
//   if (algoValue === 2) await algorithm.SelectionSort();
//   if (algoValue === 3) await algorithm.InsertionSort();
//   if (algoValue === 4) await algorithm.MergeSort();
//   if (algoValue === 5) await algorithm.QuickSort();
// };

// const RenderScreen = async () => {
//   let algoValue = Number(document.querySelector(".algo-menu").value);
//   await RenderList();
// };

// const RenderList = async () => {
//   let sizeValue = Number(document.querySelector(".size-menu").value);
//   await clearScreen();

//   let list = await randomList(sizeValue);
//   const arrayNode = document.querySelector(".array");
//   console.log(arrayNode);
//   console.log(list);
//   for (const element of list) {
//     const node = document.createElement("div");
//     node.className = "cell";
//     node.setAttribute("value", String(element));
//     node.style.height = `${3.8 * element}px`;
//     arrayNode.appendChild(node);
//   }
// };

// const RenderArray = async (sorted) => {
//   let sizeValue = Number(document.querySelector(".size-menu").value);
//   await clearScreen();

//   let list = await randomList(sizeValue);
//   if (sorted) list.sort((a, b) => a - b);

//   const arrayNode = document.querySelector(".array");
//   const divnode = document.createElement("div");
//   divnode.className = "s-array";

//   for (const element of list) {
//     const dnode = document.createElement("div");
//     dnode.className = "s-cell";
//     dnode.innerText = element;
//     divnode.appendChild(dnode);
//   }
//   arrayNode.appendChild(divnode);
// };

// const randomList = async (Length) => {
//   let list = new Array();
//   let lowerBound = 1;
//   let upperBound = 100;

//   for (let counter = 0; counter < Length; ++counter) {
//     let randomNumber = Math.floor(
//       Math.random() * (upperBound - lowerBound + 1) + lowerBound
//     );
//     list.push(parseInt(randomNumber));
//   }
//   return list;
// };

// const clearScreen = async () => {
//   document.querySelector(".array").innerHTML = "";
// };

// const response = () => {
//   let Navbar = document.querySelector(".navbar");
//   if (Navbar.className === "navbar") {
//     Navbar.className += " responsive";
//   } else {
//     Navbar.className = "navbar";
//   }
// };

// document.querySelector(".icon").addEventListener("click", response);
// document.querySelector(".start").addEventListener("click", start);
// document.querySelector(".size-menu").addEventListener("change", RenderScreen);
// document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
// window.onload = RenderScreen;


"use strict";

let isPaused = false;
let resolvePause;
const startButton = document.querySelector(".start");
const pauseResumeButton = document.querySelector(".pause-resume");
const resetButton = document.querySelector(".reset");

const start = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);
  let sizeValue = Number(document.querySelector(".size-menu").value);

  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  } else if(sizeValue === 0) {
    alert("No Array Size Selected");
    return;
  }
  else if (speedValue === 0) {
    alert("No Speed Selected");
    return;
  }
  pauseResumeButton.style.display = "inline";
  resetButton.style.display = "inline";
  startButton.style.display = "none";

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();

  pauseResumeButton.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "inline";
};

const RenderScreen = async () => {
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

const pause = async () => {
  return new Promise((resolve) => {
    resolvePause = resolve;
  });
};

pauseResumeButton.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
    pauseResumeButton.textContent = "Pause";
    resolvePause();
  } else {
    isPaused = true;
    pauseResumeButton.textContent = "Resume";
  }
});

resetButton.addEventListener("click", async () => {
  isPaused = false;
  pauseResumeButton.textContent = "Pause";
  pauseResumeButton.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "inline";
  await RenderScreen();
});

startButton.addEventListener("click", start);
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".size-menu").addEventListener("change", RenderScreen);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
