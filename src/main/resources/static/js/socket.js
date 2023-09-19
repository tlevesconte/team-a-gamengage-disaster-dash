
// const url = 'http://localhost:8080';
//In case url above doesn't work in openstack instance
// const url = '';

let stompClient;
let gameId;
let PlayerScore;

function  connectToSocket (gameId){
    console.log("connecting to the game");
    // let socket = new SockJS(url + "/multigame/gameplay");
    let socket = new SockJS("/multigame/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        console.log("connected to the frame " + frame);
        stompClient.subscribe("/topic/game-progress/" + gameId, function (response){
            let data = JSON.parse(response.body);
            console.log(data)
        })
    })
}
function create_game(){
    let login = document.getElementById("login").value;
    if(login == null || login ===""){
        alert("Please enter playername")

    } else{
        $.ajax({
            // url:url + "/multigame/start",
            url:"/multigame/start",
            type: 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: function (data){
                gameId = data.gameId;
                //run reset() here
                connectToSocket(gameId);
                alert(data.player1.login + " Successfully created game. Game id is " + data.gameId);

            },
            error: function(error){
                console.log(error);
            }
        })
    }
}

function connectToRandom(){
    let login = document.getElementById("login").value;
    if(login == null || login ===''){
        alert("Please enter playername");

    } else{
        $.ajax({
            // url: url + "/multigame/connectrandom",
            url: "/multigame/connectrandom",
            type: 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: function (data){
                gameId = data.gameId;
                playerType = "Player2";
                //run reset() here
                connectToSocket(gameId);

                alert("You are now playing with " + data.player1.login);
            },
            error: function(error){
                console.log(error);
            }
        })
    }
}

function connectToSpecificGame(){
    let login = document.getElementById("login").value;
    if(login == null || login ===""){
        alert("Please enter playername")

    } else{
        let gameId = document.getElementById("game_id").value;
        if(gameId == null || gameId === ""){
            alert("Please enter game")
        }

        $.ajax({
            // url: url + "/multigame/connect",
            url:"/multigame/connect",
            type: 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "player": {
                    "login": login
                },
                "gameId": gameId
            }),
            success: function (data){
                gameId = data.gameId;
                playerType = "Player2";
                //run reset() here
                connectToSocket(gameId);
                alert("You are now playing with" + data.player1.login);
            },
            error: function(error){
                console.log(error);
            }
        })
    }
}