// Event listeners
document.getElementById('table-selector').addEventListener('change', changeDisasterValue);
document.getElementById('add-num-of-choices-input').addEventListener('change', changeAddChoiceNum)
document.getElementById('edit-num-of-choices-input').addEventListener('change', changeEditChoiceNum)

// Submit buttons
document.getElementById('add-button').addEventListener('click', submitQuestion);
document.getElementById('edit-button').addEventListener('click', submitEdit);
document.getElementById('yes-delete').addEventListener('click', deleteQuestion);

// Toggle buttons
// ADD
document.getElementById('add-close-button').addEventListener('click', closeAddPopup);
document.getElementById('add-question-button').addEventListener('click', showAddPopup);
document.getElementById('question-order-button').addEventListener('click', showQuestionOrderPage);
// EDIT
document.getElementById('edit-close-button').addEventListener('click', closeEditPopup);
// DELETE
document.getElementById('no-delete').addEventListener('click', closeDeletePopup);

// Get document element
const quizDataDiv = document.querySelector('div.quiz-data-tables');
const addFrom = document.querySelector('#add-form');
const editForm = document.querySelector('#edit-form');

// Arrays
let tableHeadersArray = ['ID', 'Question order', 'Disaster', 'Num. of answers', 'Question', 'Choice A', 'Choice B', 'Choice C', 'Choice D', 'Correct answer', 'Hint', 'Options'];
let questionIndexArray = [];
let questionIdArray = [];

// GLOBAL variables
let selectedQuestionID;
let selectedDisaster;
let selectedChoiceNum;
let selectedQuestionIndex;
let questionIndexDeletePoint;

// If (cookie does not exist), ? assign default value, : else use existing value
getCookie('disaster') === '' ? setDisaster('drought') : setDisaster(getCookie('disaster'));

// Create Fetch API GET request
function fetchQuizTableData(disaster) {
    if (disaster === 'soil-erosion') disaster = 'soilErosion'; // Change text format before GET request
    fetch(`/GetAllQuestions?type=${disaster}`)
        .then(response => response.json())
        .then(quizTableData => {
            console.log(quizTableData);
            if (disaster === 'soilErosion') disaster = 'soil-erosion'; // Change text format back
            createQuizTable(disaster); // Create quiz table
            // Iterate through each question
            for (const row of quizTableData) {
                populateQuizTable(disaster, row); // Populate quiz table row by row
            }
            console.log(questionIndexArray);
            console.log(questionIdArray);
        });
}

// Create table
const createQuizTable = (disaster) => {
    // Remove past table (if exists)
    while (quizDataDiv.firstChild) quizDataDiv.removeChild(quizDataDiv.firstChild);

    // Create table heading
    let disasterHeading = document.createElement('h2');
    let currentDisaster = `${disaster}`; // Initialise currentDisaster
    // Formatting
    currentDisaster = currentDisaster.replace(/-/g, ' '); // Replace hyphen with whitespace
    disasterHeading.innerHTML = currentDisaster[0].toUpperCase() + currentDisaster.substring(1); // Capitalise first character

    // Create a table
    let disasterTable = document.createElement('table');
    disasterTable.id = `${disaster}-table`; // Table id
    // Create the table header
    let disasterTableHead = document.createElement('thead');
    disasterTableHead.id = `${disaster}-table-head`; // Table thead id
    // Create the table header row
    let disasterTableHeaderRow = document.createElement('tr');
    disasterTableHeaderRow.id = `${disaster}-table-header-row`; // Table header row id

    // Iterate over every string in tableHeaders array
    tableHeadersArray.forEach(header => {
        let disasterHeader = document.createElement('th'); // Create table heading
        disasterHeader.className = `${disaster}-heading` // Table heading class name
        disasterHeader.innerText = header; // Table heading's text
        disasterTableHeaderRow.append(disasterHeader); // Append header to the table header row
    });
    disasterTableHead.append(disasterTableHeaderRow); // Append table header row to the table head
    disasterTable.append(disasterTableHead); // Append table head to the table

    let disasterTableBody = document.createElement('tbody'); // Create table body
    disasterTableBody.id = `${disaster}-table-body`; // Table body class name
    disasterTable.append(disasterTableBody); // Append table body to the table

    quizDataDiv.append(disasterHeading); // Append heading to the 'quiz-data-tables' div
    quizDataDiv.append(disasterTable); // Append table to the 'quiz-data-tables' div
}

// Populate table
const populateQuizTable = (disaster, quizTableData) => {
    const disasterTable = document.querySelector(`#${disaster}-table-body`); // Find disaster table

    let disasterTableBodyRow = document.createElement('tr'); // Create current table row
    disasterTableBodyRow.className = `${disaster}-table-body-row`; // Table body row class name

    // Table data
    // ID
    let id = document.createElement('td');
    id.innerText = quizTableData.id;
    questionIdArray.push(quizTableData.id);
    // QuestionIndex
    let questionIndex = document.createElement('td');
    questionIndex.innerText = quizTableData.questionIndex;
    questionIndexArray.push(quizTableData.questionIndex);
    // Type
    let type = document.createElement('td');
    type.innerText = quizTableData.type;
    // ChoiceNum
    let choiceNum = document.createElement('td');
    choiceNum.innerText = quizTableData.choiceNum;
    // Question
    let question = document.createElement('td');
    question.innerText = quizTableData.question;
    // Choice A
    let choiceA = document.createElement('td');
    choiceA.innerText = quizTableData.choiceA;
    // Choice B
    let choiceB = document.createElement('td');
    choiceB.innerText = quizTableData.choiceB;
    // Choice C
    let choiceC = document.createElement('td');
    choiceC.innerText = quizTableData.choiceC;
    // Choice D
    let choiceD = document.createElement('td');
    choiceD.innerText = quizTableData.choiceD;
    // Correct answer
    let correct= document.createElement('td');
    correct.innerText = quizTableData.correct;
    // Hint
    let hint = document.createElement('td');
    hint.innerText = quizTableData.hint;
    // Options
    let options = document.createElement('td');
    options.innerHTML = '<button id="show-edit-button" onclick="showEditPopup(' + quizTableData.id + ', ' + quizTableData.questionIndex + ', \'' + quizTableData.type + '\', ' + quizTableData.choiceNum + ')">Edit</button>' +
        '<button id="show-delete-button" onclick="showDeletePopup(' + quizTableData.id + ', ' + quizTableData.questionIndex + ')">Delete</button>';

    // Append table data to table body row
    disasterTableBodyRow.append(id, questionIndex, type, choiceNum, question, choiceA, choiceB, choiceC, choiceD, correct, hint, options);
    disasterTable.append(disasterTableBodyRow); // Append table body row to the table
}

// Populate edit popup
const populateEditPopup = (quizTableData, choiceNum) => {
    document.getElementById(`edit-choices-${selectedChoiceNum}`).setAttribute('selected', '')
    document.getElementById('current-question').innerHTML = '<span>Current question: </span>' + quizTableData[0].question; // question
    document.getElementById('current-choice-a').innerHTML = '<span>Current choice A: </span>' + quizTableData[0].choiceA; // choiceA
    document.getElementById('current-choice-b').innerHTML = '<span>Current choice B: </span>' + quizTableData[0].choiceB; // choiceB
    if (choiceNum === 2) toggleChoices(2);
    document.getElementById('current-choice-c').innerHTML = '<span>Current choice C: </span>' + quizTableData[0].choiceC; // choiceC
    document.getElementById('current-choice-d').innerHTML = '<span>Current choice D: </span>' + quizTableData[0].choiceD; // choiceD
    document.getElementById('current-correct-choice').innerHTML = '<span>Current correct choice: </span>' + quizTableData[0].correct; // correct
    document.getElementById('current-hint').innerHTML = '<span>Current hint: </span>' + quizTableData[0].hint; // hint
}

// Set disaster cookie + fetch quiz data using current disaster cookie
function setDisaster(disaster) {
    setCookie('disaster', disaster, 90);// Set disaster cookie
    // Change text format
    if (disaster === 'soilErosion') disaster = 'soil-erosion';
    // Change selected option
    let selectedDisasterOption = document.getElementById(`${disaster}-option`);
    selectedDisasterOption.setAttribute('selected', '');
    // Revert text format
    if (disaster === 'soil-erosion') disaster = 'soilErosion';
    fetchQuizTableData(disaster); // fetch quiz data using current disaster cookie
}

// Change 'disaster' cookie value
function changeDisasterValue() {
    // Get selected option value
    let tableSelector = document.querySelector('#table-selector');
    let selectedValue = tableSelector.options[tableSelector.selectedIndex].value;
    // Selected option value = disaster cookie value
    setDisaster(selectedValue);
}

// ADD selector
function changeAddChoiceNum() {
    let addChoiceNumSelector = document.querySelector('#add-num-of-choices-input');
    let selectedAddValue = addChoiceNumSelector.options[addChoiceNumSelector.selectedIndex].value;
    if (selectedAddValue === '2') {
        document.getElementById('choice-c-label').style.display = 'none';
        document.getElementById('add-choice-c-input').style.display = 'none';
        document.getElementById('choice-d-label').style.display = 'none';
        document.getElementById('add-choice-d-input').style.display = 'none';
    } else if (selectedAddValue === '4') {
        document.getElementById('choice-c-label').style.display = 'block';
        document.getElementById('add-choice-c-input').style.display = 'block';
        document.getElementById('choice-d-label').style.display = 'block';
        document.getElementById('add-choice-d-input').style.display = 'block';
    }
}

// Edit selector
function changeEditChoiceNum() {
    let editChoiceNumSelector = document.querySelector('#edit-num-of-choices-input');
    let selectedEditValue = editChoiceNumSelector.options[editChoiceNumSelector.selectedIndex].value;
    toggleChoices(selectedEditValue);
}

// Set cookie
function setCookie(cName, cValue, exDays) {
    const d = new Date();
    d.setTime(d.getTime() + (exDays*24*60*60*1000));
    let expires = 'expires='+ d.toUTCString();
    document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
}

// Get cookie
function getCookie(cName) {
    let name = cName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Submit question
function submitQuestion(event) {
    event.preventDefault(); // Prevent page refresh

    const formData = new FormData(addFrom); // fromData = data from 'add-from' form
    formData.append('questionIndex', questionIndexArray[questionIndexArray.length - 1] + 1); // Increment questionIndex for every new question
    const value = Object.fromEntries(formData);
    const payload = JSON.stringify(value); // Convert FormData object to JSON

    // Create Fetch API POST request with custom header
    fetch('/adminadd', {
        method: "POST",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response); // Log response
            document.location.reload(); // Refresh
        });
}

// Submit edit
function submitEdit(event) {
    event.preventDefault(); // Prevent page refresh

    const formData = new FormData(editForm); // fromData = data from 'add-from' form
    formData.append('id', selectedQuestionID); // Add selected question id
    formData.append('type', selectedDisaster); // Add selected disaster
    formData.append('choiceNum', selectedChoiceNum); // Add selected choice number
    formData.append('questionIndex', selectedQuestionIndex); // Add selected questionIndex
    const value = Object.fromEntries(formData);
    const payload = JSON.stringify(value); // Convert FormData object to JSON
    console.log(payload);

    // Create Fetch API PUT request with custom header
    fetch('/adminupdate', {
        method: "PUT",
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response); // Log response
            document.location.reload(); // Refresh
        });
}

// Delete question
function deleteQuestion(event) {
    event.preventDefault(); // Prevent page refresh
    // Create Fetch API DELETE request
    fetch('/admindelete/' + selectedQuestionID, {
        method: "DELETE"
    })
        .then(response => response)
        .then(response => {
            console.log(response); // Log response
            resetQuestionIndices();
        });
}

// Reset question indices
function resetQuestionIndices() {
    let updatedQuestionIndexArrayLength = questionIndexArray.slice(questionIndexDeletePoint).length;
    if (updatedQuestionIndexArrayLength !== 0) {
        let i = 1;
        questionIdArray.slice(questionIndexDeletePoint).forEach(questionId => {
            // Create Fetch API GET request
            fetch('/admingetbyid/' + questionId)
                .then(response => response.json())
                .then(quizData => {
                    quizData[0].questionIndex = quizData[0].questionIndex - 1;
                    const payload = JSON.stringify(quizData[0]);
                    // Create Fetch API PUT request
                    fetch('/adminupdate', {
                        method: "PUT",
                        body: payload,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            i++;
                            if (i === updatedQuestionIndexArrayLength) document.location.reload(); // Refresh
                        });
                });
        });
    } else {
        document.location.reload(); // Refresh
    }
}

// Button toggles
// ADD
function showAddPopup() {
    document.getElementById('popup-add').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closeAddPopup() {
    document.getElementById('popup-add').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

//Jump to question order page
function showQuestionOrderPage(){
    window.location.href = "/admin/questionOrder";
}

// EDIT
function showEditPopup(id, questionIndex, disaster, choiceNum) {
    selectedQuestionID = id; // Keep track of selected question
    selectedQuestionIndex = questionIndex; // Keep track of selected questionIndex
    selectedDisaster = disaster; // Keep track of selected disaster
    selectedChoiceNum = choiceNum; // Keep track of num. of choices
    // Create Fetch API GET request
    fetch(`/admingetbyid/${selectedQuestionID}`)
        .then(response => response.json())
        .then(quizTableData => {
            populateEditPopup(quizTableData, choiceNum);
        });
    document.getElementById('popup-edit').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closeEditPopup() {
    document.getElementById('popup-edit').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

function toggleChoices(choiceNum) {
    if (choiceNum === '2' || choiceNum === 2) {
        document.getElementById('current-choice-c').style.display = 'none';
        document.getElementById('edit-choice-c-label').style.display = 'none';
        document.getElementById('edit-choice-c-input').style.display = 'none';
        document.getElementById('current-choice-d').style.display = 'none';
        document.getElementById('edit-choice-d-label').style.display = 'none';
        document.getElementById('edit-choice-d-input').style.display = 'none';
    } else if (choiceNum === '4' || choiceNum === 4) {
        document.getElementById('current-choice-c').style.display = 'block';
        document.getElementById('edit-choice-c-label').style.display = 'block';
        document.getElementById('edit-choice-c-input').style.display = 'block';
        document.getElementById('current-choice-d').style.display = 'block';
        document.getElementById('edit-choice-d-label').style.display = 'block';
        document.getElementById('edit-choice-d-input').style.display = 'block';
    }
}

// DELETE
function showDeletePopup(id, questionIndex) {
    selectedQuestionID = id; // Keep track of selected question
    questionIndexDeletePoint = questionIndex; // Keep track of the selected questionIndex delete point
    document.getElementById('popup-delete').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closeDeletePopup() {
    document.getElementById('popup-delete').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}
