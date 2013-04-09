/**
 * @author Andrew Corliss
 */
function twitter(navController)
{
	var osname = Titanium.Platform.osname;

	var Avs = require('services/goavsgo');
	var Win = new Avs();
	
	var self = Ti.UI.createWindow({
		title: 'Follow the Avs',
		backgroundImage: 'images/nhl_bg.png',
		backButtonTitle: 'Back',
		barColor: '#4099FF',
		activity: (osname == 'iphone') ? '' : {
			onCreateOptionsMenu: function(e) {
			    var menu = e.menu;
			    var menuItem = menu.add({ title: "Tweet" });
			    var menuRefresh = menu.add({title: 'Refresh'});
			    //menuItem.setIcon("images/refresh_icon.png");
			    menuItem.addEventListener("click", function(e) {
			    		//Ti.API.info('This is where the Tweets can be composed.');
			    		var tweets = require('ui/tweets/sendTweet');
			    		navController.open(new tweets(navController));
			    		
			    });
			    menuRefresh.addEventListener("click", function(){
			    	
					var Avs = require('services/goavsgo');
					var Win = new Avs(); 

			    });	
			}
		}
	});
	

	function formatDate() {
		var d = new Date;
		var datestr = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
		if (d.getHours() >= 12) {
			datestr += ' ' + (d.getHours() == 12 ? d.getHours() : d.getHours() - 12) + ':' + d.getMinutes() + ' PM';
		} else {
			datestr += ' ' + d.getHours() + ':' + d.getMinutes() + ' AM';
		}
		return datestr;
	}

	
	var data = [];
	
	var table = Ti.UI.createTableView({backgroundColor:'transparent'});
	
	
	var border = Ti.UI.createView({
		backgroundColor : "#eaeaea",
		height : 2,
		bottom : 0
	});

	var tableHeader = Ti.UI.createView({
		backgroundColor : "#eaeaea",
		width : 320,
		height : 60
	});

	var arrow = Ti.UI.createView({
		backgroundImage : "images/whiteArrow.png",
		width : 23,
		height : 60,
		bottom : 10,
		left : 20
	});

	var statusLabel = Ti.UI.createLabel({
		text : "Pull to reload",
		left : 55,
		width : 200,
		bottom : 30,
		height : "auto",
		color : "#000",
		textAlign : "center",
		font : {
			fontSize : 13,
			fontWeight : "bold"
		},
		shadowColor : "#999",
		shadowOffset : {
			x : 0,
			y : 1
		}
	});

	var lastUpdatedLabel = Ti.UI.createLabel({
		text : "Last Updated: " + formatDate(),
		left : 55,
		width : 200,
		bottom : 15,
		height : "auto",
		color : "#000",
		textAlign : "center",
		font : {
			fontSize : 12
		},
		shadowColor : "#999",
		shadowOffset : {
			x : 0,
			y : 1
		}
	});

	var actInd = Titanium.UI.createActivityIndicator({
		left : 20,
		bottom : 13,
		width : 30,
		height : 30
	}); 
	
	tableHeader.add(arrow);
	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);
	
	table.headerPullView = tableHeader;
 
 	//Possible ways to make sure service prints out most recent tweets
 	//Create a function that will contain the for loop.
 	//Call it from the event listener passing in the response.
 	
	
	Ti.App.addEventListener('get.tweets', function(d){
		
		jsonArray = JSON.parse(d.responseText);
		
		var response = jsonArray.results;
		
		Ti.API.info('I am coming into being');
		//Ti.API.info('The twitter response is...' + response);
		//Ti.API.info('Our call response will be...' + jsonArray);
		
		for (var c = 0; c < response.length; c++)
		{
			var tweet = response[c].text;
				var user = response[c].from_user;
				var userId = response[c].from_user_id_str;
				var avatar = response[c].profile_image_url;
				var tweetId = response[c].id_str;
				var tweet_url = response[c].entities.expanded_url;

				//Ti.API.info(tweet_image);
				//Ti.API.info(response.entities[1]);
				//Ti.API.info(response[1].entities.urls.display_url);
				//Ti.API.info(response[c].entities.urls.expanded_url);
				//Ti.API.info(response[c].entities.urls.url);
				//Ti.API.info(response[c].entities.media.url);

				//Add in Table View Details
				var created_at = prettyDate(strtotime(response[c].created_at));
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';
				var andy = (user == "createtheinno") ? '#AD2B4E' : 'transparent';
						
				var row = Ti.UI.createTableViewRow({
					height : 100,
					backgroundColor : andy
				});
				
				// Create a vertical layout view to hold all the info labels and images for each tweet
				var post_view = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:5,
					top:5,
					bottom:5,
					right:5
				});

				var av = Ti.UI.createImageView({
						image:avatar,
						left:0,
						top:0,
						height:48,
						width:48
					});
				// Add the avatar image to the view
				post_view.add(av);

				var user_label = Ti.UI.createLabel({
					text:user,
					left:54,
					width:120,
					top:-48,
					bottom:2,
					height:16,
					textAlign:'left',
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
				});
				// Add the username to the view
				post_view.add(user_label);
				//Add in the Created on Date Label
				var date_label = Ti.UI.createLabel({
					text:created_at,
					right:0,
					top:-18,
					bottom:2,
					height:14,
					textAlign:'right',
					width:110,
					color:'#444444',
					font:{fontFamily:'Trebuchet MS',fontSize:12}
				});
				// Add the date to the view
				post_view.add(date_label);
				
				var tweet_text = Ti.UI.createLabel({
					text:tweet,
					left:54,
					top:0,
					bottom:2,
					height:'auto',
					width:236,
					textAlign:'left',
					font:{fontSize:14},
					color: '#000'
				});
				// Add the tweet to the view
				post_view.add(tweet_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				row.className = 'item'+c;
				//define each element in row
				row.thisTweet = tweet;
				row.thisUser = user;
				row.thisURL = tweet_url;
				row.thisStr = tweetId;
				row.thisImage = avatar;
				row.thisDate = created_at;
				
				data[c] = row;
				
		}
		table.setData(data);

	});
	
	table.addEventListener('click', function(e){
		Ti.API.info(e.row.thisURL);
		var theTweet = require('/ui/tweets/responseTweet');
		navController.open(new theTweet(e.row.thisUser, e.row.thisTweet, e.row.thisImage, e.row.thisDate, e.row.thisStr, navController));
		//Titanium.Platform.openURL('http://twitter.com/'+e.rowData.thisUser+'/status/'+e.rowData.thisStr);
	});
	
	self.add(table);
	
	var r = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
	});
	
	r.addEventListener('click', function(){
		//Ti.API.info('You Can Click Me just Fine');
		var version = Titanium.Platform.version.split('.');
		var major = parseInt(version[0]);
		
  		// add iphone specific tests
  		if (Titanium.Platform.name == 'iPhone OS')
  		{
    		var version = Titanium.Platform.version.split(".");
  	 		var major = parseInt(version[0],10);

    		if (major >= 5)
    		{
     		 	
				var Twitter = require("com.0x82.twitter");
				var composer = Twitter.createTweetComposerView();
				if (composer.canSendTweet()) {
					//alert("Can send tweet");
				} else {
					alert("We cannot send a tweet now");
				}
				var composer = Twitter.createTweetComposerView();
					composer.setInitialText("#GoAvsGo");
						
					composer.addEventListener('complete', function(e) {
						if (e.result == Twitter.DONE)
							alert('Your Tweet has been sent #GoAvsGo');

						if (e.result == Twitter.CANCELLED)
							alert(':(  Sorry we cannot send your tweet now.');
					}); 
					
					composer.open();

    		} else {
    			var myTweets = require('/ui/tweets/sendTweet');
				//Ti.API.info('I can access a new window....' + 	myTweets);
				navController.open(new myTweets(navController));
    		}
  		}

	});
	
	(osname == 'android') ? '' : self.setRightNavButton(r);
	
	if (osname == 'iphone' || osname == 'ipad')
	{
	
		table.addEventListener('scroll', function(e) {

			Ti.API.info('Starting the listener');

			var offset = e.contentOffset.y;
			if (offset <= -65.0 && !pulling) {

				var t = Ti.UI.create2DMatrix();

				t = t.rotate(-180);
				pulling = true;
				arrow.animate({
					transform : t,
					duration : 180
				});

				statusLabel.text = "Release to refresh...";

			} else if (pulling && offset > -65.0 && offset < 0) {
				pulling = false;
				var t = Ti.UI.create2DMatrix();

				arrow.animate({
					transform : t,
					duration : 180
				});

				statusLabel.text = "Pull down to refresh...";
			}

		});

		table.addEventListener('scrollEnd', function(e) {

			Ti.API.info('Ending the event');
			var Avs = require('services/goavsgo');
			var Win = new Avs();

			if (pulling && !reloading && e.contentOffset.y <= -65.0) {

				reloading = true;
				pulling = false;
				arrow.hide();
				actInd.show();
				statusLabel.text = "Reloading...";

				table.setContentInsets({
					top : 60
				}, {
					animated : true
				});

				arrow.transform = Ti.UI.create2DMatrix();
				beginReloading();
			}
		});

		var pulling = false;
		var reloading = false;

		function beginReloading() {
			// just mock out the reload

			setTimeout(endReloading, 2000);

		}

		function endReloading() {
			// simulate loading

			/*
			for (var c = lastRow; c < lastRow + 10; c++) {
			table.appendRow({
			title : "Row " + c
			});
			}
			*/

			// when you're done, just reset
			table.setContentInsets({
				top : 0
			}, {
				animated : true
			});
			reloading = false;
			lastUpdatedLabel.text = "Last Updated: " + formatDate();
			statusLabel.text = "Pull down to refresh...";
			actInd.hide();
			arrow.show();
		}

	}
	
	
	return self;
}

//Create functions for converting times
function strtotime(str, now) {
		// Emlulates the PHP strtotime function in JavaScript
		// obtained from http://phpjs.org/functions/strtotime:554
		var i, match, s, strTmp = '', parse = '';
		strTmp = str;
		strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' ');
		// unecessary spaces
		strTmp = strTmp.replace(/[\t\r\n]/g, '');
		// unecessary chars
		if (strTmp == 'now') {
			return (new Date()).getTime() / 1000;
			// Return seconds, not milli-seconds
		} else if (!isNaN( parse = Date.parse(strTmp))) {
			return (parse / 1000);
		} else if (now) {
			now = new Date(now * 1000);
			// Accept PHP-style seconds
		} else {
			now = new Date();
		}
		strTmp = strTmp.toLowerCase();
		var __is = {
			day : {
				'sun' : 0,
				'mon' : 1,
				'tue' : 2,
				'wed' : 3,
				'thu' : 4,
				'fri' : 5,
				'sat' : 6
			},
			mon : {
				'jan' : 0,
				'feb' : 1,
				'mar' : 2,
				'apr' : 3,
				'may' : 4,
				'jun' : 5,
				'jul' : 6,
				'aug' : 7,
				'sep' : 8,
				'oct' : 9,
				'nov' : 10,
				'dec' : 11
			}
		};
		var process = function(m) {
			var ago = (m[2] && m[2] == 'ago');
			var num = ( num = m[0] == 'last' ? -1 : 1) * ( ago ? -1 : 1);

			switch (m[0]) {
				case 'last':
				case 'next':
					switch (m[1].substring(0, 3)) {
						case 'yea':
							now.setFullYear(now.getFullYear() + num);
							break;
						case 'mon':
							now.setMonth(now.getMonth() + num);
							break;
						case 'wee':
							now.setDate(now.getDate() + (num * 7));
							break;
						case 'day':
							now.setDate(now.getDate() + num);
							break;
						case 'hou':
							now.setHours(now.getHours() + num);
							break;
						case 'min':
							now.setMinutes(now.getMinutes() + num);
							break;
						case 'sec':
							now.setSeconds(now.getSeconds() + num);
							break;
						default:
							var day;
							if ( typeof ( day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
								var diff = day - now.getDay();
								if (diff == 0) {
									diff = 7 * num;
								} else if (diff > 0) {
									if (m[0] == 'last') {
										diff -= 7;
									}
								} else {
									if (m[0] == 'next') {
										diff += 7;
									}
								}
								now.setDate(now.getDate() + diff);
							}
					}
					break;
				default:
					if (/\d+/.test(m[0])) {
						num *= parseInt(m[0], 10);
						switch (m[1].substring(0, 3)) {
							case 'yea':
								now.setFullYear(now.getFullYear() + num);
								break;
							case 'mon':
								now.setMonth(now.getMonth() + num);
								break;
							case 'wee':
								now.setDate(now.getDate() + (num * 7));
								break;
							case 'day':
								now.setDate(now.getDate() + num);
								break;
							case 'hou':
								now.setHours(now.getHours() + num);
								break;
							case 'min':
								now.setMinutes(now.getMinutes() + num);
								break;
							case 'sec':
								now.setSeconds(now.getSeconds() + num);
								break;
						}
					} else {
						return false;
					}
					break;
			}
			return true;
		};
		match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
		if (match != null) {
			if (!match[2]) {
				match[2] = '00:00:00';
			} else if (!match[3]) {
				match[2] += ':00';
			}
			s = match[1].split(/-/g);
			for (i in __is.mon) {
				if (__is.mon[i] == s[1] - 1) {
					s[1] = i;
				}
			}
			s[0] = parseInt(s[0], 10);
			s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
			return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
		}

		var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';
		match = strTmp.match(new RegExp(regex, 'gi'));
		// Brett: seems should be case insensitive per docs, so added 'i'
		if (match == null) {
			return false;
		}
		for ( i = 0; i < match.length; i++) {
			if (!process(match[i].split(' '))) {
				return false;
			}
		}
		return (now.getTime() / 1000);
	}

	// creates a 'pretty date' from a unix time stamp
	function prettyDate(time) {
		var monthname = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var date = new Date(time * 1000), diff = (((new Date()).getTime() - date.getTime()) / 1000), day_diff = Math.floor(diff / 86400);
		if (isNaN(day_diff) || day_diff < 0) {
			return '';
		}
		if (day_diff >= 31) {
			var date_year = date.getFullYear();
			var month_name = monthname[date.getMonth()];
			var date_month = date.getMonth() + 1;
			if (date_month < 10) {
				date_month = "0" + date_month;
			}
			var date_monthday = date.getDate();
			if (date_monthday < 10) {
				date_monthday = "0" + date_monthday;
			}
			return date_monthday + " " + month_name + " " + date_year;
		}
		return day_diff == 0 && (diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && "about " + Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " week" + ((Math.ceil(day_diff / 7)) == 1 ? "" : "s") + " ago";
	}

module.exports = twitter;