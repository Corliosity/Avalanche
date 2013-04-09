function TestWindow(navController) {
	
	var osname = Ti.Platform.osname;
		
	var theGame = require('services/games');
	var nextGame = new theGame();
	
	var theWidth = '120dp';
	var toRight = '15dp';
	var toHeight = '75dp';
	var myColor = '#eaeaea';

	var win = Ti.UI.createWindow({
		title:'Avalanche Hockey',
		backgroundImage: 'images/bg.png',
		backgroundColor:'#eaeaea',
		navBarHidden: true
		//layout:'horizontal'
	});
	
	var header = Ti.UI.createImageView({
		image: 'images/header.png',
		top:'3dp'
	});
	win.add(header);
	
	var nextLabel = Ti.UI.createLabel({
		text: 'The Next Avalanche Game is: ',
		top: (osname == 'android') ? '65dp' : '60dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		color: '#000'
	});
	
	win.add(nextLabel);
	
	var loading = false;
	
	Ti.App.addEventListener('get.events', function(d){
		
		jsonArray = JSON.parse(d.responseText);
		
		var game = jsonArray;
		
		for (var i = 0; i < game.length; i++)
		{
			if (loading === false)
			{
			var gamesTime;
			if (game[i].time === undefined)
			{
				gamesTime = '7:00 PM';
			} else
			{
				gamesTime = game[i].time;
			}
			
			Ti.API.info('The Game Time is ....' + game[i].date);
			
			var gamesSplit = gamesTime.split(':');
				
			var myDay = new Date();
			//Ti.API.info('My day is...' + myDay);
			var offSet = new Date().getTimezoneOffset()/60;
			
			var start = game[i].date;
			var splitStart = start.replace(/T00:00:00/g, '');
			var startDate = splitStart.replace(/-/g, '/');
			
			var x = startDate.split('/');
			
			var a = new Date(x[0],(x[1]-1),x[2]);
			
			var yearTime = myDay.getFullYear();
			var dayTime = myDay.getDate();
			var monthTime = myDay.getMonth();
			var newMonth = myDay.getMonth() + 1;
			
			var theMonth = (newMonth < 10) ? '0' + newMonth : newMonth;
			var ourDay = yearTime + '/' + theMonth + '/' + dayTime;
			
			var tDay = new Date(yearTime, monthTime, dayTime);
			var endDay = new Date(yearTime, monthTime, dayTime + 2);
			
			var hh = myDay.getHours();
			var m = myDay.getMinutes();
			//Ti.API.info('The current hour is..' + hour);
			var myTime = parseInt(gamesSplit[0]);
			
			//Ti.API.info('My time zone is ' + offSet);

			if (myTime <= 12)
			{
				myTime = parseInt(gamesSplit[0]) + 12;
			}
			
			var theDisplay = x[1] + '/' + x[2];
			//Ti.API.info('The Time is now ' + hh + ' Our game start will be ' + myTime);
			//Ti.API.info('My new variable is ' + repalcement);
			//Ti.API.info('My game day is...' + a);
			//Ti.API.info('Here are the games ' + startDate + ' And our day is ' + ourDay);
			if (ourDay == startDate)
			{
				//Ti.API.info('Printing out today\'s Game and logos...' + game[i].myhome + ' Starting at ' + game[i].time);
				//Ti.API.info('our game time is ' +myTime);
				
				var awayImage = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + game[i].away,
					height: 50,
					width: 50,
					top: '100dp',
					left: '3dp'
				});
				win.add(awayImage);
				
				var dayLabel = Ti.UI.createLabel({
					text: game[i].time,
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
					top: '80dp',
					color: 'black'
				});
				
				win.add(dayLabel);
				
				var gameLabel = Ti.UI.createLabel({
					text: game[i].game,
					height: Ti.UI.SIZE,
					width: '200dp',
					top: '100dp',
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color: '#000'
				});
				
				win.add(gameLabel);
				
				var gameTime = Ti.UI.createLabel({
					text: game[i].score,
					height: Ti.UI.SIZE,
					width: '100dp',
					top: '120dp',
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					color: '#000',
					font: (hh >= gamesSplit[0]) ? {fontWeight: 'bold', fontSize: 18} : ''
				});
				win.add(gameTime);
				
				var homeImage = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + game[i].myhome,
					height: 50,
					width: 50,
					top: '100dp',
					right: '3dp'
				});
				win.add(homeImage);
				
				loading = true;
				
				nextLabel.setText('Today\'s Game begins at:');
				
				setTimeout(function(){
					var theGame = require('services/games');
					var nextGame = new theGame();
					Ti.API.info('Calling up the web service');
					
					gameTime.setText('');
					gameLabel.setText('');
					dayLabel.setText('');
				}, 30000);
				
			}
			else if (tDay <= a && a <= endDay)
			{
				Ti.API.info('Printing out today\'s Game and logos...' + game[i].myhome);
				//Throw date a into a sort function to return the next game.
				//Ti.API.info('is myDay..' + myDay + ' greater than your day...' + a);
				var awayImage = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + game[i].away,
					height: 50,
					width: 50,
					top: '100dp',
					left: '3dp'
				});
				win.add(awayImage);
				
				var dayLabel = Ti.UI.createLabel({
					text: theDisplay,
					height: Ti.UI.SIZE,
					width: Ti.UI.SIZE,
					top: '80dp',
					color: 'black',
				});
				
				win.add(dayLabel);
				
				var gameLabel = Ti.UI.createLabel({
					text: game[i].game,
					height: Ti.UI.SIZE,
					width: '200dp',
					top: '100dp',
					color: 'black',
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
				});
				
				win.add(gameLabel);
				
				var gameTime = Ti.UI.createLabel({
					text: game[i].time,
					height: Ti.UI.SIZE,
					width: '100dp',
					top: '120dp',
					color: 'black',
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
				});
				win.add(gameTime);
				
				var homeImage = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + game[i].myhome,
					height: 50,
					width: 50,
					top: '100dp',
					right: '3dp'
				});
				win.add(homeImage);
				
				loading = true;
			}
			
			}
		}
		
	});
	
	var myWindow = function(e)
	{
		//Ti.API.info(e.source.myId);
		var theWindow = require(e.source.myId);
		//Ti.API.info('I will call a new window...' + theWindow);
		navController.open(new theWindow(navController));
	};
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: (osname == 'android') ? '700dp' : '650dp',
		contentHeight:'30dp',
		top:'165dp',
		height:30,
		width:'350dp',
		//borderRadius:10,
		borderColor: '#000',
		backgroundColor:'#13386c',
		scrollType: 'horizontal'
	});
	
	win.add(scrollView);
	
	var view1 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'10dp'
	});
	scrollView.add(view1);
	var l1 = Ti.UI.createLabel({
		text:'Roster',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		//textAlign:'center',
		height:'auto',
		myId: '/ui/roster/roster13'
	});
	view1.add(l1);
	l1.addEventListener('click', myWindow);
	
	var view2 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'90dp'
	});
	scrollView.add(view2);
	var l2 = Ti.UI.createLabel({
		text:'Avs News',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		//textAlign:'center',
		height:'auto',
		myId: (osname == 'iphone') ? '/ui/handheld/ios/ApplicationWindow' : '/ui/handheld/android/ApplicationWindow'
	});
	view2.add(l2);
	l2.addEventListener('click', myWindow);
	
	var view3 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'180dp'
	});
	scrollView.add(view3);
	
	var l3 = Ti.UI.createLabel({
		text:'NHL News',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		//textAlign:'center',
		height:'auto',
		myId: (osname == 'iphone') ? '/ui/nhlHandheld/ios/ApplicationWindow' : '/ui/nhlHandheld/android/ApplicationWindow'
	});
	view3.add(l3);
	l3.addEventListener('click', myWindow);
	
	var view4 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'265dp'
	});
	scrollView.add(view4);
	
	var l4 = Ti.UI.createLabel({
		text:'Schedule',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		//textAlign:'center',
		height:'auto',
		myId: (osname == 'iphone') ? '/ui/schedule/games13' : '/ui/schedule/androidGames'
	});
	view4.add(l4);
	l4.addEventListener('click', myWindow);
	
	var view5 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'350dp'
	});
	scrollView.add(view5);
	
	var l5 = Ti.UI.createLabel({
		text:'Standings',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		//textAlign:'center',
		height:'auto',
		myId: '/ui/nhl/androidStandings'
	});
	view5.add(l5);
	l5.addEventListener('click', myWindow);
	
	var view6 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'425dp'
	});
	scrollView.add(view6);
	
	var l6 = Ti.UI.createLabel({
		text:'Shop',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		textAlign:'center',
		height:'auto',
		myId: '/ui/common/shop'
	});
	view6.add(l6);
	l6.addEventListener('click', myWindow);
	
	var view7 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'490dp'
	});
	scrollView.add(view7);
	
	var l7 = Ti.UI.createLabel({
		text:'Twitter',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		textAlign:'center',
		height:'auto',
		myId:'/ui/tweets/twitter'
	});
	view7.add(l7);
	l7.addEventListener('click', myWindow);
	
	var view8 = Ti.UI.createView({
		//backgroundColor:'#336699',
		//borderRadius:0,borderWidth:1,borderColor:'#336699',
		top: 0,
		width:80,
		height:30,
		left:'550dp'
	});
	scrollView.add(view8);
	
	var l8 = Ti.UI.createLabel({
		text:'Videos',
		font:{fontSize:16},
		color:'#fff',
		width:'auto',
		textAlign:'center',
		height:'auto',
		myId:'/ui/nhl/videos'
	});
	view8.add(l8);
	l8.addEventListener('click', myWindow);
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth: 'auto',
		contentHeight: '400dp',
		showVerticalScrollIndicator: true,
		top: '205dp',
		width: '100%'
	});
	//instantiate and begin call for rss feed
	var rss = require('services/rss');
	//Create function to get the latest rss feed
	function refreshRSS() {
		
		Ti.API.info('Running Function');
		var loadOnce = false;
		
		rss.loadRssFeed({
			success: function(data) {
	    		if (Object.prototype.toString.apply(data) === '[object Array]') {
					//var rows = [];
					
					for (var i = 0; i < data.length; i++) {
					if (loadOnce === false)
					{
						Ti.API.info(data[0].image);
						
						var label = Ti.UI.createLabel({
							text: data[0].title,
							top: '0dp',
							width: Ti.UI.FILL,
							height: 'auto',
							left: '3dp',
							color: '#000'
						});
						
						var myImage = Ti.UI.createImageView({
							image: data[0].image,
							height: 100,
							width: 250,
							top: '30dp'
						});
						
						var myText = Ti.UI.createTextArea({
							value: data[0].descript,
							editable: false,
							top: '140dp',
							height: 'auto',
							width: 'auto',
							font: {
								fontSize: 14
							},
							backgroundColor: 'transparent',
							color: '#000'
						});
						scrollView.add(label);
						scrollView.add(myImage);
						scrollView.add(myText);
						
						loadOnce = true;
					}
					}
				}
	    	}
		});
	};
	//Load feed up
	refreshRSS();
	win.add(scrollView);
	/*
	var view7 = Ti.UI.createView({
		backgroundColor:'#336699',
		borderRadius:20,borderWidth:1,borderColor:'#336699',
		width:40,
		height:30,
		left:310
	});
	scrollView.add(view7);
	
	var l7 = Ti.UI.createLabel({
		text:'7',
		font:{fontSize:13},
		color:'#fff',
		width:'auto',
		textAlign:'center',
		height:'auto'
	});
	view7.add(l7);
	
	var view8 = Ti.UI.createView({
		backgroundColor:'#336699',
		borderRadius:20,borderWidth:1,borderColor:'#336699',
		width:40,
		height:30,
		left:360
	});
	scrollView.add(view8);
	
	var l8 = Ti.UI.createLabel({
		text:'8',
		font:{fontSize:13},
		color:'#fff',
		width:'auto',
		textAlign:'center',
		height:'auto'
	});
	view8.add(l8);

	var team = Ti.UI.createButton({
		//title: 'Avs\nRoster',
		height: toHeight,
		width: theWidth,
		top: '110dp',
		left: toRight,
		myId: '/ui/roster/roster13',
		backgroundImage: 'images/roster.png'
	});
	var teamLabel = Ti.UI.createLabel({
		text: 'Avalanche Roster',
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold',
			fontSize: 16
		},
		color: myColor
	});
	team.add(teamLabel);
	team.addEventListener('click', myWindow);
	win.add(team);
	
	var cal = Ti.UI.createButton({
		title: 'Schedule',
		height: toHeight,
		width: theWidth,
		top: '110dp',
		right: toRight,
		myId: '/ui/schedule/games13',
		color: myColor,
		backgroundImage: 'images/sched.png'
	});
	
	cal.addEventListener('click', myWindow);
	
	win.add(cal);
	
	var standing = Ti.UI.createButton({
		title: 'Standings',
		height:	toHeight,
		width: theWidth,
		top:	'195dp',
		left: toRight,
		myId:	'/ui/nhl/standings',
		color: myColor,
		backgroundImage: 'images/standings.png',
		font: {
			fontWeight: 'bold'
		}
	});
	
	standing.addEventListener('click', myWindow);
	
	win.add(standing);
	
	var avNews = Ti.UI.createButton({
		//title: 'Avalanche\nNews',
		height: toHeight,
		width:	theWidth,
		top:	'195dp',
		right: toRight,
		myId: (osname == 'iphone') ? '/ui/handheld/ios/ApplicationWindow' : '/ui/handheld/android/ApplicationWindow',
		backgroundImage: 'images/news.png'
	});
	var avNewsLabel = Ti.UI.createLabel({
		text: 'Avalanche News',
		height: Ti.UI.SIZE,
		width: '75dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold'
		},
		color: myColor
	});
	avNews.add(avNewsLabel);
	
	avNews.addEventListener('click', myWindow);
	
	win.add(avNews);
	
	var vids = Ti.UI.createButton({
		//title: label,//'The Locker Room',
		height: toHeight,
		width:	theWidth,
		top:	'275dp',
		left: toRight,
		myId: (osname == 'iphone') ? '/ui/nhlHandheld/ios/ApplicationWindow' : '/ui/nhlHandheld/android/ApplicationWindow',
		backgroundImage: 'images/locker_room.png'

	});
	
	var label = Ti.UI.createLabel({
		text: 'The Locker Room',
		height: Ti.UI.SIZE,
		width: '45dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontWeight: 'bold'
		},
		color: myColor
	});
	vids.add(label);
	vids.addEventListener('click', myWindow);
	
	win.add(vids);
	
	var shop = Ti.UI.createButton
	({
		title: 'Shop',
		height: toHeight,
		width: theWidth,
		top: '275dp',
		right: toRight,
		myId: '/ui/common/shop',
		color: myColor,
		backgroundImage: 'images/shopping.png'
	});
	
	shop.addEventListener('click', myWindow);
	
	win.add(shop);
	
	var follow = Ti.UI.createButton
	({
		title: 'Follow',
		height: '50dp',
		width: '55dp',
		bottom: '5dp',
		myId: '/ui/tweets/twitter',
		color: myColor,
		backgroundImage: 'images/twitter.png'
	});
	
	follow.addEventListener('click', myWindow);
	
	win.add(follow);

	var add = Ti.UI.createButton({
		title:'Add A New Window',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	add.addEventListener('click', function() {
		navController.open(new TestWindow(navController));
	});
	win.add(add);

	var home = Ti.UI.createButton({
		title:'Go to the Home Window',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	home.addEventListener('click', function() {
		navController.home();
	});
	win.add(home);
	
	var addfh = Ti.UI.createButton({
		title:'Open New From Home',
		height:'50dp',
		width:'200dp',
		top:'20dp'
	});
	addfh.addEventListener('click', function() {
		navController.openFromHome(new TestWindow(navController));
	});
	win.add(addfh);
	*/
	return win;
};

module.exports = TestWindow;