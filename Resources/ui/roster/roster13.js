/**
 * @author Andrew Corliss
 */
function roster13(navController)
{
	var avs = require('services/roster');
	var current_avs = new avs();
	
	var win = Ti.UI.createWindow({
		title:	'2013 Roster',
		backgroundColor:'transparent',
		barColor: '#13386c',
		layout:	'vertical',
		backButtonTitle: 'Back'
	});
	
	var rows = [];
	
	var table = Ti.UI.createTableView();
	
	var addRow = function(obj)
	{
			var name = obj.player;
			var number = obj.number;
			var pos = obj.position;
			var shot = obj.shoots;
			var stats = obj.season;
			var injuries = obj.injured;
			var image = obj.img;
			Ti.API.info(image);
			
			var row = Ti.UI.createTableViewRow({
				height : '60dp',
				hasChild : true,
				thisTitle: name,
				thisNum: number,
				position: pos,
				shoots: shot,
				stat: stats,
				playImg: image
			});
			
			var playImg = Ti.UI.createImageView
			({
				image:"http://www.corliosity.com/json/" + image,
				height: 50,
				width: 40,
				left: '0dp'
			})

			var maintitle = Ti.UI.createLabel({
				text : name,
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '3dp',
				left : '75dp',
				color : 'black',
				font : {
					fontWeight : 'bold',
					fontSize : 18
				}
			});

			var mysub = Ti.UI.createLabel({
				text : (pos == 'Goaltender') ? pos + ' Catches: ' + shot : pos + '  Shoots: ' + shot,
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '20dp',
				left : '50dp',
				color : 'black',
				font : {
					fontSize : 14
					//fontWeight : 'bold'
				}
			});

			var mysub2 = Ti.UI.createLabel({
				text : number,
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
			
			var mysub3 = Ti.UI.createLabel({
				text : 'Height: ' + obj.height + ' Weight: ' + obj.weight,
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '40dp',
				left : '75dp',
				color : 'black',
				font : {
					fontSize : 14
				}
			});

			var mysub4 = Ti.UI.createLabel({
				text : (injuries === true) ? 'Injured' : '',
				width : 'auto',
				height : 'auto',
				textAlign : 'left',
				top : '20dp',
				left : '240dp',
				color : 'black',
				font : {
					fontSize : 12
				}
			});

			row.add(maintitle);
			row.add(playImg);
			row.add(mysub);
			row.add(mysub2);
			row.add(mysub3);
			row.add(mysub4);

			row.thisTitle = name;
			//row.thisDate = myDate;
			row.thisDetail = number;

			row.className = 'custom_row';
			
			return row;
	};
	
	Ti.App.addEventListener('get.roster', function(obj) {

		var data = JSON.parse(obj.responseText);
			//alert('Hockey Standings');
			//Ti.API.info('My data is..' + hockey);
		


			//myPoints.sort(function(a,b){return a - b;});
			
			var intItem = 0, intItems = data.length, strLastDivision = '', row, rows = [], bgcolor = '';
			
			for ( intItem = 0; intItem < intItems; intItem = intItem + 1) {
				bgcolor = (intItem % 2) ? '#fff' : "#ccc";

				row = addRow(data[intItem]);
				if (strLastDivision != data[intItem].position) {
					strLastDivision = data[intItem].position;
					row.header = data[intItem].position;
				}
				row.setBackgroundColor(bgcolor);
				rows.push(row);
			};
			table.setData(rows);

		});
	
	table.addEventListener('click', function(e){
		
		var playDetail = require('/ui/roster/rosterDetail');
		navController.open(new playDetail(navController, e.row.playImg, e.row.thisTitle, e.row.thisNum, e.row.position, e.row.shoots, e.row.stat));

	});
	
	win.add(table);
	
	return win;
}
module.exports = roster13;