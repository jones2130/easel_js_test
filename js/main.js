window.jquery = require("jquery");
require("./easeljs/easeljs-0.8.0.combined");
require("./tweenjs/tweenjs-0.6.0.min");
require("./Icon");
require("./CarousselMenu");

var dockMenu;
var canvas = jquery("#canvas").get(0);
var bounds = new createjs.Rectangle();
bounds.width = canvas.width;
bounds.height = canvas.height;

init();

function init()
{
    window.stage = new createjs.Stage(canvas);
    
    stage.enableMouseOver(24);
    createjs.Ticker.setFPS(24);
    
    createjs.Ticker.addEventListener("tick", handleTick);

    jquery.ajax({
        type: "GET",
        crossDomain: false,
        url: "data/data.xml",
        dataType: "xml",
        success: initMenu
    });
}

function initMenu(data)
{
    dockMenu = new CarousselMenu(canvas.width, canvas.height, data, 60, 300);
    dockMenu.x = 180;
    dockMenu.y = 120;
    
    stage.addChild(dockMenu);
    stage.update();
}

function handleTick()
{
    stage.update();
}