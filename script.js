// Setting up functions and variables
var worldMap = []; // Currently unused
function init() { //Initializing world map
    tableHTML = "";
    for(i=0;i<27;i++){
        row = [];
        for(j=0;j<27;j++){
            row.push("unexplored");
            cellPosClasses = "row" + i + " col" + j;
            tableHTML += "<div class='cell-container " + cellPosClasses + "'><div class='cell " + cellPosClasses + " color-base unexplored'></div></div>";
        }
        worldMap.push(row);
    }
    document.getElementById("map-container").innerHTML = tableHTML;
    moveCursor(0,0);
    getCell(cursorPos).classList.replace("unexplored","explored");
}

function getCell(x,y){
    return document.getElementsByClassName('cell col'+x+' row'+y)[0];
}
function getCell(arr){
    return document.getElementsByClassName('cell col'+arr[0]+' row'+arr[1])[0]
}
function getCellContainer(x,y){
    return document.getElementsByClassName('cell-container col'+x+' row'+y)[0];
}
function getCellContainer(arr){
    return document.getElementsByClassName('cell-container col'+arr[0]+' row'+arr[1])[0]
}

// Cursor fun
var cursorPos = [13,13];
function checkBounds(x,y){
    if(x < 0) return false;
    if(x > 26) return false;
    if(y < 0) return false;
    if(y > 26) return false;
    return true;
}
function moveCursor(x,y){
    console.log(cursorPos);
    if(checkBounds(cursorPos[0]+x, cursorPos[1]+y)){
        getCellContainer(cursorPos).classList.remove("selected");
        cursorPos[0]+=x;
        cursorPos[1]+=y;
        getCellContainer(cursorPos).classList.add("selected");
    }
}

// Cell types

function toggleExploration(arr){
    cell = getCell(arr);
    if(cell.classList.contains("unexplored")){
        cell.classList.replace("unexplored","exists");
    } else {
        cell.classList.replace("explored","unexplored");
        cell.classList.replace("exists","explored");
    }
}

function setColor(arr, color){
    cell = getCell(arr);
    classes = cell.classList;
    console.log(classes);
    for(elem of classes){
        console.log(elem);
        if(elem.includes("color")){
            cell.classList.remove(elem);
        }
    }
    cell.classList.add(color);
}


// Key listener
document.addEventListener("keydown", (e) => {
    //console.log(e.key);
    switch(e.key){
        // Cursor movement
        case "ArrowUp": moveCursor(0,-1); break;
        case "ArrowDown": moveCursor(0,1); break;
        case "ArrowLeft": moveCursor(-1,0); break;
        case "ArrowRight": moveCursor(1,0); break;

        // Room coloring
        case " ": toggleExploration(cursorPos); break;
        case "x": setColor(cursorPos, "color-base"); break;
        case "t": setColor(cursorPos, "color-treasure"); break;
        case "s": setColor(cursorPos, "color-shop"); break;
        case "b": setColor(cursorPos, "color-boss"); break;
        case "h": setColor(cursorPos, "color-secret"); break;

    }
});