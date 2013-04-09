/**
 * @author Andrew Corliss
 */
function videos(navController)
{
	var the_video = require('services/avs_videos');
	var show = new the_video();
	
	var osname = Ti.Platform.osname;
	
	var win = Ti.UI.createWindow({
		title: 'Videos',
		backButtonTitle: 'Back',
		backgroundColor: '#13386c',
		barColor: '#13386c'
	});
	
	var rows = [];
	
	var table = Ti.UI.createTableView();
	
	var addRow = function(obj)
	{
			var title = obj.title;
			var src = obj.src;
			var thumb = obj.thumbnail_link;
			var desc = obj.description;
			
			var row = Ti.UI.createTableViewRow({
				height : '60dp',
				hasChild : true,
				thisTitle: title,
				playImg: thumb,
				video: src,
				des: desc
			});
			
			var playImg = Ti.UI.createImageView
			({
				image:thumb,
				width: 50,
				height: 50,
				left: '0dp'
			})

			var maintitle = Ti.UI.createLabel({
				text : (title == '') ? 'Avalanche video' : title,
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '3dp',
				left : '75dp',
				color : 'black',
				font : {
					fontWeight : 'bold',
					fontSize : 14
				}
			});


			var mysub2 = Ti.UI.createLabel({
				text : desc,
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '2dp',
				left : '50dp',
				color : 'black',
				font : {
					fontSize : 17,
					fontWeight: 'bold'
				}
			});
			

			row.add(maintitle);
			row.add(playImg);
			//row.add(mysub2);


			row.className = 'custom_row';
			
			return row;
	};
	
	Ti.App.addEventListener('get.videos', function(obj) {

		var data = JSON.parse(obj.responseText);
			//alert('Hockey Standings');
			//Ti.API.info('My data is..' + hockey);
		


			//myPoints.sort(function(a,b){return a - b;});
			
			rows = [];
			
			for (var i = 0; i < data.length; i++) {
				bgcolor = (i % 2) ? '#fff' : "#ccc";

				row = addRow(data[i]);
				
				row.setBackgroundColor(bgcolor);
				rows.push(row);
			};
			table.setData(rows);

		});
		
	table.addEventListener('click', function(e){
		
		if (osname == 'iphone')
		{
			var playDetail = require('/ui/nhl/videos_view');
			navController.open(new playDetail(navController, e.row.thisTitle, e.row.video, e.row.des));
		} else
		{
			//Ti.Platform.openURL(e.row.video);
			//var playDetail = require('/ui/nhl/videos_view');
			//navController.open(new playDetail(navController, e.row.thisTitle, e.row.video, e.row.des));
			var activeMovie = Titanium.Media.createVideoPlayer({
    	  	  	url : e.row.video,
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
		}

		/* 
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
    	*/
	});
	
	win.add(table);
	
	return win;
}
module.exports = videos;