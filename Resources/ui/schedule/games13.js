/**
 * @author Andrew Corliss
 */
function games13(navController)
{
	var osname = Ti.Platform.osname;
	
	var win = Ti.UI.createWindow({
		title : 'Schedule',
		backgroundColor : '#eaeaea',
		barColor: '#13386c',
		navBarHidden : (osname === 'ipad' || osname == 'iphone' )? false : true,
		layout : 'vertical',
		backButtonTitle: 'Back'
	});
	
	//have two data sources set to empty to keep a change between the data
	var Newsdata = [];
	
	var contianerNewMonth;
	var containerEndMonth;
	
	//We are getting a parse error at line 834 - does not exist
	
	//Figure out why we are getting an error on the schedule.
	//First try to leave our our custom date methods.
	
	Ti.API.info('What are the above variables equal to  ' + contianerNewMonth);

	var tableview = Ti.UI.createTableView({
		top : '0dp',
		allowsSelection : true,
		separatorColor: '#CCC'
	});
	

	//Loading indicator
	var actInd = Titanium.UI.createActivityIndicator({
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 18,
			fontWeight : 'bold'
		},
		color : 'Black',
		message : 'Loading...',
		width : 'auto',
		zIndex : 1000,
		bottom : 0
	});
	
	if (Ti.Platform.osname === "ipad" || Ti.Platform.osname == "iphone"){
		actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else{
		actInd.style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
	}

	tableview.add(actInd);
	actInd.show();
	
	//Link to our service
	begin = require('services/games');
	events = new begin();
	
	//define month firstDay and lastDay variables so we can change these later
	var firstDay;
	var lastDay;
	
	//Find out the current date.
	today = new Date();
	DD = today.getDate();
	MM = today.getMonth() + 1;
	YYYY = today.getFullYear();

	//Ti.API.info('Acording to JavaScript the month is ' + MM);

	if (DD < 10) {
		DD = '0' + DD;
	}
	if (MM < 10) {
		MM = '0' + MM;
	}
	var today = MM + '/' + DD + '/' + YYYY;
	var myDay = MM + '/' + DD;
	
	lastDay = new Date(YYYY, MM, 0);
	
	firstDay = new Date(YYYY, MM - 1, 1);
	
	Ti.API.info("The first day of the Month " + firstDay + ' And our last day is....' + lastDay);

	months_stack = new Array();
	days_stack = new Array();
	var first_called = false;
	
	function getWeekDay(date){
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		
		return weekday[date.getDay()];
	}
	
	// Tool Bar - View which contain Title Prev. &amp; Next Button
	var view = Ti.UI.createView({
		top : '0dp',
		width : '100%',
		height : '45dp'
	}); 
	
	
	var monthLabel = Ti.UI.createLabel({
		text: myMonthString(MM),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: 20,
			fontWeight: 'bold'
		},
		width: Ti.UI.FILL
	});
	
	var next_month = Ti.UI.createButton({
		//backgroundColor : '#eaeaea',
		borderWidth: 0,
		color : '#000',
		top: '2dp',
		title : '>',
		right : '5dp',
		backgroundColor: 'transparent',
		font: {
			fontSize: 20,
			fontWeight: 'bold'
		}
	});
	var prev_month = Ti.UI.createButton({
		//backgroundColor : '#eaeaea',
		borderWidth: 0,
		color : '#000',
		title : '<',
		left : '5dp',
		top: '2dp',
		backgroundColor: 'transparent',
		font: {
			fontSize: 20,
			fontWeight: 'bold'
		}
	}); 
	
	
	if (osname == 'iphone' || osname == 'ipad') {
		view.add(prev_month);
		view.add(monthLabel);
		view.add(next_month);

		win.add(view);
	}

	win.add(tableview);
	
	function addRowToCalendar(element){
		
		//split the date to create an array of values
		var new_date = element.date.getFullYear() + "/" + (element.date.getMonth() + 1) + "/" + element.date.getDate();
		var dates = new_date.split('/');
		var RealMonth = dates[1];
		var RealYear = dates[0];
		var RealDay = dates[2];
		
		//Ti.API.info(new_date);

		var byMonth = dates[1] + '/' + dates[2];
		
		//Ti.API.info('Our Month and day are..... ' + byMonth);

		var RealDate = dates[1] + '/' + dates[2] + '/' + dates[0];

		var _city = element.city;
		var _state = element.state;
		var _type = element.type;
					
		var title = element.title;
		var myDate = RealDate;
		//var detail = '';
		//Ti.API.info('My Details are Score ' + _type + ' Team Standing ' + _state + ' Avs Standing ' + _city);
		
		var javaDate = YYYY + '/' + MM + '/' + DD;

		var trueDate = new Date(javaDate);

		var week = new Date(trueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
		var rans = week.toString();
		var theTime = rans.split(" ");
		var trueMonth = month(theTime[1]);

		var weekEnd = trueMonth + '/' + theTime[2] + '/' + theTime[3];
		//Ti.API.info(weekEnd);
		//flag_repeated_day = false;
				
		//Ti.API.info("Month First Day  " + new Date(firstDay) + ' Our API Dates....' + element.date);
		
		//Ti.API.info('In the function our firstDay is...' + new Date(firstDay) + ' and our first game of the month is....' + element.date);

		//if (RealYear == YYYY) {
			//Code from Joseandro to return all days and following months
			//|| ( (new Date().getDay() === element.date.getDay()) && (new Date().getMonth() === element.date.getMonth()) && (new Date().getYear() === element.date.getYear())  ) 
			//
			if ( new Date(firstDay) <= element.date && element.date <= new Date(lastDay) )
			{
				//Once our API matured create BOOL property for game results set inline if/else for hasChild element
				/*
				if (osname == 'android')
				{
					if (months_stack.indexOf(RealMonth) === -1) {

					var _row = Ti.UI.createTableViewRow({
						height : '40dp',
						hasChild : false
					});

					var month_nav = Ti.UI.createLabel({
						height : '40dp',
						backgroundColor : '#333',
						color : '#eaeaea',
						width : '100%',
						textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
						font : {
							fontSize : 16,
							fontWeight : 'bold'
						},
						text : getMonthString(RealMonth)
					});

					_row.add(month_nav);
					Newsdata.push(_row);

					//Push it to the top of the stack of flags
					months_stack.push(RealMonth);
				} //end android branching
				*/
				var row = Ti.UI.createTableViewRow({
					height : '90dp',
					hasChild : false,
					//layout: 'vertical',
					backgroundColor: (element.home == 'true') ? '#9F1D35' : ''
				});

				if (days_stack.indexOf(myDate) === -1) {
					var container = Ti.UI.createView({
						//width : '100%',
						height : '20dp',
						top : 0,
						left : 0,
						right : 0,
						backgroundColor : '#CCC'
					});
					
					if (Ti.Platform.osname === "android"){
						container.width = '100%';
					}
					else{
						container.zIndex = 1000;
					}
					//Ti.API.info(getMonthString(RealMonth) + " " + RealDay + ", " + RealYear);

					var maintitle = Ti.UI.createLabel({
						text : getMonthString(RealMonth) + " " + RealDay + ", " + RealYear,
						width : 'auto',
						height : 'auto',
						textAlign : 'right',
						top : 0,
						right : '10dp',
						color : '#444',
						font : {
							fontWeight : 'bold',
							fontSize : '16dp'
						},
						verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
					});

					var weekTitle = Ti.UI.createLabel({
						text : getWeekDay(element.date),
						width : 'auto',
						height : 'auto',
						textAlign : 'left',
						top : 0,
						left : '10dp',
						color : '#444',
						font : {
							fontWeight : 'bold',
							fontSize : '16dp'
						},
						verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
					});

					container.add(maintitle);
					container.add(weekTitle);
					row.add(container);
					days_stack.push(myDate);
					
				} else {
					//flag_repeated_day = true;
					//row.height = "80dp";
					
					var container = Ti.UI.createView({
						//width : '100%',
						height : '20dp',
						top : 0,
						left : 0,
						right : 0,
						backgroundColor : '#CCC'
					});
					
					if (Ti.Platform.osname === "android"){
						container.width = '100%';
					}
					else{
						container.zIndex = 1000;
					}
					//Ti.API.info(getMonthString(RealMonth) + " " + RealDay + ", " + RealYear);

					var maintitle = Ti.UI.createLabel({
						text : getMonthString(RealMonth) + " " + RealDay + ", " + RealYear,
						width : 'auto',
						height : 'auto',
						textAlign : 'right',
						top : 0,
						right : '10dp',
						color : '#444',
						font : {
							fontWeight : 'bold',
							fontSize : '16dp'
						},
						verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
					});

					var weekTitle = Ti.UI.createLabel({
						text : getWeekDay(element.date),
						width : 'auto',
						height : 'auto',
						textAlign : 'left',
						top : 0,
						left : '10dp',
						color : '#444',
						font : {
							fontWeight : 'bold',
							fontSize : '16dp'
						},
						verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
					});

					container.add(maintitle);
					container.add(weekTitle);
					row.add(container);
					days_stack.push(myDate);
				}
				
				var awayLogo = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + element.away,
					left: '0dp',
					top: '20dp',
					height: 50,
					width: 50
				});

				var mysub = Ti.UI.createLabel({
					text : title,
					width : 'auto',
					height: '20dp',
					textAlign : 'left',
					top : '25dp',
					left : '70dp',
					color : 'black',
					font : {
						fontWeight : 'bold',
						fontSize : '14dp'
					},
					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
					color: (element.home === true) ? '#eaeaea' : '#000'
				});

				var mysub2 = Ti.UI.createLabel({
					text : _type,
					width : 'auto',
					height : 'auto',
					textAlign : 'left',
					top : '45dp',
					left : '70dp',
					color : 'black',
					font : {
						fontSize : '14dp'
					},
					color: (element.home == 'true') ? '#eaeaea' : '#000'
				});
				
				var puckDrop = Ti.UI.createLabel({
					text: 'Puck Drop is ' + element.puckTime,
					width: Ti.UI.SIZE,
					height: Ti.UI.SIZE,
					left: '70dp',
					top: '60dp',
					font: {
						fontSize: 14
					}
				});
				
				var homeLogo = Ti.UI.createImageView({
					image: 'http://www.corliosity.com/json/' + element.homeTeam,
					height: 50,
					width: 50,
					right: '30dp',
					top: '20dp'
				});
				
				row.add(awayLogo);
				row.add(homeLogo);
				row.add(mysub);
				row.add(mysub2);
				row.add(puckDrop);
				row.thisTitle = title;
				row.thisDate = myDate;
				//row.thisDetail = detail;

				Newsdata.push(row);
				
			} //End Sorting by Month
		//} //End Sorting by Year 
		else if (!element.date)
		{
			var row = Ti.UI.createTableViewRow({
					height : '80dp',
					hasChild : false,
					layout: 'vertical',
					title: 'No Games this Month, see you in the Fall'
				});
		}
		
	} //End function addRowToCalendar

	function days_between(date1, date2) {
		var oneDay = 24*60*60*1000; // One day in miliseconds
		
		var firstDate = date1;
		var secondDate = date2;
		
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		return diffDays;
	}
	
	Ti.App.addEventListener('get.events', function(d) {
		if (first_called === false) {
			first_called = true;

			//Let's prepare our calendar view
			var jsonArray = JSON.parse(d.responseText);

			var mine = jsonArray;
			
			//We need to reconstruct our JSON by creating virtual entries not present
			//in our json.
			var object = new Array();
			for (var i = 0; i < mine.length; i++) {
				
				var start = mine[i].date;
				var end = mine[i].date;
				
				var startTeams = mine[i].game;
				var endTeams = startTeams.split(' ');
				
				var splitStart = start.replace(/T00:00:00/g, '');
				var splitEnd = end.replace(/T00:00:00/g, '');
				
				var startDate = splitStart.replace(/-/g, '/');
				var endDate = splitEnd.replace(/-/g, '/');
				
				// split the date into days, months, years array
				var x = startDate.split('/');
				var y = endDate.split('/');
				
				//Ti.API.info('Our images will be at  ' + endTeams[0]);
				
				// create date objects using year, month, day
				var a = new Date(x[0],(x[1]-1),x[2]);
				var b = new Date(y[0],(y[1]-1),y[2]);
				var t = new Date(x[0],(x[1]-1),x[2]);
				
				var pass_obj = {
					date: a,
					day : startDate,
					title: mine[i].game,
					city: mine[i].av_standing,
					state: mine[i].other_standing,
					type: mine[i].score,
					home: mine[i].home,
					puckTime: (mine[i].time == '') ? '' : mine[i].time,
					away: (mine[i].away == '') ? 'logos/' + endTeams[0].toLowerCase() + '.png' : mine[i].away,
					homeTeam: (mine[i].myhome == '') ? 'logos/' + endTeams[2].toLowerCase() + '.png' : mine[i].myhome,
				}
				
				object.push(pass_obj);
				for (var _i = 1 ; _i <= days_between(a,b); _i++ ){
					var newDate = new Date(a.getFullYear(), a.getMonth(), a.getDate()+_i); 
					var _month = newDate.getMonth();
					var _day = newDate.getDate();
					
					if (newDate.getMonth() < 10){
						_month = "0"+newDate.getMonth();
					}
					
					if (newDate.getDate() < 10){
						_day = "0"+newDate.getDate();
					}
					/*
					object.push({
						date: newDate,
						day: newDate.getFullYear() +"/"+ _month +"/"+ _day,
						title: mine[i].game,
						city: mine[i].field_event_city_value,
						state: mine[i].field_event_state_value,
						type: mine[i].name
					});
					*/
				}
			}//End the for loop
			
			//Sort our array:
			object.sort(function(a, b) {
			    a = new Date(a.date);
			    b = new Date(b.date);
			    return a>b ? 1 : a<b ? -1 : 0;
			});
			
			for (var i = 0; i < object.length; i++) {
				addRowToCalendar(object[i]);
			}//End the for loop
			actInd.hide();
			tableview.setData(Newsdata);
			
			//Create data visiulization for next month
			if (osname == 'iphone' || osname == 'ipad') {
				next_month.addEventListener('click', function() {
					//set the table view data to rd so table will empty and populate a new
					Newsdata = [];
					tableview.setData(Newsdata);
					//Get the variable firstDay and LastDay
					//overwrite to go forward one month

					if (contianerNewMonth === undefined) {
						
						Ti.API.info('Our new month is undefined');

						var allTheDay = new Date();

						var myMonth = allTheDay.getMonth();
						var myYear = allTheDay.getFullYear();

						if (myMonth == 11) {
							myMonth = 0;
							myYear = YYYY++;
						} else {
							myMonth++;
						}

						firstDay = new Date(myYear, myMonth, 1);
						lastDay = new Date(YYYY, myMonth + 1, 0);
						
						contianerNewMonth = firstDay;

						Ti.API.info('Out new first day is...' + firstDay + 'and our last day will be...' + lastDay);

						var newMonth = firstDay.getMonth() + 1;

						if (newMonth < 10) {
							newMonth = '0' + newMonth;
						}

						var monthName = myMonthString(newMonth);

						Ti.API.info('the display data ' + newMonth + ' or ' + monthName);

						monthLabel.text = monthName;

						for (var i = 0; i < object.length; i++) {
							addRowToCalendar(object[i]);
						}//End the for loop
						actInd.hide();

						tableview.setData(Newsdata);

					} else {

						Ti.API.info('Our New Months are defined  ' + contianerNewMonth);
						
						var nowDate = new Date(contianerNewMonth);
						var hereMonth = nowDate.getMonth();
						var hereYear = nowDate.getFullYear();

						if (hereMonth == 11) {
							hereMonth = 0;
							hereYear = YYYY++;
						} else {
							hereMonth++;
						}

						firstDay = new Date(hereYear, hereMonth, 1);
						lastDay = new Date(YYYY, hereMonth + 1, 0);

						Ti.API.info('Out new first day is...' + firstDay + 'and our last day will be...' + lastDay);

						var newMonth = firstDay.getMonth() + 1;

						contianerNewMonth = firstDay;
						contianerEndMonth = lastDay;

						if (newMonth < 10) {
							newMonth = '0' + newMonth;
						}

						var monthName = myMonthString(newMonth);

						Ti.API.info('the display data ' + newMonth + ' or ' + monthName);

						monthLabel.text = monthName;

						for (var i = 0; i < object.length; i++) {
							addRowToCalendar(object[i]);
						}//End the for loop
						actInd.hide();

						tableview.setData(Newsdata);
					}

				});

				//create data visualization for the previous month
				prev_month.addEventListener('click', function() {

					//set the table view data to rd so table will empty and populate a new
					//Get Days in Month
					var theDayIs = new Date();
					var theMonth = theDayIs.getMonth();
					var daysinmonth = 32 - new Date(YYYY, theMonth, 32).getDate();
					var daysInLastMonth = 32 - new Date(YYYY, theMonth - 1, 32).getDate();
					var daysInNextMonth = 32 - new Date(YYYY, theMonth + 1, daysinmonth).getDate();

					//To keep subtracting/adding months to our view create a function outside the event listeners that will generate an output.  Mimic the design of http://blog.suchariya.com/titanium-calendar-month-view/
					//Only make the above change to daysInNextMonth

					//Ti.API.info('Our daysinmonth are ' + daysinmonth + ' our daysinLastmonth are... ' + daysInLastMonth + ' our days in next month are...' + daysInNextMonth);

					Newsdata = [];
					tableview.setData(Newsdata);
					//Get the variable firstDay and LastDay
					//overwrite to go back one month

					//ERROR: Month will move backward 1 But, if you click next month it skips one month then will not return.
					/*
					 if (MM == 0)
					 {
					 YYYY = YYYY - 1;
					 firstDay = new Date(YYYY, 11, 1);
					 lastDay = new Date(YYYY, 11, 0);
					 } else
					 {
					 firstDay = new Date(YYYY, MM -1, 1);
					 }
					 */
					if (contianerNewMonth === undefined) {
						
						Ti.API.info('Our new months are undefined');

						var allTheDay = new Date();

						var myMonth = allTheDay.getMonth();
						var myYear = allTheDay.getFullYear();

						if (myMonth == 0) {
							myMonth = 11;
							myYear = YYYY--;
						} else {
							myMonth--;
						}

						Ti.API.info('We are getting the month...' + myMonth + ' and the year if necessary ' + myYear);

						firstDay = new Date(myYear, myMonth, 1);
						lastDay = new Date(YYYY, myMonth + 1, 0);

						Ti.API.info('Out new first day is...' + firstDay + 'and our last day will be...' + lastDay);
						
						contianerNewMonth = firstDay;

						var newMonth = firstDay.getMonth() + 1;

						if (newMonth < 10) {
							newMonth = '0' + newMonth;
						}

						var monthName = myMonthString(newMonth);

						Ti.API.info('the display data ' + newMonth + ' or ' + monthName);

						monthLabel.text = monthName;

						for (var i = 0; i < object.length; i++) {
							addRowToCalendar(object[i]);
						}//End the for loop
						actInd.hide();

						tableview.setData(Newsdata);

					} else {

						Ti.API.info('Our New Months are defined.  ' + contianerNewMonth);
						
						var nowDate = new Date(contianerNewMonth);
						var hereMonth = nowDate.getMonth();
						var hereYear = nowDate.getFullYear();

						if (hereMonth == 0) {
							hereMonth = 11;
							hereYear = YYYY--;
						} else {
							hereMonth--;
						}

						Ti.API.info('We are getting the month...' + hereMonth + ' and the year if necessary ' + hereYear);

						firstDay = new Date(hereYear, hereMonth, 1);
						lastDay = new Date(YYYY, hereMonth + 1, 0);

						Ti.API.info('Out new first day is...' + firstDay + 'and our last day will be...' + lastDay);

						var newMonth = firstDay.getMonth() + 1;

						contianerNewMonth = firstDay;
						contianerEndMonth = lastDay;

						if (newMonth < 10) {
							newMonth = '0' + newMonth;
						}

						var monthName = myMonthString(newMonth);

						Ti.API.info('the display data ' + newMonth + ' or ' + monthName);

						monthLabel.text = monthName;

						for (var i = 0; i < object.length; i++) {
							addRowToCalendar(object[i]);
						}//End the for loop
						actInd.hide();

						tableview.setData(Newsdata);

					}

				});

			}

			
		}  // end if statement for calling api second time
		
		
	}); // end event listener
	
	tableview.addEventListener('click', function(evt){
		Ti.API.info('Clicked ' + evt.row.thisTitle);
	});
	
	
	return win;
	
function getMonthString(e) {
	switch(e) {
		case "1":
			e = 'January';
			break;
		case "2":
			e = 'February';
			break;
		case "3":
			e = 'March';
			break;
		case "4":
			e = 'April';
			break;
		case "5":
			e = 'May';
			break;
		case "6":
			e = 'June';
			break;
		case "7":
			e = 'July';
			break;
		case "8":
			e = 'August';
			break;
		case "9":
			e = 'September';
			break;
		case "10":
			e = 'October';
			break;
		case "11":
			e = 'November';
			break;
		case "12":
			e = 'December';
			break;
	};
	return e;
};

function myMonthString(e) {
	switch(e) {
		case "01":
			e = 'January';
			break;
		case "02":
			e = 'February';
			break;
		case "03":
			e = 'March';
			break;
		case "04":
			e = 'April';
			break;
		case "05":
			e = 'May';
			break;
		case "06":
			e = 'June';
			break;
		case "07":
			e = 'July';
			break;
		case "08":
			e = 'August';
			break;
		case "09":
			e = 'September';
			break;
		case "10":
			e = 'October';
			break;
		case "11":
			e = 'November';
			break;
		case "12":
			e = 'December';
			break;
	};
	return e;
};



function month(e) {
	switch(e) {
		case 'Jan':
			e = '01';
			break;
		case 'Feb':
			e = '02';
			break;
		case 'Mar':
			e = '03';
			break;
		case 'Apr':
			e = '04';
			break;
		case 'May':
			e = '05';
			break;
		case 'Jun':
			e = '06';
			break;
		case 'Jul':
			e = '07';
			break;
		case 'Aug':
			e = '08';
			break;
		case 'Sep':
			e = '09';
			break;
		case 'Oct':
			e = '10';
			break;
		case 'Nov':
			e = '11';
			break;
		case 'Dec':
			e = '12';
			break;
	};
	return e;
			//my_navBar.setText(e);

};
	
};

module.exports = games13;

//module.exports = games13;
