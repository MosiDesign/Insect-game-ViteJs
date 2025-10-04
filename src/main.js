import './style.css'


let sections = document.querySelectorAll("section");

let playBtn = document.querySelector("button");

let insects = document.querySelectorAll("section:nth-of-type(2) .flex-row div");

let score = 0;

let seconds = 0;

let selectedInsect = '';

let gameInterval;


function goToScroll (index) {
  if(sections[index]) {
    sections[index].scrollIntoView({behavior: "smooth"})
  }
}


function startTimer () {
  const timeEl = document.querySelector("section:nth-of-type(3) span:first-child");
  gameInterval = setInterval(() => {
    seconds++;
    let m = Math.floor(seconds / 60).toString().padStart(2, "0");
    let s = (seconds % 60).toString().padStart(2, "0");
    timeEl.textContent = `Time: ${m}:${s}`;
  },1000)
};



function updateScore() {
  let scoreEl = document.querySelector("section:nth-of-type(3) span:last-child");
  score++;
  scoreEl.textContent = `score: ${score}`;

  if (score === 10) {
    const msgBox = document.getElementById("messageBox");
    msgBox.classList.remove("opacity-0", "-translate-y-100");
    msgBox.classList.add("opacity-100", "translate-y-0");
  }
}



function getRandomPosition() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let x = Math.random() * (width - 200) + 100;
  let y = Math.random() * (height - 200) + 100;
  return {x , y};
}



function createInsect() {
  let gameArea = sections[2];
  let insect = document.createElement("img");
  insect.src = selectedInsect;
  insect.className = "absolute w-[100px] h-[100px] z-5 cursor-pointer transition-transform duration-200 hover:scale-125"

  let {x , y} = getRandomPosition();
  insect.style.left = `${x}px`;
  insect.style.top = `${y}px`;
  insect.style.position = "absolute";

  const rotation = Math.floor(Math.random() * 360);
  insect.style.transform = `rotate(${rotation}deg)`;

  insect.addEventListener("click", () => {
  updateScore();
  insect.remove();

  setTimeout(() => {
    
    const currentInsects = document.querySelectorAll("section:nth-of-type(3) img").length;

    
    if (currentInsects < 20) {
      createInsect(); 
      createInsect(); 
      }
    }, 200); 
  });

  gameArea.appendChild(insect);
}



playBtn.addEventListener("click", () => {
  goToScroll(1);
});


insects.forEach((insectDiv) => {
  insectDiv.addEventListener("click", () => {
    selectedInsect = insectDiv.querySelector("img").src; 
    goToScroll(2);
    setTimeout(() => {
      startTimer();
      createInsect();
    }, 1000);
  });
});