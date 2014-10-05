$(document).on('ready', function() {
	slidr.create('article', {
		transition: 'cube',
		controls: 'none'
	}).start();


	var FRAME = false;
	$(function(){
	    
	    var frameControl = function(gesture){
	        console.log(gesture.type)
	        switch (gesture.type) {
	            case "swipe":
	                console.log("Swipe");
	                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
	                if(isHorizontal) {
	                    console.log("was horizontal");
	                    if(gesture.direction[0] > 0){
	                        $(document).trigger("like", [queue[0]]);
	                    }
	                    else {
	                        $(document).trigger("dislike");
	                    }
	                    
	                }
	                break;
	            default: break;
	        }                         
	    };

	    var output = document.getElementById("output");

	    var controllerOptions = {enableGestures: true};

	  

	    var browserLoopController = new Leap.Controller({frameEventName: 'animationFrame', enableGestures: true});
	    browserLoopController.connect();

	    var time = new Date().getTime();
	    var THRESHOLD = 500;
	    


	

	    browserLoopController.on("frame", function(frame){
	        var now = new Date().getTime();
	        if(frame.valid && frame.gestures.length > 0 && now - time >= THRESHOLD){
	            var gesture = frame.gestures[0];
	            frameControl(gesture);
	            time = now;
	        } // else {
	        //     console.log("skipped");
	        // }
	    })
	
	    var tokenKey = "4621030e12e085226f2cba99d0b19f1a2cc1337b9c7ed8fd91668ec97d1e844ehackathon3",
	        time = new Date().getTime(),
	        DAY = 86400000;

	    var lower = time - DAY;
	    lower = Math.floor(lower / 1000);

	    time = Math.floor(time / 1000);

	    var queue = [],
	        liked = [];

	    $(document).on("makeQueue", function(evt, data){
	        $(data).each(function(i, e){
	            queue.push(e.title);
	        });
	        $(document).trigger("displayHeadline");
	    });

	    $(document).on("displayHeadline", function(){
	        $("#headline").html(queue[0]);
	        
	    });

	    $(document).on("like", function(evt, headline){
	        liked.push(headline);
	        queue.shift();
	        FRAME = false;
	        $(document).trigger("displayHeadline");
	    });

	    $(document).on("dislike", function(){
	        queue.shift();
	        FRAME = false;
	        $(document).trigger("displayHeadline");
	    });

	    $.ajax({
	        url: "http://www.buzzfeed.com/buzzfeed/api/buzzes?since=" + lower + "&until=" + time + "&session_key=" + tokenKey,
	        success: function(data){
	            var buzzes = data.buzzes;
	            $(document).trigger("makeQueue", [buzzes]);
	        }
	    });

	});

	// when the flick happens

	$(document).on('like', function() {
		if (slidr.canSlide('right')) {
			slidr.slide('right');
		}
		
	});
});
