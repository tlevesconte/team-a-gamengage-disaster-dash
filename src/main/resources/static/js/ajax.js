var type = window.location.pathname.slice(1);
console.log(type)
var isCorrect;
var quizData = {};
function getQuizData(questionIndex){
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/GetQuestion?type='+type+'&questionIndex='+questionIndex, false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let test = xhttp.responseText;
            let dataTemp = JSON.parse(test);
            quizData = dataTemp.sort((a,b) =>{
                return a.questionIndex > b.questionIndex ? 1 : -1;
            });
        }
    };
    xhttp.send();
}
function getAnswer(questionIndex,answer){
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/SubmitAnswer', false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let test = xhttp.responseText;
            isCorrect = JSON.parse(test);
        }
    };
    xhttp.send("questionIndex=" + questionIndex + "&answer=" + answer);
}
