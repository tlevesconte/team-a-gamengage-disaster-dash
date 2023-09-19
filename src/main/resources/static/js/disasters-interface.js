var startTime = 11; //Set the countdown time
var currentPlayer = 'a'; //The current player, in order to determine which player moves and gains points.
var playerASteps = 0; //The number of steps taken by player A.Up to 10
var playerBSteps = 0; //The number of steps taken by player B.Up to 10
var totalSteps = 0; //Steps of two players, corresponding to the index in the database
let playerAPosition = [1,5]; //Player A's position on the page [Y, X] Y is top, X is left or right. Absolute positioning using css.
let playerBPosition = [1,1.5]; //Player B's position on the page [Y, X] Y is top, X is left or right. Absolute positioning using css.
let playerAScore = 0;
let playerBScore = 0;
let playerAhintNum = 2;
let playerBhintNum = 2;
const bodyContent = document.getElementById("bodyContent");
const startButton = document.getElementById("startButton");
const hintButton = document.getElementsByClassName("hintButton")[0];
const hintBox = document.getElementsByClassName("hintBox")[0];
const noteBoard = document.getElementsByClassName("noteBoard")[0];

const quiz = document.getElementsByClassName("quiz")[0];
const question = document.getElementsByClassName("question")[0];
const answerA = document.getElementsByClassName("answerA")[0];
const answerB = document.getElementsByClassName("answerB")[0];
//Create div node for option C
const AnswerBoxForC = document.createElement("div");
const AnswerButtonForC = document.createElement("button");
//Create div node for option D
const AnswerBoxForD = document.createElement("div");
const AnswerButtonForD = document.createElement("button");

const playerA = document.getElementsByClassName("playerA")[0]; //The div of player A's image in the page
const playerB = document.getElementsByClassName("playerB")[0]; //The div of player B's image in the page
const countDownBox = document.getElementsByClassName("countDown")[0]; 
window.onload = function() {
    // Timer to make the page note board box disappear.
    closenoteBoardAuto = setTimeout(()=>{
        noteBoard.style.display = "none";
        document.getElementsByClassName('closeButton')[0].style.display = "none";
        startButton.style.display = "block";
    },10000)
    document.getElementsByClassName('closeButton')[0].addEventListener("click",closenoteBoard);
    startButton.addEventListener("click",showQuziBox);
    hintButton.addEventListener("click",showHint);
    answerA.addEventListener("click",submit);
    answerB.addEventListener("click",submit);
    showCurrentPlayer();
}
//If the question has four options, create two more options, C and D.
function createMoreAnswer(){
    
    AnswerButtonForC.classList.add("answer");
    AnswerButtonForC.addEventListener("click",submit);
    quiz.appendChild(AnswerBoxForC);
    AnswerBoxForC.appendChild(AnswerButtonForC);
    
    AnswerButtonForD.classList.add("answer");
    AnswerBoxForD.appendChild(AnswerButtonForD);
    quiz.appendChild(AnswerBoxForD);
    AnswerButtonForD.addEventListener("click",submit);
}
//Close the note board box by clicking the close icon.
function closenoteBoard() {
    this.style.display = "none";
    noteBoard.style.display = "none";
    startButton.style.display = "block";
    clearTimeout(closenoteBoardAuto);
}
//Display the quiz box.
function showQuziBox(){
    quiz.style.display = "block";
    startButton.style.display = "none";
    countDownBox.style.display = "block";
    hintButton.style.display = "block";
    countDown();
    changeQuizContent(totalSteps);
}
//Display the hint box, Click to show or hide
function showHint(){
    if(currentPlayer == 'a'){
        if(playerAhintNum > 0){
            if(quiz.childElementCount > 3){
                if(hintBox.style.display == "block"){
                    hintBox.style.display = "none";
                }else{
                    hintBox.style.display = "block";
                }
                playerAhintNum--;
            }else{
                currentPlayer = 'b';
            }
        }else{
            hintButton.style.display = 'none';
            currentPlayer = 'b';
        }
    }else{
        if(playerBhintNum > 0){
            if(quiz.childElementCount > 3){
                if(hintBox.style.display == "block"){
                    hintBox.style.display = "none";
                }else{
                    hintBox.style.display = "block";
                }
                playerBhintNum--;
            }else{
                currentPlayer = 'a';
            }
        }else{
            hintButton.style.display = 'none';
            currentPlayer = 'a';
        }
    }
    
}
//change the size of the quiz box according to the number of options
function changeQuizContent(step){
    let questionIndex = step + 1;
    getQuizData(questionIndex);
    //Add the data in the database to the question and answers.
    question.innerHTML = questionIndex + '. ' + quizData[0].question;
    hintBox.innerHTML = quizData[0].hint;
    answerA.innerHTML = quizData[0].choiceA;
    answerB.innerHTML = quizData[0].choiceB;
    if(quizData[0].choiceC !== null){ //If there are four options for this question
        createMoreAnswer();
        AnswerButtonForC.innerHTML = quizData[0].choiceC;
        AnswerButtonForD.innerHTML = quizData[0].choiceD;
        if(hintButton.style.display == "none"){
            hintButton.style.display = "block";
        }
    }else{
        if(hintButton.style.display == "block"){
            hintButton.style.display = "none";
        }
        if(quiz.childElementCount > 3){ //If the current question has two options, hide option C and D
            quiz.removeChild(AnswerBoxForC);
            quiz.removeChild(AnswerBoxForD);
        }
    }
}
//Player A moves
function movePlayerA(){
    if(document.body.clientHeight > 700){
        switch(playerASteps){
            case 0:
                playerA.style.animation = "playerAStep1 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 1:
                playerA.style.animation = "playerAStep2 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 2:
                playerA.style.animation = "playerAStep3 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 3:
                playerA.style.animation = "playerAStep4 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 4:
                playerA.style.animation = "playerAStep5 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 5:
                playerA.style.animation = "playerAStep6 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 6:
                playerA.style.animation = "playerAStep7 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 7:
                playerA.style.animation = "playerAStep8 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 8:
                playerA.style.animation = "playerAStep9 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
        }
    }else{
        switch(playerASteps){
            case 0:
                playerA.style.animation = "playerAStep1_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 1:
                playerA.style.animation = "playerAStep2_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 2:
                playerA.style.animation = "playerAStep3_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 3:
                playerA.style.animation = "playerAStep4_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 4:
                playerA.style.animation = "playerAStep5_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 5:
                playerA.style.animation = "playerAStep6_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 6:
                playerA.style.animation = "playerAStep7_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 7:
                playerA.style.animation = "playerAStep8_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
            case 8:
                playerA.style.animation = "playerAStep9_smallSize 1s forwards";
                playerA.style.animationTimingFunction = "steps(1)";
                break;
        }
    }
    playerASteps ++;
    totalSteps ++;
    hintBox.style.display = "none"; //Hide hint Box
    currentPlayer = 'b';
}
//Player B moves
function movePlayerB(){
    if(document.body.clientHeight > 700){
        switch(playerBSteps){
            case 0:
                playerB.style.animation = "playerBStep1 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 1:
                playerB.style.animation = "playerBStep2 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 2:
                playerB.style.animation = "playerBStep3 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 3:
                playerB.style.animation = "playerBStep4 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 4:
                playerB.style.animation = "playerBStep5 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 5:
                playerB.style.animation = "playerBStep6 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 6:
                playerB.style.animation = "playerBStep7 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 7:
                playerB.style.animation = "playerBStep8 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 8:
                playerB.style.animation = "playerBStep9 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
        }
    }else{
        switch(playerBSteps){
            case 0:
                playerB.style.animation = "playerBStep1_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 1:
                playerB.style.animation = "playerBStep2_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 2:
                playerB.style.animation = "playerBStep3_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 3:
                playerB.style.animation = "playerBStep4_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 4:
                playerB.style.animation = "playerBStep5_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 5:
                playerB.style.animation = "playerBStep6_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 6:
                playerB.style.animation = "playerBStep7_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 7:
                playerB.style.animation = "playerBStep8_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
            case 8:
                playerB.style.animation = "playerBStep9_smallSize 1s forwards";
                playerB.style.animationTimingFunction = "steps(1)";
                break;
        }
    }
    
    playerBSteps += 1;
    totalSteps ++;
    hintBox.style.display = "none";
    currentPlayer = 'a';
}
function showCurrentPlayer(){
    if(currentPlayer == 'a'){
        document.getElementById("arrows").style.top = 50 + "px";
        document.getElementById("BoxPlayerA").classList.add("playerBorder");
        document.getElementById("BoxPlayerB").classList.remove("playerBorder");
    }else{
        document.getElementById("arrows").style.top = 220 + "px";
        document.getElementById("BoxPlayerB").classList.add("playerBorder");
        document.getElementById("BoxPlayerA").classList.remove("playerBorder");
    }
}
//
function submit(e) {
    let questionIndex = totalSteps + 1;
    getAnswer(questionIndex,e.target.innerHTML);//Get the current question
    if(currentPlayer == 'a'){//Determine the current player. If current Player is A
        if(isCorrect.code == 200) {//If the request is successful
            playerAScore += 1;
            showStar();
            document.getElementsByClassName("playerAScore")[0].innerHTML = playerAScore;
            movePlayerA();
            setTimeout(()=>{changeQuizContent(totalSteps)},200);
        }else{
            showIncorrectImg();
            showHint();
        }
    }else{ //If current Player is B
        if(isCorrect.code == 200) {
            playerBScore += 1;
            showStar();
            document.getElementsByClassName("playerBScore")[0].innerHTML = playerBScore;
            movePlayerB();
            setTimeout(()=>{changeQuizContent(totalSteps)},200);
        }else{
            showIncorrectImg();
            showHint();
        }
    }
    startTime = 11;
    clearTimeout(timer);
    countDown();
    // if(playerASteps == 10 || playerBSteps == 10){
    //     playerAPosition = [1,5];
    //     playerBPosition = [1,1.5];
    //     totalSteps = 0;
    //     playerBSteps = 0;
    //     playerASteps = 0;
    //     playerA.style.animation = "none";
    //     playerB.style.animation = "none";
    //     playerA.style.top = playerAPosition[0] + 'rem';
    //     playerA.style.left = playerAPosition[1] + 'rem';
    //     playerB.style.top = playerBPosition[0] + 'rem';
    //     playerB.style.left = playerBPosition[1] + 'rem';
    //     changeQuizContent(totalSteps);
        
    //     playerAScore = 0;
    //     playerBScore = 0;
    // }
    if(playerASteps == 10){
        alert("congratulations!! playerA won");
        window.location.href = "/debriefSessions";
    }
    if(playerBSteps == 10){
        alert("congratulations!! playerB won");
        window.location.href = "/debriefSessions";
    }
    showCurrentPlayer();
    resetShowStar();
    resetIncorrectImg();
}
//A countdown to answer questions
function countDown() {
    if(startTime == 1) {//Countdown end show hint
        showHint();
        showCurrentPlayer();
        startTime = 11;
    }
    timer = setTimeout("countDown()", 1000);
    startTime--;
    if(startTime < 1){
        clearTimeout(timer);
    }
    document.getElementById("time").innerHTML = startTime + 's';
}
function showStar(){
    document.getElementsByClassName("correctStar")[0].classList.add("correctStar-display");
    if(currentPlayer == "a"){
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.add("correctStar-activeA")},10);
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.remove("correctStar-display")},1000);
    }else{
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.add("correctStar-activeB")},10);
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.remove("correctStar-display")},1000);
    }
}
function resetShowStar(){
    if(currentPlayer == 'b'){
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.remove("correctStar-activeA")},1100);
    }else{
        setTimeout(function(){document.getElementsByClassName("correctStar")[0].classList.remove("correctStar-activeB")},1100);
    }
}
function showIncorrectImg(){
    document.getElementsByClassName("incorrectImg")[0].classList.add("incorrectImg-display");
    setTimeout(function(){document.getElementsByClassName("incorrectImg")[0].classList.add("incorrectImg-active")},10);
}
function resetIncorrectImg(){
    setTimeout(function(){document.getElementsByClassName("incorrectImg")[0].classList.remove("incorrectImg-display")},1000);
    setTimeout(function(){document.getElementsByClassName("incorrectImg")[0].classList.remove("incorrectImg-active")},1000);
}