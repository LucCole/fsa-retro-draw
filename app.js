const PALETTES = [
    {
        name : "Classic",
        colors : [
            "#ff0000", // red
            "#ffa500", // orange
            "#ffff00", // yellow
            "#00ff00", // green
            "#0000ff", // blue
            "#800080", // purple
            "#ffffff", // white
            "#808080", // grey
            "#000000", // black
        ]
    },
    {
        name : "Light",
        colors : [
            "#FF3C35", // red
            "#FFB42B", // orange
            "#FCFC58", // yellow
            "#8FFF54", // green
            "#4949FF", // blue
            "#E04AE0", // purple
            "#ffffff", // white
            "#808080", // grey
            "#000000", // black
        ]
    },
    {
        name : "Dark",
        colors : [
            "#B20701", // red
            "#CE8600", // orange
            "#DDDD00", // yellow
            "#48CC02", // green
            "#0101B5", // blue
            "#590059", // purple
            "#ffffff", // white
            "#808080", // grey
            "#000000", // black
        ]
    },
    {
        name : "Pastel",
        colors : [
            "#f898a4", // red
            "#fcda9c", // orange
            "#f7faa1", // yellow
            "#b4f6a4", // green
            "#9be0f1", // blue
            "#a2aceb", // pruple
            "#F2F1F8", // white
            "#c6c9d0", // grey
            "#474953", // black
        ]
    },
    {
        name : "Retro",
        colors : [
            "#F51720", // red
            "#F426A0", // pink
            "#51F3E0", // blue
            "#B8EE31", // light green
            "#F8D20F", // gold
            "#638944", // dark green
            "#F5F5F5", // white
            "#4C5270", // grey
            "#070B15", // dark blue / black
        ]
    },
    {
        name : "Earthy",
        colors : [
            "#F9F1F0", // off white
            "#FADCD9", // light pink
            "#F8AFA6", // pink
            "#EBBBB0", // pink brown
            "#D48C70", // light brown
            "#B95C51", // red brown
            "#AA1945", // dark red
            "#A49393", // grey
            "#67595E", // dark grey
        ]
    },
];

let paletteIndex = 0,
mouseIsDown = false,
currentYx = [5, 5]; // y, x


// ----- GRIDS -----

// Make Grid
function makeGrid(y, x){

    if(y > 100 || x > 100){
        alert (`You may not have any more than 100 of rows and/or columns. Right now your rows are ${y} and your cloumns are ${x}. Please re-enter your rows and columns to fit these requierments.`);
        y = currentYx[0];
        x = currentYx[1];
    }else if(y <= 0 || x <= 0){
        alert (`You may not use negative numbers or 0. Right now your rows are ${y} and your cloumns are ${x}. Please re-enter your rows and columns to fit these requierments.`);
        y = currentYx[0];
        x = currentYx[1];
    }else if(isNaN(y) || isNaN(x)){
        alert (`You may not use any characters besides numbers. Right now your rows are ${y} and your cloumns are ${x}. Please re-enter your rows and columns to fit these requierments.`);
        y = currentYx[0];
        x = currentYx[1];
    }

    // In case grid wont be a square
    if(y !== x){
        $(".grid").addClass("yxNotEqual");
    }else{
        $(".grid").removeClass("yxNotEqual");
    }

    // Cant use this as some websites wont load in before this has time to get the right width
    /*const gridWidth = parseFloat($(".grid").css("width")),
    xInGrid = Number(gridWidth) / x;*/

    xInGrid = 514 / x;

    // Y
    for(let i = 0; i < y; i++){

        let cellRow = $("<div>");
        cellRow.attr("class", "cellRow")

        // X
        for(let j = 0; j < x; j++){
            
            let cell = $("<div>");
            cell.attr("class", "cell");
            cell.css({
                "width": xInGrid+"px",
                "height": xInGrid+"px"
            });

            cellRow.append(cell)
        }

        $(".grid").append(cellRow);
    }

    // Inputs
    $("#y").val(y);
    $("#x").val(x);

    currentYx[0] = y;
    currentYx[1] = x;
}

// Remove All Cells
function clearGrid(){
    $(".grid").empty();
}

// Change Color of Clicked Cell
function onGridClick(clickedGrid){

    const activeButton = $(".active"),
    activeColor = activeButton.css('background-color');

    // If color is the same || if eraser
    if($(clickedGrid).css("background-color") === activeColor || activeButton.hasClass("eraser")){
        $(clickedGrid).css("background-color", "rgba(0, 0, 0, 0)");
    }else{
        $(clickedGrid).css("background-color", activeColor);
    }
}

// Color All Cells
function onFillAllClick(){

    if(!$(".active").hasClass("eraser")){
        $(".cell").css("background-color", $(".active").css('background-color'))
    }   
}

// Color All Empty Cells
function onFillEmptyClick(){

    const elements = $(".cell"),
    activeColor = $(".active").css("background-color");

    if(!$(".active").hasClass("eraser")){
        for (let i = 0; i < elements.length; ++i) {

            const nextElement = $( elements[i]);
        
            if (nextElement.css("background-color") === "rgba(0, 0, 0, 0)") {
                nextElement.css("background-color", activeColor);
            }
        }
    }
}

// Remove All Cells Color
function onClearClick(){
    $(".cell").css("background-color", "");
}

// Cell Events
function setCellEvents(){

    const cell = $(".cell");

    cell.mousedown(function(){
        onGridClick(this);
        mouseIsDown = true;
    });
    
    cell.mouseup(function(){
        mouseIsDown = false;
    });
    
    cell.mouseenter(function(){
        if(mouseIsDown){
            onGridClick(this);
        }
    });
}

// ----- PALETTES -----

// Create Palette
function makePalette() {

    const currentPalette = PALETTES[paletteIndex];

    $(".palette").empty();
    $(".eraser").removeClass("active");

    $("#currentPalette span").text(currentPalette.name)
    
    for (let i = 0; i < currentPalette.colors.length; ++i) {
        
        const nextColor = currentPalette.colors[i],
        colorBtn = $("<button>").css({
            "background-color": nextColor
        });
    
        $(".palette").append(colorBtn);
    
    }

    $(".palette button").first().addClass("active");
}

// Add Color to Palette
function addColor(hex){

    // #
    if(hex.indexOf("#") === -1){
        hex = "#"+hex
    }

    const colorBtn = $("<button>").css({
        "background-color": hex
    });

    $(".palette").prepend(colorBtn);
}

// Switch Active Class
function onPaletteClick(clickedButton){

    $(".palette button").removeClass("active");
    $(".eraser").removeClass("active");
    $(clickedButton).addClass("active");
}

// Switch Palettes Forwards
function nextPalette(){

    // If index + 1 < length of palette array, increase it. 
    if(paletteIndex + 1 < PALETTES.length){
        paletteIndex++;
    // Else set to index of first palette
    }else{
        paletteIndex = 0;
    }

    onClearClick();
    makePalette();
}

// Switch Paletts Backwards
function previousPalette(){

    // If index - 1 <= to 0, decrease it
    if(paletteIndex - 1 >= 0){
        paletteIndex--;
    // Else set it to index of last palette
    }else{
        paletteIndex = PALETTES.length - 1;
    }

    onClearClick();
    makePalette();
}


// ----- SETUP -----
makeGrid(8, 8);
makePalette();
setCellEvents();


// ----- CALLS -----

$(".controls .clear").click(function(){
    onClearClick()
}); 

$(".controls .fill-all").click(function(){
    onFillAllClick()
}); 

$(".controls .fill-empty").click(function(){
    onFillEmptyClick()
});

$("#previousPalette").click(function(){

    previousPalette();

    $(".palette button").click(function(){
        onPaletteClick(this);
    });
});

$("#nextPalette").click(function(){

    nextPalette();
    
    $(".palette button").click(function(){
        onPaletteClick(this);
    });
});

$(".palette button").click(function(){
    onPaletteClick(this);
});


$(".eraser").click(function(){
    onPaletteClick(this);
});

$("#createGrid").click(function(){

    const y = $("#y").val(),
    x = $("#x").val();

    clearGrid();
    makeGrid(y, x);
    setCellEvents();
});

$("#createGridXy4").click(function(){
    clearGrid();
    makeGrid(4, 4)
    setCellEvents()
});

$("#createGridXy8").click(function(){
    clearGrid();
    makeGrid(8, 8)
    setCellEvents()
});

$("#createGridXy12").click(function(){
    clearGrid();
    makeGrid(12, 12)
    setCellEvents()
});

$("#createGridXy16").click(function(){
    clearGrid();
    makeGrid(16, 16)
    setCellEvents()
});

$("#createGridXy20").click(function(){
    clearGrid();
    makeGrid(20, 20)
    setCellEvents()
});

$("#createGridXy24").click(function(){
    clearGrid();
    makeGrid(24, 24)
    setCellEvents()
});

$("#createHex").click(function(){ 
    addColor($("#hex").val());

    $(".palette button").click(function(){
        onPaletteClick(this);
    });
});

$(".grid").mouseleave(function(){
    mouseIsDown = false;
})