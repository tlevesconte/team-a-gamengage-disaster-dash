let currentPlayer= 'a';

// Get the modal
let modal = document.getElementById("myModal");


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
        question : "What is crisis mapping?",
        choiceA : "The use of open-source geospatial data and crowdsourcing to map an ongoing emergency",
        choiceB : "The use of local knowledge to map viral pathogenesis",
        choiceC : "The use of household interviews to map levels of panic by area",
        choiceD: "The use of expert epidemiological knowledge to predict the spread of a crisis",
        correct : "The use of open-source geospatial data and crowdsourcing to map an ongoing emergency",
        hint: "Hint: websites can engage citizens in the effort of mapping disease"

    },{
        question : "What are some important patterns to study during epidemics?",
        choiceA : "Trade routes",
        choiceB : "Populations and locations of a reservoir host",
        choiceC : "Water systems",
        choiceD: "All of the above can be important patterns to monitor during epidemics",
        correct : "All of the above can be important patterns to monitor during epidemics",
        hint: "Hint: Patterns can help to track, predict and control spread of disease"

    },{
        question : "How can the changing climate and weather affect human health? ",
        choiceA : "Increase frequency or severity of existing health risks ",
        choiceB : "Introduce health risks to geographic regions where they have not previously occurred ",
        choiceC : "Shift the timing of seasonal health risks ",
        choiceD: "All of the above",
        correct : "All of the above",
        hint: "Hint: Select a more comprehensive answer"

    },{
        question : "Which of the following statements is true concerning epidemic diseases?",
        choiceA : "They are usually not very contagious.",
        choiceB : "At the end of an epidemic, a disease spreads at an increasing rate and then abruptly disappears.",
        choiceC : "They usually appear and disappear seasonally.",
        choiceD: "They are only transmitted through liquids",
        correct : "They usually appear and disappear seasonally.",
        hint: "Hint: changes in the environment"

    },{
        question : " Diseases that are always present in a community, usually at a low, more or less constant, frequency are classified as having an ____________ pattern.",
        choiceA : "epidemic",
        choiceB : "endemic",
        choiceC : "pandemic",
        choiceD: "supersonic",
        correct : "endemic",
        hint: "Hint: The word that means ‘regularly found’ "

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
index =0;
let player1score =0;
//counter is to make sure that index is not incremented the first time, but is incremented every other time after that.
// counter = 1
window.onload= function quizcontent(){
console.log(index)

modal.style.display = "block";
hintMessage.style.display = "none";

    questionText.innerHTML = questions[index].question;
    answerA.innerHTML = questions[index].choiceA;
    answerB.innerHTML = questions[index].choiceB;
    answerC.innerHTML = questions[index].choiceC;
    answerD.innerHTML = questions[index].choiceD;
    hintMessage.innerHTML = questions[index].hint;


    if (questions[index].choiceA == null) {
        answerA.style.visibility = "hidden";
    } else {
        answerA.style.visibility = "visible";
    }

    if (questions[index].choiceB == null) {
        answerB.style.visibility = "hidden";
    } else {
        answerB.style.visibility = "visible";
    }

    if (questions[index].choiceC == null) {
        answerC.style.visibility = "hidden";
    } else {
        answerC.style.visibility = "visible";
    }

    if (questions[index].choiceD == null) {
        answerD.style.visibility = "hidden";
    } else {
        answerD.style.visibility = "visible";
    }


    function increaseindex(){
        index ++;
    }


    function endGame(){
    if(player1score == 5){
        alert(data.player1.login + " has won the game")
    }
    }
    ansbtnpress.forEach((item)=>{
        item.onclick= () =>{
            if (item.innerHTML == questions[index].correct) {
                //to show answer is correct
                item.style.backgroundColor = "green";
                //function to revert colour of button back to normal from green
                function revertBtnColour2(){
                    item.style.backgroundColor = '#F0F0F0';
                }
                //if the answer is correct, then revert button colour, increment the index by 1, and run the quizcontent (which is the entire function) again
                if(item.style.backgroundColor = "green"){
                    setTimeout(revertBtnColour2, 200)
                    setTimeout(quizcontent, 1000)
                    setTimeout(increaseindex, 950);
                    console.log("increaseIndex",index);
                    player1score++;
                    if(player1score == 5){
                        setTimeout(sendScore(PlayerScore), 500);
                    } else {console.log("game not over")}

                    console.log("JS playerscore is : " + player1score);


                }


            } else {

                item.style.backgroundColor = "red";
                function revertBtnColour(){
                    item.style.backgroundColor = '#F0F0F0';
                }
                if(item.style.backgroundColor = "red"){
                    setTimeout(revertBtnColour, 200)
                }

            }
        }
    })

    function sendScore(PlayerScore) {
        $.ajax({
            // url: url + "/multigame/gameplay",
            url: "/multigame/gameplay",
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "PlayerScore": PlayerScore,
                "gameId": gameId
            }),
            success: function (data) {
                alert("Game Over. If you are on question 6 you have won. If not, then your opponent has won.")
                console.log(data.player1.login)

            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    }

