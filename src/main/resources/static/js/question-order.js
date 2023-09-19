let decodedCookie = decodeURIComponent(document.cookie).split("=")[1];
var questionList = [];
var questionData = {};
const dragBox = document.getElementById("drag-box");
function getQuestion(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/GetAllQuestions?type='+decodedCookie, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let test = xhttp.responseText;
            let dataTemp = JSON.parse(test);
            questionData = dataTemp.sort((a,b) =>{
                return a.questionIndex > b.questionIndex ? 1 : -1;
            });
        }
        fillContent();
    };
    xhttp.send();
}
function updateQuestion(qList){
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", '/updateQuestionOrder', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            let test = xhttp.responseText;
        }
    };
    xhttp.send("questionList="+qList);

}
function fillContent(){
    for(let i = 0; i < questionData.length; i++){
        let div  = document.createElement("div");
        div.setAttribute("draggable",true);
        // div.setAttribute("id",questionData[i].id);
        div.classList.add("childBox");
        dragBox.appendChild(div);
        div.innerHTML = questionData[i].id + '. ' + questionData[i].question;
    }
    dragHandler();
}
function dragHandler(){
    let draggedNode = null;
    let draggedNodeBg = null;
    let dragEnterNodeBg = null;
    const dragNodes = document.querySelectorAll('div[draggable="true"]');
    dragNodes.forEach((item,index) => {
        item.setAttribute("id",index+1);
        // item. = index+1 + ". " + item.innerHTML;
        item.ondragstart = () => {
            draggedNode = item;
            draggedNodeBg = getComputedStyle(item).background;
            item.style.background = '#bbb';
        }
        item.ondragover = e => {
            e.preventDefault()
        }
        item.ondrop = e => {
            if (dragEnterNodeBg) {
                e.target.style.background = dragEnterNodeBg;
            }
            if (draggedNode !== null && draggedNode !== item) {
                const temp = document.createElement('div');
                const dragBox = document.getElementById('drag-box');
                dragBox.replaceChild(temp, e.target);
                dragBox.replaceChild(e.target, draggedNode);
                dragBox.replaceChild(draggedNode, temp);
            }
        }
        item.ondragend = () => {
            item.style.background = draggedNodeBg;
        }
        item.ondragenter = () => {
            if (item !== draggedNode) {
                dragEnterNodeBg = getComputedStyle(item).background;
                item.style.background = 'darkcyan';
            }
        }
        item.ondragleave = () => {
            if (dragEnterNodeBg && item !== draggedNode) {
                item.style.background = dragEnterNodeBg;
            }
        }
    })
}
function submit(){
    document.getElementById("submit").onclick = () =>{
        const questionNodes = document.querySelectorAll('div[draggable="true"]');
        questionNodes.forEach((item,index)=>{
            let questionIndex = index +1;
            if(item.id != questionIndex){
                let question = [];// [question ID, questionIndex]
                question[0] = parseInt(item.innerHTML.split('.')[0]);
                question[1] = questionIndex;
                questionList.push(question);
            }
        });
        const bgFilter = document.getElementsByClassName("background-filter")[0];
        const popupBox = document.getElementsByClassName("popup-box")[0];
        popupBox.style.display = "block";
        bgFilter.style.display = "block";
        const confirmButton = document.getElementsByClassName("confirm")[0];
        const cancelButton = document.getElementsByClassName("cancel")[0];
        confirmButton.onclick = () =>{
            updateQuestion(questionList);
            popupBox.style.display = "none";
            bgFilter.style.display = "none";
        }
        cancelButton.onclick = () => {
            popupBox.style.display = "none";
            bgFilter.style.display = "none";
        }
    }
}
getQuestion();
submit();

