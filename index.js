import paragraphs from "./paragraph.js";

let charIndex = 0;
let mistakes = 0;
let seconds = 60;
let WPM = 0;
let CPM = 0;
let startTimer = false;

let data = document.querySelector(".writingText");

// getting random paragraphs
function generateRandomPara() {
  let html = ``;
  let randomNum = Math.floor(Math.random() * paragraphs.length);

  let randomParagraph = paragraphs[randomNum];
  console.log(randomParagraph.split(" "));

  randomParagraph.split("").forEach((letter) => {
    let span = `<span>${letter}</span>`;
    html += span;
  });
  // dyanmically showing paragraphs
  data.innerHTML = html;
}
generateRandomPara();

let input = document.querySelector(".text-box");

// correctly typed or not
document.addEventListener("keyup", () => {
  input.focus();
});

document.querySelector(".mainBox").addEventListener("click", () => {
  input.focus();
});

let qs = data.querySelectorAll("span");
let x = document.querySelector(".mistakes span strong");

let timerInterval;
function timer() {
  timerInterval = setInterval(() => {
    seconds--;
    document.querySelector(".timeLeft span strong").innerHTML = seconds;
    if (seconds === 0) {
      clearInterval(timerInterval);
      input.disabled = true;
    }
  }, 1000);
}

// function to update cpm and wpm
function update_CPMandWPM(CPM, WPM) {
  document.querySelector(".CPM span strong").innerHTML = CPM;
  document.querySelector(".WPM span strong").innerHTML = WPM;
}

// try again button click functionality

// update values when clicked on try again;
function updateValues() {
  mistakes = 0;
  seconds = 60;
  document.querySelector(".timeLeft span strong").innerHTML = seconds;
  WPM = 0;
  CPM = 0;
  startTimer = false;
  x.innerHTML = mistakes;
  update_CPMandWPM(CPM, WPM);
  clearInterval(timerInterval);
  input.disabled = false;
}

document.querySelector(".tryAgain").addEventListener("click", () => {
  charIndex = 0;
  generateRandomPara();
  input.value = "";
  data = document.querySelector(".writingText");
  qs = data.querySelectorAll("span");

  if (input.value === "") {
    qs[0].classList.add("active");
  }
  updateValues();
});

function typeChange() {
  if (!startTimer) {
    timer();
  }
  startTimer = true;
  //   qs = data.querySelectorAll("span");
  let typedText = input.value.split("");
  //   console.log(typedText);
  if (typedText[charIndex] == null) {
    charIndex--;
    if (qs[charIndex].classList.contains("incorrect")) {
      mistakes--;
      x.innerHTML = mistakes;
    }
    qs[charIndex].classList.remove("correct", "incorrect", "active");
    qs.forEach((item) => {
      item.classList.remove("active");
    });
    qs[charIndex].classList.add("active");
  } else {
    console.log(qs[charIndex].innerHTML, typedText[charIndex]);
    if (qs[charIndex].innerHTML === typedText[charIndex]) {
      console.log("Correct");
      qs[charIndex].classList.add("correct");
    } else {
      mistakes++;
      console.log("incorrect");
      qs[charIndex].classList.add("incorrect");
    }
    qs.forEach((item) => {
      item.classList.remove("active");
    });
    qs[charIndex + 1].classList.add("active");
    charIndex++;
    x.innerHTML = mistakes;
    // function to update CPM and WPM
  }
  CPM = input.value.split("").length;
  WPM = input.value.split(" ").length;
  // When we backspace characters, it still shows WPM = 1, to avoid it, below line of code is used.
  if (input.value.split(" ")[0] === "") {
    WPM = 0;
  }
  console.log(input.value.split(" "));
  update_CPMandWPM(CPM, WPM);
}

if (input.value === "") {
  qs[0].classList.add("active");
}

input.addEventListener("input", typeChange);
