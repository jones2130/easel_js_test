(function(window){
    this.width_CarousselMenu;
    this.height_CarousselMenu;
    
    this.data;
    this.radius;
    this.speed;
    this.menuIconMin;
    
    this.bg;
    
    this.icons;
    this.angles;
    
    function CarousselMenu(width, height, xml, menuIconMin, menuRadius)
    {
        this.initialize(width, height, xml, menuIconMin, menuRadius);
    }
    
    CarousselMenu.prototype = new createjs.Container();
    CarousselMenu.prototype.Container_initialize = CarousselMenu.prototype.initialize;
    CarousselMenu.prototype.Container_tick = CarousselMenu.prototype._tick;
    
    CarousselMenu.prototype.initialize = function(width, height, xml, menuIconMin, menuRadius){
        this.Container_initialize();
        
        this.width_CarousselMenu = width;
        this.height_CarousselMenu = height;
        
        this.data = xml;
        this.menuIconMin = menuIconMin;
        this.radius = menuRadius;
        
        this.speed = 1;
        
        this.initBG();
        this.initIcons();
        this.initAngles();
    };
    
    CarousselMenu.prototype.initBG = function(){
        this.bg = new createjs.Shape();
        
        this.bg.graphics.clear();
        this.bg.graphics.beginLinearGradientFill(["#B1DBEB", "#22B4E3"], [0, 1], 20, 0, 20, this.height_CarousselMenu);
        this.bg.graphics.drawRect(0,0,this.width_CarousselMenu,this.height_CarousselMenu);
        
        this.bg.x = -(this.width_CarousselMenu / 4);
        this.bg.y = -(this.height_CarousselMenu / 4);
        
        this.bg.on("mouseover", this.handleBGMouseOver, this);
        
        this.addChild(this.bg);
    };
    
    CarousselMenu.prototype.initIcons = function(){
        this.icons = new Array();
        var root = this;
        
        jquery(this.data).find("item").each(function(){
            var title = jquery(this).find("title").text();
            var color = jquery(this).find("color").text();
            var source = jquery(this).find("source").text();
            var link = jquery(this).find("link").text();
            
            var icon = new Icon(root.menuIconMin, source, color, title, link);
            
            icon.on("icon_selected", root.handleIconSelected, this);
            
            root.icons.push(icon);
            root.addChild(icon);
        });
    };
    
    CarousselMenu.prototype.initAngles = function(){
        this.angles = new Array();
        
        for(var i = 0; i < this.icons.length; i++)
        {
            this.angles.push(i * (360 / this.icons.length));
        }
    };
    
    CarousselMenu.prototype._tick = function (){
        this.Container_tick();
        
        for(var i = 0; i < this.icons.length; i++)
        {
            var icon = this.icons[i];
            var radian = this.deg2rad(this.angles[i]);
            
            icon.x = this.x + this.radius * Math.cos(radian);
            icon.y = this.y + this.radius * Math.sin(radian) * 0.5;
            
            Math.sin(radian) + 1 > 0.8 ? icon.scaleX = icon.scaleY = 0.8 : icon.scaleX = icon.scaleY = Math.sin(radian) + 1;
            Math.sin(radian) + 1 < -0.5 ? icon.scaleX = icon.scaleY = 0.2 : icon.scaleX = icon.scaleY = Math.sin(radian) + 1;
            Math.sin(radian) > -0.5 ? icon.alpha = Math.sin(radian) : icon.alpha = 0;
            
            this.angles[i] += this.speed;
            this.angles[i] %= 360;
        }
    };
    
    CarousselMenu.prototype.deg2rad = function(value){
        return value * (Math.PI / 180);
    };
    
    CarousselMenu.prototype.handleIconSelected = function(e){
        console.log("Icon Selected!" + " : " + e.text);
    };
    
    CarousselMenu.prototype.handleBGMouseOver = function(e){
        stage.on("stagemousemove", this.handleStageMouseMove, this);
        this.bg.on("mouseout", this.handleBGMouseOut, this);
    };
    
    CarousselMenu.prototype.handleStageMouseMove = function(e){
        var destX = this.x - e.stageX + (this.width_CarousselMenu / 4);
        
        this.speed = Math.round(-destX*0.01);
    };
    
    CarousselMenu.prototype.handleBGMouseOut = function(e){
        stage.off("stagemousemove", this.handleStageMouseMove);
        this.bg.off("mouseout", this.handleBGMouseOut);
    };
    window.CarousselMenu = CarousselMenu;
}(window));