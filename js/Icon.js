(function (window){
    this.width_Icon;
    
    this.src;
    this.color;
    this.titleText;
    this.link;
    
    this.bg;
    this.title;
    this.image;
    
    function Icon(width, src, color, titleText, link){
        this.initialize(width, src, color, titleText, link);
    }
    
    Icon.prototype = new createjs.extend(Icon, createjs.Container);
    Icon.prototype.Container_initialize = Icon.prototype.initialize;
    Icon.prototype.Container_tick = Icon.prototype.tick;
    
    Icon.prototype.initialize = function(width, src, color, titleText, link){
        this.Container_initialize();
        this.width_Icon = width;
        this.link = link;
        this.src = src;
        this.color = color;
        this.titleText = titleText;
        
        this.regX = this.width_Icon*0.5;
        this.regY = this.width_Icon*0.5;
        
        this.initBG();
        this.initTitle();
        this.initImage();
    };
    
    Icon.prototype.initBG = function(){
        if(this.bg === undefined)
        {
            this.bg = new createjs.Shape();
            
            this.bg.graphics.beginFill("#777777");
            this.bg.graphics.drawRoundRect(0,0,this.width_Icon,this.width_Icon,this.width_Icon*0.1);
            
            this.bg.on("mousedown", this.handleBGMouseDown, this);
            this.bg.on("mouseover", this.handleBGMouseOver, this);
            this.bg.on("mouseout", this.handleBGMouseOut, this);
            
            this.addChild(this.bg);
        }
    };
    
    Icon.prototype.handleBGClick = function(e){
        console.log(this);
    };
    Icon.prototype.initTitle = function(){
        if(this.title === undefined)
        {
            this.title = new createjs.Text(this.titleText, "bold 16px Courier", this.color);
            this.title.textAlign = "center";
            this.title.x = this.width_Icon * 0.5;
            this.title.y = this.width_Icon + 5;
            this.title.alpha = 0;
            
            this.addChild(this.title);
        }
    };
    
    Icon.prototype.initImage = function(){
        if(this.image === undefined)
        {
            this.image = new createjs.Bitmap(this.src);
            this.image.regX = this.width_Icon * 0.5;
            this.image.regY = this.width_Icon * 0.5;
            this.image.x = this.width_Icon * 0.5;
            this.image.y = this.width_Icon * 0.5;
            
            this.addChild(this.image);
        }
    };
    
    Icon.prototype.handleBGMouseDown = function(e){
        //window.open(this.link);
        
        var event = new createjs.Event("icon_selected");
        
        event.text = this.titleText;
        
        this.dispatchEvent(event);
    };
    
    Icon.prototype.handleBGMouseOver = function(e){
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(this.color);
        this.bg.graphics.beginStroke(createjs.Graphics.getRGB(255,255,255));
        this.bg.graphics.drawRoundRect(0,0,this.width_Icon,this.width_Icon,this.width_Icon*0.1);
        
        createjs.Tween.removeTweens(this);
        
        this.tweenSize = createjs.Tween.get(this).to({scaleX:1.3,scaleY:1.3},500);
        
        this.title.alpha = 1;
    };
    
    Icon.prototype.handleBGMouseOut = function(e){
        this.bg.graphics.clear();
        this.bg.graphics.beginFill("#777777");
        this.bg.graphics.drawRoundRect(0,0,this.width_Icon,this.width_Icon,this.width_Icon*0.1);
        
        createjs.Tween.removeTweens(this);
        
        this.tweenSize = createjs.Tween.get(this).to({scaleX:1,scaleY:1},500);
        
        this.title.alpha = 0;
    };
    
    window.Icon = Icon;
}(window));