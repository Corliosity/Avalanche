/**
 * @author Andrew Corliss
 */
function androidStandings(navController)
{
	var win = Ti.UI.createWindow({
		title: 'NHL Standings',
		backgroundImage: 'images/nhl_bg.png',
		backgroundColor: 'transparent',
		barColor: '#13386c',
		backButtonTitle: 'Back'
	});
	
	
	var begin = require('services/stands');
	var events = new begin();
	
	var tbl = Ti.UI.createTableView();
	
	win.add(tbl);

	//alert('Loading current Standings');
	
	var addRow = function(obj) {
				var teamPoint = parseInt(obj.points);
				var row = Ti.UI.createTableViewRow({
					backgroundColor : '#fff',
					//hasChild : true,
					height : '50dp',
					width : Ti.UI.SIZE
				});
				
				var myTeam = Ti.UI.createLabel({
					color : '#000',
					font : {
						fontSize : 16,
						fontWeight : 'bold'
					},
					height : Ti.UI.SIZE,
					highlightedColor : '#fff',
					left : '55dp',
					top : '0dp',
					text : obj.team,
					width : Ti.UI.SIZE
				});
				
				var teamPoints = Ti.UI.createLabel({
					color : '#666',
					font : {
						fontSize : 14
					},
					height : Ti.UI.SIZE,
					highlightedColor : '#ddd',
					left : '55dp',
					top : '20dp',
					text : 'Points: ' + teamPoint.toFixed(0),
					//top: 5,
					width : Ti.UI.SIZE
				});
				
				var teamImage = Ti.UI.createImageView({
						image : 'http://www.corliosity.com/json/' + obj.img,
						left : '0dp',
						top : '0dp',
						height: 50,
						width: 50
				});
				
				var teamGames = Ti.UI.createLabel({
						color : '#666',
						font : {
							fontSize : 14
						},
						height : Ti.UI.SIZE,
						left : '125dp',
						top : '20dp',
						highlightedColor : '#ddd',
						text : 'W: ' + obj.wins + ' L: ' + obj.losses + ' OT: ' + obj.overtime,
						width : Ti.UI.SIZE
				});
				
				var teamStreak = Ti.UI.createLabel({
						color : '#666',
						font : {
							fontSize : 14
						},
						height : Ti.UI.SIZE,
						left : '240dp',
						top : '20dp',
						highlightedColor : '#ddd',
						text : 'STK: ' + obj.streak,
						width : Ti.UI.SIZE
				});

						row.add(myTeam);
						row.add(teamPoints);
						row.add(teamImage);
						row.add(teamGames);
						row.add(teamStreak);
				return row;
			};
			
		
	
	Ti.App.addEventListener('get.sortedStands', function(obj) {

		var data = JSON.parse(obj.data);
			//alert('Hockey Standings');
			//Ti.API.info('My data is..' + hockey);
		


			//myPoints.sort(function(a,b){return a - b;});
			
			var intItem = 0, intItems = data.length, strLastDivision = '', row, rows = [], bgcolor = '';
			
			for ( intItem = 0; intItem < intItems; intItem = intItem + 1) {
				bgcolor = (intItem % 2) ? '#fff' : "#ccc";

				row = addRow(data[intItem]);
				if (strLastDivision != data[intItem].division) {
					strLastDivision = data[intItem].division;
					row.header = data[intItem].division;
				}
				row.setBackgroundColor(bgcolor);
				rows.push(row);
			};
			tbl.setData(rows);

		});
		
		
	Ti.App.addEventListener('get.stands', function(d) {

		//jsonArray = JSON.stringify(d.responseText);
		var hockey = JSON.parse(d.responseText);
		
		function sortBy(prop) {
				
				return function(a, b) {
					Ti.API.info(a[prop] + '  is A and B is  ' + b[prop]);
					if (a[prop] > b[prop]) {
						return -1;
					} else if (a[prop] < b[prop]) {
						return 1;
					}
					return 0;
				}

			}

		//hockey.sort(sortBy('points'));
		//hockey.sort(sortBy('division'));
		//hockey.sort(sortBy('conference'));

		Ti.App.fireEvent('get.sortedStands', {
			data : JSON.stringify(hockey)
		});

	}); 

	
	return win;
}
module.exports = androidStandings;