
WpDestroyer.version = 1; //bookmarket loader version


window.WpDestroyer.init = function() {
	//chain load a css file 
	var path   = "css";
	var style   = document.createElement( 'link' );
	style.rel   = 'stylesheet';
	style.type  = 'text/css';
	style.href  = 'http://www.lukemason.co/wp/d/WpDestroyer.css?'+ Math.random();
	document.getElementsByTagName( 'head' )[0].appendChild( style );

	//setup
	var tools = [];
	var currentTool = {};

	/* 
	 * create a prototype for our tools
	 * @title a user friendly title
	 * @class noSpaces, this will become the className for our tool
	 * @width the default tool width used for centering hits
	 * @height the default tool height used for centering hits.
	 * @variations a count of different variants
	 */
	function tool(title,className,width,height,variations) {
		this.title = title;
		this.className = className;
		this.width = width;
		this.height = height;
		this.variations = variations;
		this.index=0;
  		this.wasClicked = function(){return 1;}
	}
	//set up our tools
	var paintballGun = new tool('Paint Ball Gun','paintBall',340,340,5);
	tools.push(paintballGun);

	var hammer = new tool('Hammer','hammer',290,220,4);
	tools.push(hammer);

	//set the default tool
	currentTool = paintballGun;

	//create the overlay div we will draw on
	$D = $('<div>', {id:'WpDestroyer',height: $(document).height()} );
	//create a canvas for our animations to go into
	$C = $('<div>', {id:'destroyerCanvas', height: $(document).height()});
	$D.append($C);
	//create a controll panel
	$CP = $('<div>', {id:'destroyerControlPlanel'});
	$D.append($CP);
	//create a tools dropdown
	$T = $('<select>', {id:'destroyerControlPlanelTool'});
	for(var i in tools) {
    	$T.append(new Option(tools[i].title, i));
	}
	$T.on('change', function (e) {
    	currentTool = tools[this.value];
    	$('.mark').remove();
	});


	$CP.append($T);
	//finally add the built DOM structure to the page
	$('body').append($D);


	//add a mark on click
	//this will add a div with class toolID_Index
	$("#destroyerCanvas").click(function(e){
		currentTool.index = (currentTool.index + 1) % currentTool.variations;
	    var wrapper = $(currentTool).parent();
	    var parentOffset = wrapper.offset(); 
	    var relX = e.pageX-currentTool.width/2;
	    var relY = e.pageY-currentTool.height/2;
	    var $mark = $('<div/>').addClass('mark').addClass(currentTool.className+'_'+(currentTool.index+1)).css({
	        left: relX,
	        top: relY
    	});    
	    $(this).append($mark);
	    currentTool.wasClicked();
});
}