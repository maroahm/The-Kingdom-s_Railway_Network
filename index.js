const canvas = document.querySelector("canvas");
const ctx=canvas.getContext("2d")
// let openMenu = true;
const popupHTml = document.querySelector("#menu");
const StartBtn = document.querySelector("#Start");
const easyLevel = document.querySelector("#easy");
const hardLevel = document.querySelector("#hard");
const nameInput =document.querySelector("#name");
const rules = document.querySelector("#Rules");
const rulesPopup = document.querySelector("#rulesPopup");
const closePopup = document.querySelector("#closePopup");
const playerInfo = document.querySelector("#playerInfo");
const userNameDisplay = document.querySelector("#userNameDisplay");
const timerDisplay = document.querySelector("#timerDisplay");
const mainBackground = document.querySelector("#main-background");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const backButton = document.querySelector("#backButton"); 
const resultImage = document.querySelector("#resultImage");
const resultDiv = document.querySelector("#result"); 
const leaderboard = document.querySelector("#leaderBoard");
const easy = "5x5";
const hard = "7x7";
let originalMap;
let userMap;
let mapSize;
let userTiles =[];
let timer;
let timeLeft = 20*60;
const playerObject =[];
ctx.canvas.style.boxShadow = "0px 0px 20px grey";
// ctx.canvas.style.position = "absolute";
// ctx.canvas.style.top ="0"; 
// ctx.canvas.style.left ="0"; 
// ctx.canvas.style.right ="0"; 
// ctx.canvas.style.bottom ="0"; 

// ctx.canvas.style.zIndex = "-1";
backButton.addEventListener("click", ()=>{
    openMenu();
    endGame("lose");
});

function openMenu(){
    popupHTml.style.display = 'block';
    canvasWrapper.style.display = 'none';
    backButton.style.display = 'none';
    playerInfo.style.display = 'none';
}

function closeMenu(){
    popupHTml.style.display = 'none';
    canvasWrapper.style.display = 'block';
    backButton.style.display = 'block';
    playerInfo.style.display = 'block';

}
rules.addEventListener("click", ()=>{
    rulesPopup.style.display = "flex";
    // rulesPopup.style.top = `${canvasRect.top}px`;
    // rulesPopup.style.left = `${canvasRect.left}px`;
    // rulesPopup.style.width = `${canvasRect.width}px`;
    // rulesPopup.style.height = `${canvasRect.height}px`;
});

closePopup.addEventListener("click", ()=>{
    rulesPopup.style.display = "none";
});
rulesPopup.addEventListener("click", (event)=>{
    if(event.target === rulesPopup){
        rulesPopup.style.display ="none"
    }
});

function startGame(Difficulty)
{
    // backButton.style.zIndex ="100";
    // mainBackground.style.zIndex = "-1";
    // canvasWrapper.style.zIndex = "100";
    const userName = nameInput.value;
    if (!userName) {
        return;
    }
    
    userNameDisplay.textContent = `Player: ${userName}`;
    playerInfo.style.display = "block";

    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft -= 1;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            endGame("lose");
        }
    }, 1000);

    originalMap = randomMap( Difficulty);
    mapSize = originalMap.length;
    // const Difficulty = document.querySelector('input[name="Difficulty"]:checked').value;

    if (Difficulty == easy) {
        tileSize = 140;
    } else {
        tileSize = 105;
    }
    let gridSize = tileSize * mapSize;


    closeMenu();
    creatMap();
    createUserMap(canvas, ctx, gridSize, tileSize, mapSize)
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function endGame(result) {
    clearInterval(timer);

    switch(result)
    {
        case "exit" : 
            return;
        
        case "win" :
            resultImage.src = "./starter_eng/starter_eng/pics/R.png";
            break;
        case "lose" :
            resultImage.src = "./starter_eng/starter_eng/pics/game_over.png"
            break;
        default: 
            break;
    }
    // const minutes = Math.floor(timeLeft / 60);
    // const seconds = timeLeft % 60;
    // playerObject.push({nameInput: result, timeLeft});
    // playerObject.forEach((element, i) =>{
    //     const playerList = document.createElement("li");
    //     playerList.innerHTML = `<span> ${i+1}. ${element.nameInput} : ${element.result} at ${minutes}: ${seconds< 10 ? "0" : ""}${seconds}<span>`
    //     leaderboard.appendChild(playerList);
    // })
    // leaderboard.style.display = "block";
    resultDiv.style.display = "block";
    setTimeout(() => {
        timeLeft = 20*60;
        resultDiv.style.display = "none";
        openMenu(); 
    }, 3000);
}

//     ctx.fillText("Difficulty:", 150, 200);

//     ctx.fillStyle = "darkblue";
//     ctx.fillRect(200, 250, 80, 30);  
//     ctx.fillRect(320, 250, 80, 30);  

//     ctx.fillStyle = "white";
//     ctx.fillText("Start Game", 205, 270);
//     ctx.fillText("Close", 340, 270);
// }

window.onload = openMenu;


function gettile(type) {
    switch(type) {
        case 0: return 'starter_eng/starter_eng/pics/tiles/empty.png';
        case 1: return 'starter_eng/starter_eng/pics/tiles/bridge.png';
        case 2: return 'starter_eng/starter_eng/pics/tiles/mountain.png';
        case 3: return 'starter_eng/starter_eng/pics/tiles/oasis.png';
        default: 
            // console.error(`Error: Unknown type ${type}`);
            return null;
    }
}


function getUserTile(type) {
    switch(type) {
        case 0: return 'starter_eng/starter_eng/pics/tiles/straight_rail.png';
        case 1: return 'starter_eng/starter_eng/pics/tiles/curve_rail.png';
        case 2: return 'starter_eng/starter_eng/pics/tiles/bridge_rail.png';
        case 3: return 'starter_eng/starter_eng/pics/tiles/mountain_rail.png';
        case 4: return null;
        default: 
            // console.error(`Error: Unknown type ${type}`);
            return null;
    }
}
const connections = {
    "00": [1, 0, 1, 0],
    "0180": [1, 0, 1, 0],
    "090": [0, 1, 0, 1],
    "0270": [0, 1, 0, 1],
    "10": [0, 1, 1, 0],
    "1180": [1, 0, 0, 1],
    "190": [0, 0, 1, 1],
    "1270": [1, 1, 0, 0],
    "20": [1, 0, 1, 0],
    "2180": [1, 0, 1, 0],
    "290": [0, 1, 0, 1],
    "2270": [0, 1, 0, 1],
    "30": [0, 1, 1, 0],
    "3180": [1, 0, 0, 1],
    "390": [0, 0, 1, 1],
    "3270": [1, 1, 0, 0],
};



//easy maps
const easyMap =[
    [
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }, { type: 3, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ],
    [
        [{ type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 90 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }],
        [{ type: 1, rotation: 0 }, { type: 3, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
        
    ],
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 90 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 180 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 180 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 270 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }]
    ],
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }]
    ],
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ]
];

//hard maps
const hardMap =[
    [
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 3, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0 , rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ]
    
,
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }],
        [{ type: 2, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ],

    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }],
        [{ type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ],
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 270 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 270 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 270 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ],
    [
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 1, rotation: 270 }, { type: 1, rotation: 270 }, { type: 0, rotation: 0 }, { type: 2, rotation: 90 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 2, rotation: 0 }, { type: 0, rotation: 0 }, { type: 3, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 2, rotation: 180 }, { type: 0, rotation: 0 }, { type: 1, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }],
        [{ type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }, { type: 0, rotation: 0 }]
    ]

];

function randomMap(level)
{
    if(level == "5x5")
    {
        return easyMap[Math.floor(Math.random() * easyMap.length)];
    }
    else{
        return hardMap[Math.floor(Math.random() * hardMap.length)];
    }

    return null;
}
// function creatMap() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle="#F4A460";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     let tileSize;
//     const Difficulty = document.querySelector('input[name="Difficulty"]:checked').value;

//     if (Difficulty == easy) {
//             tileSize = 140;
//         } else {
//             tileSize = 105;
//         }
//     // const tileSize = mapSize / canvas.width;
//     for (let row = 0; row < originalMap.length; row++) {
//         for (let col = 0; col < [row].length; col++) {
//             const tile = originalMap[row][col].type;
//             const img = new Image();
//             img.src = gettile(tile);
//             img.onload = () => {
//                 ctx.drawImage(img, col*tileSize, row*tileSize, tileSize, tileSize);
//             };
//         }
//     }
// }
function getconnection(type, rotation)
{
    const connection = `${type}${rotation}`;

    return connections[connection];
}

function creatMap(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#F4A460";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let tileSize;
    const Difficulty = document.querySelector('input[name="Difficulty"]:checked').value;

    if (Difficulty == easy) {
        tileSize = 140;
        ctx.canvas.width =140*5;
        ctx.canvas.height = 140*5;
    } else {
        tileSize = 105;
        ctx.canvas.width =105*7;
        ctx.canvas.height = 105*7;
    }

    
    for (let row = 0; row < originalMap.length; row++) {
        for (let col = 0; col < originalMap[row].length; col++) {
            const tileType = originalMap[row][col].type; 
            const x = col * tileSize;  
            const y = row * tileSize;  
            drawTile(tileType, x, y, originalMap[row][col].rotation, tileSize);
        }
    }

    
}
function createUserMap(canvas, context, gridSize, tileSize, mapSize) {
    userTiles = new Array(mapSize).fill(null).map(() =>
        new Array(mapSize).fill(null).map(() => ({ type: null, rotation: null }))
    );
    
    
    let lastClickedTile = null; 

    // mouse clicks
    canvas.addEventListener('mousedown', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        const row = Math.floor(y / tileSize);
        const col = Math.floor(x / tileSize);
        // lastClickedTile = lastClickedTile!==tile? null:
        
        
        if (row >= 0 && row < mapSize && col >= 0 && col < mapSize) {
            const tile = userTiles[row][col];
            if (event.button === 0) {
                // Left click cycle rail images
                if(originalMap[row][col].type ===3){return;}
                if(originalMap[row][col].type === 0)
                {
                    if((tile.type === 1 && lastClickedTile === tile) || (lastClickedTile!== tile))
                    {
                        userTiles[row][col].type = 0;
                        
                    }else{
                        userTiles[row][col].type= 1;
                    }
                }
                
                else if(originalMap[row][col].type === 1)
                {
                    userTiles[row][col].type = 2;
                }else if(originalMap[row][col].type === 2)
                {
                    userTiles[row][col].type = 3;
                }else{
                    userTiles[row][col].type = 4;
                }
                //intialize the rotation of the rail with the rotation of the tile in the origialmap
                // // console.log(originalMap[row][col].rotation);
                tile.rotation = originalMap[row][col].rotation;
                lastClickedTile = tile; 
            } else if (event.button === 2) {
                // right click to rotate current rail
                if(originalMap[row][col].type === 0 && tile.type != null)
                {
                    userTiles[row][col].rotation = (tile.rotation + 90) % 360;
                }else{
                    userTiles[row][col].type =4;
                }
            }

            
            drawUserTile(context, row, col, tile, tileSize, getUserTile(tile.type), tile.rotation);
            if(isconnected(userTiles,[row,col])){endGame("win");}
        }
        
    });
    // Prevent context menu on right click
    canvas.addEventListener('contextmenu', (event) => event.preventDefault());

    // initial drawing
    for (let row = 0; row < gridSize.rows; row++) {
        for (let col = 0; col < gridSize.cols; col++) {
            drawUserTile(context, row, col, userTiles[row][col], tileSize, null);
        }
    }
}



function drawUserTile(context, row, col, tile, tileSize, imagePath, tileRotation) {
    const x = col * tileSize;
    const y = row * tileSize;

    // context.clearRect(x, y, tileSize, tileSize);

    if (imagePath) {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            context.save();
            context.translate(x + tileSize / 2, y + tileSize / 2);
            context.rotate((tileRotation * Math.PI) / 180);
            context.drawImage(img, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
            context.restore();
        };

        // img.onerror = () => {
        //     // console.error(`Error loading image: ${imagePath}`);
        // };
    }
}


function drawTile(tileType, x, y, rotation, tileSize)
{
    // const x = col * tileSize;
    // const y = row * tileSize;

    // context.clearRect(x, y, tileSize, tileSize);
    const img = new Image();  
    img.src = gettile(tileType);

    img.onload = () => {
        ctx.save();  

        ctx.translate(x + tileSize / 2, y + tileSize / 2);  

        ctx.rotate(rotation * Math.PI / 180);  
        
        ctx.drawImage(img, -tileSize / 2, -tileSize / 2, tileSize, tileSize);  

        ctx.restore();
    };

    // img.onerror = function () {
    //     // console.log(`Error`);
    // };
}

const direction = 
[
    [-1,0],
    [0,1],
    [1,0],
    [0,-1],
]

function isconnected(userTiles, startPoint)
{
    // // console.log("Starting isconnected...");
    // console.log("Initial userTiles:", userTiles);
    let queue = [startPoint];
    
    
    let visited =[];
    for(let i =0; i < originalMap.length; i++)
    {
        row = []
        for(let j = 0; j < originalMap[i].length; j++)
        {
            if(originalMap[i][j].type === 3)
            {
                row[j] =1;
                continue;
            }
            row[j] = 0;
        }
        visited.push(row);
    }

    // const rows = userTiles.length;
    // const cols = userTiles[0].length;
    // // console.log(userTiles.length);
    if(userTiles[queue[0][0]][queue[0][1]].type === null){
        // console.log("CLICKED TILE IS STILL NULL SOMEHOW")
        return false;
    }
    // debugger;
    while(queue.length > 0)
    {
        const [currentRow, currentCol] = queue.shift();
        const key = `${currentRow}, ${currentCol}`;

        if(!visited[currentRow][currentCol])
        {
            visited[currentRow][currentCol] = 1;
        }
        else{
            continue;
        }
        
        const [isconnected,neighbours] = isconcon(userTiles,currentRow,currentCol);
        // // console.log("neighbours:", neighbours);
        if(!isconnected){
            // // console.log("NOT ALL CONNECTED TO ITS NEIGHBOURS");
            return false;
        }
        queue.push(...neighbours);
        // console.log("queue:", queue);
      
    }
    if(visited.some(row => row.includes(0))){
        // // console.log("NOT ALL VISITED");
        return false;
    }
    
    // // console.log("solved");
    return true;
}

function isconcon(userTiles, row, col)
{
    // debugger
    const neighbours = [];
    // // console.log("Processing tile at:", row, col);
    const tile = userTiles[row][col];
    const currentCon = getconnection(tile.type, tile.rotation);
    
    // console.log(`${[row,col]} TRANSLATED TO ${currentCon}`);
    let boolResult = true;
    const arrayResult = [];
    
    


    currentCon.forEach((element,i) => {
        if(element){
            neighbours.push([row+direction[i][0],col+direction[i][1]]);
            arrayResult.push([row+direction[i][0],col+direction[i][1]]);
        }  else
        {
            neighbours.push(null);
        }
    });
    // // console.log("originalMap: ", originalMap);
    neighbours.forEach((element, i) => {
        if(element === null){return;}
        if(element[0] <0 || element[0] >= mapSize || element[1] < 0 || 
        element[1] >= mapSize || userTiles[element[0]][element[1]].type === null) 
        {
            boolResult = false;
            return;
        }
        if(!getconnection(userTiles[element[0]][element[1]].type,userTiles[element[0]][element[1]].rotation)[(i+2)%4])
        {
            // // console.log(`${i} -> ${(i+2)%4}`)
            // // console.log(`${element} TRANSLATED TO ${getconnection(userTiles[element[0]][element[1]].type,userTiles[element[0]][element[1]].rotation)}`);
            // // console.log(`${[row,col]} NOT CONNECTED TO ${element}` );
            boolResult = false;
            return;
        }
        if( originalMap[element[0]][element[1]].type===3){
            boolResult=true;
            return;
        }
        
    });
    // // console.log("boolResult :", boolResult );
    // if(boolResult === false){ console.log("NOT ALL CONECTED AT : ", [row, col])}
    return [boolResult,arrayResult];
}

StartBtn.addEventListener("click", function(e){
    const Difficulty = easyLevel.checked ? easy: hard;

    startGame(Difficulty);
});