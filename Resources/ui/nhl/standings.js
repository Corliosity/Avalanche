/**
 * @author Andrew Corliss
 */
function standings()
{
	var getStanding = require('services/stands');
	var newStanding = new getStanding();
	
	var osname = Ti.Platform.osname;
	
	var self = Ti.UI.createWindow
	({
		title: 'NHL Standings',
		backButtonTitle: 'Back',
		backgroundColor: '#eaeaea',
		barColor: '#13386c'
	});
	
	var tbl = Ti.UI.createTableView();

			self.add(tbl);
	
	//On Android our Standings table is off?
	//Go back to q+a and ask the code creator what might be happening.
	//Try to leave out images as they appear to be causing problems.

		Ti.App.addEventListener('get.stands', function(d) {

			jsonArray = JSON.parse(d.responseText);

			var hockey = jsonArray;

			//Ti.API.info('My data is..' + hockey);
			/*
			 * else if (a[prop] == b[prop])
					{
						hockey.sort(sortBy('diff'));
					}
			 */

			function sortBy(prop) {
								
				return function(a, b) {
					Ti.API.info('now sorting');
					if (a[prop] > b[prop]) {
						return -1;
					} else if (a[prop] < b[prop]) {
						return 1;
					}
					return 0;
				}
			}
			
			function sortByPoints(prop) {
				
								
				return function(a, b) {
					
					Ti.API.info('Point a is ' + a + ' Point b is ' + b);
					
					if (a[prop] > b[prop]) {
						return -1;
					} else if (a[prop] < b[prop]) {
						return 1;
					} 
					return 0;
				}
			}

			var data = [];

			hockey.sort(sortByPoints('points'));
			//hockey.sort(sortBy('gp'));
			hockey.sort(sortBy('division'));
			hockey.sort(sortBy('conference'));
			var addRow = function(obj) {
				var teamPoint = parseInt(obj.points);
				var row = Ti.UI.createTableViewRow({
					backgroundColor : '#fff',
					//hasChild : true,
					height : '50dp',
					width : Ti.UI.SIZE
				});
				var view = Ti.UI.createView({
					//bottom : '0dp',
					height : Ti.UI.SIZE,
					//layout : 'vertical',
					//left : '10dp',
					//right : '10dp',
					top : 0,
					width : Ti.UI.SIZE
				});
				row.add(view);
				if (obj.conference) {
					view.add(Ti.UI.createLabel({
						color : '#000',
						font : {
							fontSize : 16,
							fontWeight : 'bold'
						},
						height : Ti.UI.SIZE,
						highlightedColor : '#fff',
						left : '50dp',
						top : '0dp',
						text : obj.team,
						width : Ti.UI.FILL
					}));
				}
				if (obj.team) {
					view.add(Ti.UI.createLabel({
						color : '#666',
						font : {
							fontSize : 14
						},
						height : Ti.UI.SIZE,
						highlightedColor : '#ddd',
						left : '50dp',
						top : '20dp',
						text : 'Points: ' + teamPoint.toFixed(0),
						//top: 5,
						width : Ti.UI.FILL
					}), Ti.UI.createLabel({
						color : '#666',
						font : {
							fontSize : 14
						},
						height : Ti.UI.SIZE,
						left : '125dp',
						top : '20dp',
						highlightedColor : '#ddd',
						text : 'W: ' + obj.wins + ' L: ' + obj.losses + ' OT: ' + obj.overtime,
						width : Ti.UI.FILL
					}), Ti.UI.createImageView({
						image : 'http://www.corliosity.com/json/' + obj.img,
						left : '0dp',
						top : '0dp'
					}), Ti.UI.createLabel({
						color : '#666',
						font : {
							fontSize : 14
						},
						height : Ti.UI.SIZE,
						left : '240dp',
						top : '20dp',
						highlightedColor : '#ddd',
						text : 'STK: ' + obj.streak,
						width : Ti.UI.FILL
					}));
				}
				return row;
			};
			var intItem = 0, intItems = hockey.length, strLastDivision = '', row;

			for ( intItem = 0; intItem < intItems; intItem = intItem + 1) {
				var bgcolor = (intItem % 2) ? '#fff' : "#ccc";

				row = addRow(hockey[intItem]);
				if (strLastDivision !== hockey[intItem].division) {
					strLastDivision = hockey[intItem].division;
					row.header = hockey[intItem].division;
				}
				data.push(row);
				row.setBackgroundColor(bgcolor);
			};

			tbl.setData(data);

		});

	return self;
}
module.exports = standings;