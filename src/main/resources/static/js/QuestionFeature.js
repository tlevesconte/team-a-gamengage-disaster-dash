let currentPlayer= 'a';

// Get the modal
let modal = document.getElementById("myModal");


// Select Platform with different questions
let platforms = document.querySelectorAll(".platform")


// Hint/Correct Message
let hintMessage = document.getElementById("hint");

// Get the questions ID element
let questionText = document.querySelector('#question')
 
// Get answer options A,B,C,D to change text
let answerA = document.querySelector('#A')
let answerB = document.querySelector('#B')
let answerC = document.querySelector('#C')
let answerD = document.querySelector('#D')

// Get answer button pressed 
let ansbtnpress = document.querySelectorAll(".ansbtn")


// Jiajun JS addition to make A and B move 
let playerA = document.getElementsByClassName("playerA")[0];
let playerB = document.getElementsByClassName("playerB")[0];

let playerASteps = 0;
let playerBSteps = 0;

let playerAPosition = [40,80];
let playerBPosition = [50,40];

// var currentPlayer = 'a';
let startButton = document.getElementsByClassName("start-button")[0];


let questions = [
    {
        question : "What is an Epidemic?",
        choiceA : "A Tropical Storm",
        choiceB : "A heatwave above 50 degrees celsius",
        choiceC : "a widespread occurrence of an infectious disease in a community at a particular time",
        choiceD: "A toxic waste in the form of a liquid that damages soil",
        correct : "a widespread occurrence of an infectious disease in a community at a particular time",
        hint: "Hint: Something that has to do with health"
    },{
        question : "An epidemic that becomes unusually widespread and even global in its reach is referred to as a?",
        choiceA : "pandemic",
        choiceB : "hyperendemic",
        choiceC : "Spanish flu",
        choiceD: "torpedo",
        correct : "pandemic",
        hint: "Hint: it has a pan in its name"
    },{
        question : "A disease vector is a(n)?",
        choiceA : "symptom of a disease",
        choiceB : "environmental condition associated with a disease",
        choiceC : "organism that transmits a disease",
        choiceD: "Element of the soil that casues disease",
        correct : "organism that transmits a disease",
        hint: "Hint: usually small flying insects"
    },{
        question : "Question 4",
        choiceA : "q4 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q4 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 5",
        choiceA : "q5 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q5 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 6",
        choiceA : "q6 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q6 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 7",
        choiceA : "q7 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q7 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 8",
        choiceA : "q8 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q8 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 9",
        choiceA : "q9 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q9 correct",
        hint: "Hint: add hint here"
    }
];

let questionsp2 = [
    {
        question : "What is an Epidemic P2?",
        choiceA : "A Tropical Storm P2",
        choiceB : "A heatwave above 50 degrees celsius",
        choiceC : "a widespread occurrence of an infectious disease in a community at a particular time",
        choiceD: "A toxic waste in the form of a liquid that damages soil",
        correct : "a widespread occurrence of an infectious disease in a community at a particular time",
        hint: "Hint: Something that has to do with health"
    },{
        question : "An epidemic that becomes unusually widespread and even global in its reach is referred to as a?",
        choiceA : "pandemic",
        choiceB : "hyperendemic",
        choiceC : "Spanish flu",
        choiceD: "torpedo",
        correct : "pandemic",
        hint: "Hint: it has a pan in its name"
    },{
        question : "A disease vector is a(n)? P2",
        choiceA : "symptom of a disease",
        choiceB : "environmental condition associated with a disease",
        choiceC : "organism that transmits a disease",
        choiceD: "Element of the soil that casues disease",
        correct : "organism that transmits a disease",
        hint: "Hint: usually small flying insects"
    },{
        question : "Question 4",
        choiceA : "q4 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q4 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 5",
        choiceA : "q5 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q5 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 6 P2",
        choiceA : "q6 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q6 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 7",
        choiceA : "q7 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q7 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 8",
        choiceA : "q8 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q8 correct",
        hint: "Hint: add hint here"
    },{
        question : "Question 9",
        choiceA : "q9 correct",
        choiceB : "Incorrect",
        choiceC : "Incorrect",
        choiceD: "Incorrect",
        correct : "q9 correct",
        hint: "Hint: add hint here"
    }
];



// Player 1 score count
p1score = 0 ;
// Index holder for extracting platform number
let indexholder;
for(let index = 0; index < platforms.length; index +=1){
platforms[index].addEventListener("click", pressbtn);
function pressbtn(){
  modal.style.display = "block";
  countDown();
  hintMessage.style.display = "none";
  questionText.innerHTML = questions[index].question; 
  answerA.innerHTML = questions[index].choiceA;
  answerB.innerHTML = questions[index].choiceB;
  answerC.innerHTML = questions[index].choiceC;
  answerD.innerHTML = questions[index].choiceD;
  hintMessage.innerHTML = questions[index].hint;
  indexholder= [index]  ;

if(questions[index].choiceA == null){
    answerA.style.visibility = "hidden";
  }else{
    answerA.style.visibility ="visible";
  }
  
if(questions[index].choiceB == null){
    answerB.style.visibility = "hidden";
  }else{
    answerB.style.visibility ="visible";
  }
  
if(questions[index].choiceC == null){
    answerC.style.visibility = "hidden";
  }else{
    answerC.style.visibility ="visible";
  }
  
  if(questions[index].choiceD == null){
    answerD.style.visibility = "hidden";
  }else{
    answerD.style.visibility ="visible";
  }
  }
  
}
let P1attempts = 1;

//   what answer was selected, check answer function
  for(let i = 0; i < ansbtnpress.length; i+=1) {
    ansbtnpress[i].addEventListener("click", checkAnswer);
    function checkAnswer(){
      let playerA = document.getElementsByClassName("playerA")[0];

        if(ansbtnpress[i].innerHTML == questions[indexholder].correct){
            if(playerASteps < 4) {
              playerASteps += 1;
              playerAPosition[1] += 110;
              playerA.style.left = playerAPosition[1] + 'px';
              currentPlayer = 'b';
            }else{
                  playerASteps += 1;
                  playerAPosition[0] += 100;
                  playerA.style.top = playerAPosition[0] + 'px';
                  currentPlayer = 'b';
           
            
            }
            p1score ++;
            console.log("p1score =" + p1score)
            modal.style.display = "none";
            clearTimeout(timer);
            startTime = 15;
            increment ++;
            

          }
          else if (P1attempts > 0) {
            P1attempts -- ;

            console.log("p1attempt : " + P1attempts)
            ansbtnpress[i].style.backgroundColor = "red";
            function revertBtnColour(){
            ansbtnpress[i].style.backgroundColor = '#F0F0F0';
            }
            if(ansbtnpress[i].style.backgroundColor = "red"){
              setTimeout(revertBtnColour, 3000)
            }
            hintMessage.style.display = "inline"
          
        } 
        else{
          modal.style.display = "none";
          
          ansbtnpress[i].style.backgroundColor = '#F0F0F0';
          currentPlayer = 'b';
          clearTimeout(timer);
          startTime = 15;
          P1attempts = 1;
        }

}
  }

// ================================================================================================
// all of player2 JS variables declared here
let modalP2 = document.getElementById("myModalP2");
let platformsP2 = document.querySelectorAll(".platformP2")
let ansbtnpressP2 = document.querySelectorAll(".ansbtnP2")
let answerA2 = document.querySelector('#A2')
let answerB2 = document.querySelector('#B2')
let answerC2 = document.querySelector('#C2')
let answerD2 = document.querySelector('#D2')
let hintMessage2 = document.getElementById("hint2");
let questionText2 = document.querySelector('#question2')




// Player 2 score count
p2score = 0 ;
// Index holder 2 for extracting platform number P2
let indexholder2;
for(let index = 0; index < platformsP2.length; index +=1){
platformsP2[index].addEventListener("click", pressbtn);
function pressbtn(){
  modalP2.style.display = "block";
  countDownP2();
  hintMessage2.style.display = "none";
  questionText2.innerHTML = questionsp2[index].question; 
  answerA2.innerHTML = questionsp2[index].choiceA;
  answerB2.innerHTML = questionsp2[index].choiceB;
  answerC2.innerHTML = questionsp2[index].choiceC;
  answerD2.innerHTML = questionsp2[index].choiceD;
  hintMessage2.innerHTML = questionsp2[index].hint;
  indexholder2= [index]  ;
  if(questionsp2[index].choiceA == null){
    answerA2.style.visibility = "hidden";
  }else{
    answerA2.style.visibility ="visible";
  }
  
if(questionsp2[index].choiceB == null){
    answerB2.style.visibility = "hidden";
  }else{
    answerB2.style.visibility ="visible";
  }
  
if(questionsp2[index].choiceC == null){
    answerC2.style.visibility = "hidden";
  }else{
    answerC2.style.visibility ="visible";
  }
  
  if(questionsp2[index].choiceD == null){
    answerD2.style.visibility = "hidden";
  }else{
    answerD2.style.visibility ="visible";
  }
  }}

  let P2attempts = 1;
//   P2 for what answer was selected, check answer function
for(let i = 0; i < ansbtnpressP2.length; i+=1) {
    ansbtnpressP2[i].addEventListener("click", checkAnswer);
    function checkAnswer(){
      let playerB = document.getElementsByClassName("playerB")[0];
        if(ansbtnpressP2[i].innerHTML == questionsp2[indexholder2].correct){
            if(playerBSteps < 5){
              playerBSteps += 1;
                    playerBPosition[0] += 100;
                    playerB.style.top = playerBPosition[0] + 'px';
                    currentPlayer = 'a';
            }else{
                        playerBSteps += 1;
                        playerBPosition[1] += 110;
                        playerB.style.left = playerBPosition[1] + 'px';
                        currentPlayer = 'a';
                    }
            
            p2score ++;
            console.log("p2score =" + p2score)
            modalP2.style.display = "none";
            clearTimeout(timer2);
            startTime2 = 15;      
            increment2 ++;  
            
        
        }else if (P2attempts > 0) {
          P2attempts -- ;

          console.log("p2attempt : " + P2attempts)
          ansbtnpressP2[i].style.backgroundColor = "red";
          function revertBtnColour2(){
          ansbtnpressP2[i].style.backgroundColor = '#F0F0F0';
          }
          if(ansbtnpressP2[i].style.backgroundColor = "red"){
            setTimeout(revertBtnColour2, 3000)
          }
          hintMessage2.style.display = "inline"
        
      } 
      else{
        modalP2.style.display = "none";
        
        currentPlayer = 'a';
        clearTimeout(timer2);
        startTime2 = 15;
        P2attempts = 1;
      }
    }
}

// Is game over check
checkGameOver = setInterval(endGame, 1000);

function endGame() {
    if (p1score > 8 ){
        alert("P1 has won the game!");
        clearInterval(checkGameOver) ;
    } else if (p2score > 8) {
        alert("P2 has won the game!");
        clearInterval(checkGameOver) ;
    } else{
        console.log("")
    }
}


let increment = 0;
let increment2 = 0;
startButton.addEventListener("click",startGame);


function startGame(){
  if(currentPlayer == 'a'){
    platforms[increment].click();
    
    console.log(currentPlayer)
  }else{
    platformsP2[increment2].click();
    
    console.log(currentPlayer)
  }
}

let startTime = 15;
let startTime2 = 15;

function countDown() {
  timer = setTimeout("countDown()", 1000);
  startTime--;
  document.getElementById("time").innerHTML = startTime + 's';
 

  if(startTime < 1){
    
      clearTimeout(timer);
      modal.style.display = "none";
      currentPlayer = 'b';
      startTime = 15;
      P1attempts = 1;

  }

}


function countDownP2() {

  timer2 = setTimeout("countDownP2()", 1000);
  document.getElementById("time2").innerHTML = startTime2 + 's';
  startTime2--;
  if(startTime2 < 1){
      clearTimeout(timer2);
      modalP2.style.display = "none";
      currentPlayer = 'a';
      startTime2 = 15;
      P2attempts = 1;
  }
  

}




