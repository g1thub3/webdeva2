/*02_RayyanPutraZalman_232470K*/

/*PAGE SELECTOR*/
const overviewPageBtn = document.querySelector("#overviewBtn");
const maidPageBtn = document.querySelector("#maidBtn");
const bjclPageBtn = document.querySelector("#bjclBtn");
var allpages = document.querySelector("#pages").children;

hideall();
function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
}
function show(pgno) {
    hideall();
    window.scrollTo(0,0);
    let onepage = allpages[pgno];
    onepage.style.display = "block";
}
overviewPageBtn.addEventListener("click", function () {
    show(0);
});
maidPageBtn.addEventListener("click", function () {
    show(1);
});
bjclPageBtn.addEventListener("click", function () {
    show(2);
});

/*SHOW OVERVIEW PAGE BY DEFAULT*/
show(0);

/* SHOW OR HIDE NAVIGATOR*/
const navWindow = document.querySelector("#asideContent");
const navButton = document.querySelector("#navButton");

var hidden = false;
navButton.addEventListener("click", function () {
    if (hidden == false) {
        navButton.innerHTML = "Show";
        navWindow.style.display = "none";
        hidden = true;
    } else if (hidden == true) {
        navButton.innerHTML = "Hide";
        navWindow.style.display = "block";
        hidden = false;
    }
})

//UNHIDE NAVIGATOR WHEN RESIZED LARGER
window.addEventListener('resize', function () {
    if (window.innerWidth > 800) {
        if (hidden == true) {
            navButton.innerHTML = "Hide";
            navWindow.style.display = "block";
            hidden = false;
        }
    }
});

//DRESS UP GAME
var shirtDescriptions = [
    "The school T-shirt! Everyone receives this during orientation.",
    "Some casual wear! As long as it's appropriate for school!",
    "A Japanese happi! SJCC owns a few!"
]

var wornshirt = document.querySelector("#wornshirt");
var wornpants = document.querySelector("#wornpants");

var clothing = document.querySelector("#clothing").children;
var shirtText = clothing[0];

var clickAudio = document.querySelector("#clickAudio");
var takeoffAudio = document.querySelector("#takeoffAudio");

/*DELETE CLOTHING ALREADY ON CHARACTER*/
function removeShirt() {
    let currentshirt = wornshirt.querySelector("button");
    if (currentshirt != null) {
        currentshirt.remove();
        takeoffAudio.play();
    }
    shirtText.innerHTML = "Choose a shirt!";
}

/*ADD NEW CLOTHING ONTO CHARACTER*/
function wearShirt(shirtIndex) {
    let shirtButton = clothing[shirtIndex];
    // REMOVE CURRENT SHIRT
    removeShirt();
    
    let newShirt = shirtButton.cloneNode(true);
    wornshirt.appendChild(newShirt);

    newShirt.addEventListener("click", removeShirt);

    shirtText.innerHTML = shirtDescriptions[shirtIndex - 1];
    clickAudio.play();
}

function removePants() {
    let currentpants = wornpants.querySelector("button");
    if (currentpants != null) {
        currentpants.remove();
        takeoffAudio.play();
    }
}
function wearPants(pantsIndex) {
    let pantsButton = clothing[pantsIndex];
    removePants();
    
    let newPants = pantsButton.cloneNode(true);
    wornpants.appendChild(newPants);
    newPants.addEventListener("click", removePants);

    clickAudio.play();
}
/*First three elements are shirts, last three elements are pants*/
for (let i = 1; i <= 3; i++) {
    let shirtButton = clothing[i];
    shirtButton.addEventListener("click", function () {
        wearShirt(i);
    });
}
for (let i = 4; i <= 6; i++) {
    let pantsButton = clothing[i];
    pantsButton.addEventListener("click", function () {
        wearPants(i);
    });
}


//QUIZ GAME
var JAPANESE_PHRASES = [
    ["Konnichiwa", "Hello"], ["Arigatoo Gozaimasu", "Thank you"], ["Sumimasen", "Sorry. / Excuse me."],
    ["Namae", "Name"], ["Konbanwa", "Good evening."], ["Mata raishuu", "See you next week."],
    ["Sayonara", "Goodbye"], ["Gakusee", "Student"], ["Sensee", "Teacher"],
    ["Gakubu", "School / Department"], ["Tabemono", "Food"], ["Nomimono", "Drink"],
    ["Kagi", "Key"], ["Neko", "Cat"], ["Inu", "Dog"],
    ["Hon", "Book"], ["Kuruma", "Car"], ["Shinbun", "Newspaper"],
    ["Zasshi", "Magazine"], ["Jisho", "Dictionary"], ["Ichi", "One"],
    ["Ni", "Two"], ["San", "Three"], ["Yon", "Four"],
    ["Go", "Five"], ["Roku", "Six"], ["Nana", "Seven"],
    ["Hachi", "Eight"], ["Kyuu", "Nine"], ["Juu", "Ten"]
]

var game2 = document.querySelector("#game2");
var menuPage = game2.querySelector("#game2Menu");
var questionPage = game2.querySelector("#game2Question");
var resultPage = game2.querySelector("#game2Result");
var scorePage = game2.querySelector("#game2Score");

var questionText = game2.querySelectorAll(".questionText");
var questionAnswer = resultPage.querySelector("#questionAnswer");
var questionResult = resultPage.querySelector("#questionResult");
var scoreDisplay = game2.querySelectorAll(".scoreDisplay");

var inputOptions = questionPage.querySelectorAll("input");
var selectedOption = -1;
var answerIndex = 1;
var score = 0;
var questionsAnswered = 0;

var correctAudio = document.querySelector("#correctAudio");
var wrongAudio = document.querySelector("#wrongAudio");
var passAudio = document.querySelector("#passAudio");
var failAudio = document.querySelector("#failAudio");

menuPage.style.display = "initial";
function HideQuizPages() {
    menuPage.style.display = "none";
    questionPage.style.display = "none";
    resultPage.style.display = "none";
    scorePage.style.display = "none";
}

/*GET RANDOM PHRASE FROM ARRAY*/
function GetRandomPhraseIndex(exceptions) {
    let index = Math.floor(Math.random() * JAPANESE_PHRASES.length);
    if (exceptions) {
        /*If there are phrases we don't want, keep randomising until we get a new phrase*/
        let indexValid = false;
        while (indexValid == false) {
            let similarityFound = false;
            for (let i = 0; i < exceptions.length; i++) {
                if (exceptions[i] == index) {
                    index = Math.floor(Math.random() * JAPANESE_PHRASES.length);
                    similarityFound = true;
                    break;
                }
            }
            indexValid = !similarityFound;
        }
    }
    return index;
}
function ShuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function LoadQuestion(questionNumber, answerIndex) {
    let loadingMessage = game2.querySelector("#loadingMessage");
    let inputOptions = questionPage.querySelectorAll("input");
    let inputLabels = questionPage.querySelectorAll("label");

    HideQuizPages();

    //LOAD QUESTION
    loadingMessage.style.display = "initial";

    //GET OPTIONS, ENSURE OPTIONS DO NOT REPEAT
    let option1 = GetRandomPhraseIndex([answerIndex]);
    let option2 = GetRandomPhraseIndex([answerIndex, option1]);
    let option3 = GetRandomPhraseIndex([answerIndex, option1, option2]);

    //ADD QUESTION TEXT
    questionText.forEach(function (element) {
        element.innerHTML = "Q" + (questionNumber + 1) + ": What is the meaning of " + JAPANESE_PHRASES[answerIndex][0] + "?";
    })

    //RANDOMISE OPTIONS
    let optionOrder = [answerIndex, option1, option2, option3];
    ShuffleArray(optionOrder);

    //ADD OPTIONS
    inputOptions.forEach(function (element, index) {
        element.value = optionOrder[index];
    })
    inputLabels.forEach(function (element, index) {
        element.innerHTML = JAPANESE_PHRASES[optionOrder[index]][1];
    })

    //LOADING DONE, DISPLAY QUESTION
    loadingMessage.style.display = "none";
    questionPage.style.display = "initial";
}

function StartQuiz() {
    /*RESET QUIZ STATS*/
    clickAudio.play();
    selectedOption = -1;
    answerIndex = GetRandomPhraseIndex();
    score = 0;
    questionsAnswered = 0;
    scoreDisplay.forEach(function (element) {
        element.innerHTML = "Score: " + score + " / 5";
    })
    LoadQuestion(questionsAnswered, answerIndex);
}

/*SUBMIT ANSWER*/
var submitButton = questionPage.querySelector(".changeQuizPage");
submitButton.addEventListener("click", function () {
    /*CHECK IF AN OPTION WAS SELECTED*/
    inputOptions.forEach(function (element, index) {
        if (element.checked == true) {
            selectedOption = parseInt(element.value);
            element.checked = false;
        }
    })
    if (selectedOption > -1) {
        /*CHECK IF ANSWER IS RIGHT OR WRONG*/
        clickAudio.play();
        questionsAnswered++;
        questionAnswer.innerHTML = "The answer is " + JAPANESE_PHRASES[answerIndex][1] + ". Your answer was " + JAPANESE_PHRASES[selectedOption][1] + ".";
        if (selectedOption == answerIndex) {
            questionResult.innerHTML = "CORRECT!";
            score++;
            correctAudio.play();
        } else {
            questionResult.innerHTML = "WRONG!";
            wrongAudio.play();
        }
        scoreDisplay.forEach(function (element) {
            element.innerHTML ="Score: " + score + " / 5";
        })
        /*SHOW RESULT*/
        HideQuizPages();
        resultPage.style.display = "initial";
    }
})
/*RESULT PAGE*/
var nextQuestionButton = resultPage.querySelector(".changeQuizPage");
nextQuestionButton.addEventListener("click", function () {
    clickAudio.play();
    /*IF THERE ARE STILL QUESTIONS LEFT, LOAD ANOTHER, OTHERWISE GO TO SCORE PAGE*/
    if (questionsAnswered < 5) {
        selectedOption = -1;
        answerIndex = GetRandomPhraseIndex();
        LoadQuestion(questionsAnswered, answerIndex);
    } else {
        HideQuizPages();
        scorePage.style.display = "initial";
        if (score > 2) {
            passAudio.play();
        } else {
            failAudio.play();
        }
    }
})

/*RETURN TO START PAGE*/
var restartButton = scorePage.querySelector(".changeQuizPage");
restartButton.addEventListener("click", function () {
    HideQuizPages();
    menuPage.style.display = "initial";
    clickAudio.play();
})

var startButton = menuPage.querySelector(".changeQuizPage");
startButton.addEventListener("click", StartQuiz);

//CONTENT ANIMATIONS
document.addEventListener("scroll", function () {
    /*SEARCH FOR CURRENT PAGE THAT IS OPEN*/
    var currentPage;
    for (let i = 0; i < allpages.length; i++) {
        if (allpages[i].style.display != "none") {
            currentPage = allpages[i];
            break;
        }
    }
    var pageContent = currentPage.querySelectorAll(".content");
    pageContent.forEach(function (element) {
        var screenPosition = element.getBoundingClientRect();
        //IF CONTENT IS SCROLLED INTO VIEW
        if (screenPosition.top < 600) {
            var contentComponent = element.querySelector("div");
            contentComponent.classList.add("contentTransition");
        }
    })
})