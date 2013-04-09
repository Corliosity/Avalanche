/**
 * @author Andrew Corliss
 */
function rosterDetail(navController, img, name, num, myData, shots, details)
{
	var osname = Ti.Platform.osname;
	
	var win = Ti.UI.createWindow
	({
		title: name,
		backButtonTitle: 'Roster',
		backgroundColor: 'transparent',
		backgroundImage: 'images/avalanche_team.png',
		barColor: '#13386c'
	});
	
	
	var view = Ti.UI.createScrollView
	({
		contentwidth: 'auto', color: '#000',
		contentHeight: 'auto',
		width: '90%',
		height: '90%',
		showHorizontalScrollIndicator: true,
		backgroundColor: '#fff',
		opacity: 0.75,
		borderRadius: '5px'
	});
	
	Ti.API.info('My Data is ' + details.gp);
	var realName = name.split(' ');
	
	var playImage = Ti.UI.createImageView
	({
		image: "http://www.corliosity.com/json/" + img,
		width: 100,
		height: 150,
		right: '3dp',
		top: '3dp'
	});
	view.add(playImage);
	
	var myLabel = Ti.UI.createLabel
	({
		text: realName[0] + '\n' + realName[1],
		top: '3dp',
		left: '3dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 18
		}
	});
	view.add(myLabel);
	
	var number = Ti.UI.createLabel
	({
		text: num,
		top: '40dp',
		left: '3dp',
		width:'auto',
		color: '#000',
		height: 'auto',
		font:
		{
			fontSize: 15
		}
	});
	view.add(number);
	
	var position = Ti.UI.createLabel
	({
		text: (myData == 'Goaltender') ? 'Position: ' + myData + '\n' + 'Catches: ' + shots : 'Position: ' + myData + '\n' + 'Shoots: ' + shots,
		top: '60dp',
		left: '3dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 15
		}
	});
	view.add(position);
	
	var statistics = Ti.UI.createLabel
	({
		text: "GP",
		top: '155dp',
		left: '3dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	view.add(statistics);
	
	var points =  parseInt(details.goals) + parseInt(details.assist);
	var shotsPer = (parseInt(details.goals) / parseInt(details.shots)) * 100;
	
	// + '     ' + details.goals + '    ' + details.assist + '    ' + points + '     ' + details.pm + '       ' + details.pim + '     ' + details.shots + '   ' + shotsPer.toFixed(1) + '%'
	
	var playerStats = Ti.UI.createLabel
	({
		text: details.gp,
		top: '168dp',
		left: '3dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	view.add(playerStats);
	
	var myGoal = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'S' : 'G',
		top: '155dp',
		left: '35dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerGoals = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.saves : details.goals,
		top: '168dp',
		left: '35dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myAssists = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'SA' : 'A',
		top: '155dp',
		left: '65dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerAssists = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.shots_against : details.assist,
		top: '168dp',
		left: '65dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myPoints = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'S %' : 'P',
		top: '155dp',
		left: '95dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerPoints = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.save_percent : points,
		top: '168dp',
		left: '95dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myPIM = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'Min.' : 'PIM',
		top: '155dp',
		left: '130dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerPIM = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.min : details.pim,
		top: '168dp',
		left: '130dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myPM = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'W' : 'P/M',
		top: '155dp',
		left: (myData == 'Goaltender') ? '175dp' : '163dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerPM = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.wins : details.pm,
		top: '168dp',
		left: (myData == 'Goaltender') ? '175dp' : '165dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myShot = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'L' : 'S',
		top: '155dp',
		left: '195dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerShots = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.losses : details.shots,
		top: '168dp',
		left: '195dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var myShotPer = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? 'OT' : 'S %',
		top: '155dp',
		left: '220dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	var playerShotPer = Ti.UI.createLabel({
		text: (myData == 'Goaltender') ? details.overtime : shotsPer.toFixed(1) + '%',
		top: '168dp',
		left: '222dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font:
		{
			fontSize: 14
		}
	});
	
	if (myData == 'Goaltender')
	{
		
		var myGaa = Ti.UI.createLabel({
			text : "GAA",
			top : '155dp',
			left : '245dp',
			height : 'auto',
			width : 'auto',
			color: '#000',
			font : {
				fontSize : 14
			}
		});

		var playerGaa = Ti.UI.createLabel({
			text : details.gaa,
			top : '168dp',
			left : '245dp',
			height : 'auto',
			width : 'auto',
			color: '#000',
			font : {
				fontSize : 14
			}
		});
		
		view.add(myGaa, playerGaa);
	}
	
	var myNotes = Ti.UI.createLabel({
		text: 'Bio',
		top: '200',
		left: '3dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		}
	});
	
	var playNotes = Ti.UI.createLabel({
		text: details.notes,
		top: '210dp',
		left: '30dp',
		height: 'auto',
		width: 'auto',
		color: '#000',
		font: {
			fontSize: 14
		}
	});
	
	view.add(myAssists, playerAssists, myGoal, playerGoals, myPoints, playerPoints, myPM, playerPM, myPIM, playerPIM, myShot, playerShots, myShotPer, playerShotPer, myNotes, playNotes);
	
	win.add(view);
	
	var cardView = Ti.UI.createImageView
	({
		image: details.bg,
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE
	});
	
	Ti.API.info('Your Card images is at ' + details.bg);
	
	view.addEventListener('touchstart', function(){
		
		
		if (osname == 'iphone' || osname == 'ipad')
		{
			var t1 = Ti.UI.create3DMatrix();
			t1 = t1.rotate(-180, 0, 1, 0);
			t1.m34 = 1.0 / -90;

			var a1 = Ti.UI.createAnimation();
			a1.transform = t1;
			a1.duration = 1000;
			a1.autoreverse = true;
			view.animate(a1);

			Ti.API.info(a1.transform);

			a1.addEventListener('complete', function() {

				win.add(cardView);
				win.remove(view);

			});

		} else
		{
			win.add(cardView);
			win.remove(view);
		}

	});
	
	cardView.addEventListener('touchstart', function(){
		
		
		Ti.API.info('clicked on the card');
		if (osname == 'iphone' || osname == 'ipad')
		{
			var t2 = Ti.UI.create3DMatrix();
			t2 = t2.rotate(180, 0, 1, 0);
			t2.m34 = 1.0 / 90;

			var a2 = Ti.UI.createAnimation();
			a2.transform = t2;
			a2.duration = 1000;
			a2.autoreverse = true;
			cardView.animate(a2);

			a2.addEventListener('complete', function() {
				win.add(view);
				win.remove(cardView);

			});
		} else
		{
			win.add(view);
			win.remove(cardView);
		}

	});
	
	return win;
}
module.exports = rosterDetail;