let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let highScore = 0; // Stores the highest score

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranidx = Math.floor(Math.random() * btns.length);
    let rancolor = btns[ranidx];
    let ranbtn = document.querySelector(`.${rancolor}`);
    gameSeq.push(rancolor);
    console.log(gameSeq);
    gameFlash(ranbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Update the high score if the current score is greater
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Highest Score: <b>${highScore}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
