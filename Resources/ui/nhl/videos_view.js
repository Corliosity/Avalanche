/**
 * @author Andrew Corliss
 */
function videos_view(navController, title, video, descript)
{
	var osname = Ti.Platform.osname;
	
	var win = Ti.UI.createWindow({
		title: title,
		backButtonTitle: 'Back',
		backgroundColor: '#333',
		barColor: '#13386c'
	});
	
	if (osname == 'iphone')
	{
		Ti.API.info(video);
		
		var activeMovie = Ti.Media.createVideoPlayer({
        	url :video,
        	mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
        	scalingMode : Ti.Media.VIDEO_SCALING_MODE_FILL,
        	fullscreen : false,
        	autoplay : true
    	});
    	win.add(activeMovie);
  } else
  {
  	var contentURL = video;
  	
	var openButton = Ti.UI.createButton({
    	title : "Start Video",
    	top : "0dp",
    	height : "40dp",
    	left : "10dp",
    	right : "10dp"
	});
	
	var description = Ti.UI.createButton({
		title: descript,
		top: '40dp',
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE
	});
	
	openButton.addEventListener('click', function() {
		
    	var activeMovie = Titanium.Media.createVideoPlayer({
    	    url : contentURL,
    	    backgroundColor : 'blue',
    	    movieControlMode : Titanium.Media.VIDEO_CONTROL_DEFAULT,
    	    scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
    	    autoplay: true
   		 });

    	var closeButton = Ti.UI.createButton({
        	title : "Exit Video",
        	top : "0dp",
        	height : "40dp",
        	left : "10dp",
        	right : "10dp"
    	});

    	closeButton.addEventListener('click', function() {
        	activeMovie.hide();
        	activeMovie.release();
        	activeMovie = null;
    	});
    
    	activeMovie.add(closeButton);
    	win.add(activeMovie);
	});
	
	win.add(openButton);
	win.add(description);
  }
   
    return win;
}
module.exports = videos_view;