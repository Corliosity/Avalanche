/**
 * @author Andrew Corliss
 */
function androidGames(navController)
{
	var win = Ti.UI.createWindow({
		title: 'Upcoming Games',
		backgroundImage: 'images/bg.png',
		backgroundColor: 'transparent'
	});
	
	var Newsdata = [];
	
	var containerNewMonth;
	var containerEndMonth;

	var tableview = Ti.UI.createTableView({
		top : '40dp',
		allowsSelection : false,
		separatorColor: '#CCC'
	});
	win.add(tableview);

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
	
	if (Ti.Platform.osname === "ipad"){
		actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else{
		actInd.style = Ti.UI.ActivityIndicatorStyle.BIG_DARK;
	}

	tableview.add(actInd);
	actInd.show();

	begin = require('/services/games');
	events = new begin();

	//Find out the current date.
	today = new Date();
	DD = today.getDate();
	MM = today.getMonth() + 1;
	YYYY = today.getFullYear();

	Ti.API.info('Acording to JavaScript the month is ' + MM);

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
		width: Ti.UI.SIZE
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
		},
		width: '30dp'
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
		},
		width: '30dp'
	});
	
	view.add(prev_month);
		view.add(monthLabel);
		view.add(next_month);

		win.add(view);
	
	function addRowToCalendar(element){
		//split the date to create an array of values
		var new_date = element.date.getFullYear() + "/" + (element.date.getMonth() + 1) + "/" + element.date.getDate();
		var dates = new_date.split('/');
		var RealMonth = dates[1];
		var RealYear = dates[0];
		var RealDay = dates[2];

		var byMonth = dates[1] + '/' + dates[2];

		var RealDate = dates[1] + '/' + dates[2] + '/' + dates[0];

		var _city = element.city;
		var _state = element.state;
		var _type = element.type;
					
		var title = element.title;
		var myDate = RealDate;
		var detail = _type + '   ' + _city;
		/*
		if (_city != "" && _city != " " && _state != "" && _state != "" && _type != "" && _type != " "){
			detail = _city+", "+_state+" - "+_type;
		}
		else if (_city != "" && _city != " " && _state != "" && _state != ""){
			detail = _city+", "+_state;
		}
		else if (_type != "" && _type != " " && _state != "" && _state != ""){
			detail = _state+" - "+_type;
		}
		if (_city != "" && _city != " " && _type != "" && _type != " "){
			detail = _city+" - "+_type;
		}
		else if(_city != "" && _city != " " ){
			detail = _city;
		}
		else if (_state != "" && _state != ""){
			detail = _state;
		}
		else if(_type != "" && _type != " "){
			detail = _type;
		}
		*/
		var javaDate = YYYY + '/' + MM + '/' + DD;

		var trueDate = new Date(javaDate);

		var week = new Date(trueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
		var rans = week.toString();
		var theTime = rans.split(" ");
		var trueMonth = month(theTime[1]);

		var weekEnd = trueMonth + '/' + theTime[2] + '/' + theTime[3];
		//Ti.API.info(weekEnd);
		flag_repeated_day = false;
		
		//|| ( (new Date().getDay() === element.date.getDay()) && (new Date().getMonth() === element.date.getMonth()) && (new Date().getYear() === element.date.getYear())  ) 

		//if (RealYear == YYYY) {
			if (new Date(firstDay) <= element.date && element.date <= new Date(lastDay)) {
				//Add headers for each month
				/*
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
				}
				*/
	
				var row = Ti.UI.createTableViewRow({
					height : '80dp',
					hasChild : false,
					layout: 'vertical'
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
					//row.height = "60dp";
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

				var mysub = Ti.UI.createLabel({
					text : title,
					width : 'auto',
					height: '20dp',
					textAlign : 'left',
					top : '7dp',
					left : '10dp',
					color : 'black',
					font : {
						fontWeight : 'bold',
						fontSize : '14dp'
					},
					verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
				});

				var mysub2 = Ti.UI.createLabel({
					text : detail,
					width : 'auto',
					height : '20dp',
					textAlign : 'left',
					top : '2dp',
					left : '10dp',
					color : 'black',
					font : {
						fontSize : '14dp'
					}
				});

				row.add(mysub);
				row.add(mysub2);
				row.thisTitle = title;
				row.thisDate = myDate;
				row.thisDetail = detail;

				Newsdata.push(row);
			} //End Sorting by Month
		//} //End Sorting by Year
	}

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
				
				var splitStart = start.replace(/T00:00:00/g, '');
				var splitEnd = end.replace(/T00:00:00/g, '');
				
				var startDate = splitStart.replace(/-/g, '/');
				var endDate = splitEnd.replace(/-/g, '/');
				
				// split the date into days, months, years array
				var x = startDate.split('/');
				var y = endDate.split('/');
				
				// create date objects using year, month, day
				var a = new Date(x[0],(x[1]-1),x[2]);
				var b = new Date(y[0],(y[1]-1),y[2]);
				var t = new Date(x[0],(x[1]-1),x[2]);
				
				var pass_obj = {
					date: a,
					day : startDate,
					title: mine[i].game,
					city: mine[i].time,
					state: mine[i].home,
					type: mine[i].score
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
					
					object.push({
						date: newDate,
						day: newDate.getFullYear() +"/"+ _month +"/"+ _day,
						title: mine[i].game,
						city: mine[i].time,
						state: mine[i].home,
						type: mine[i].score
					});
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
			
			next_month.addEventListener('click', function() {
					//set the table view data to rd so table will empty and populate a new
					Newsdata = [];
					tableview.setData(Newsdata);
					//Get the variable firstDay and LastDay
					//overwrite to go forward one month

					if (containerNewMonth === undefined) {
						
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
						
						containerNewMonth = firstDay;

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

						Ti.API.info('Our New Months are defined  ' + containerNewMonth);
						
						var nowDate = new Date(containerNewMonth);
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

						containerNewMonth = firstDay;
						containerEndMonth = lastDay;

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
					
					alert('I Have been clicked')

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
					if (containerNewMonth === undefined) {
						
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
						
						containerNewMonth = firstDay;

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

						Ti.API.info('Our New Months are defined.  ' + containerNewMonth);
						
						var nowDate = new Date(containerNewMonth);
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

						containerNewMonth = firstDay;
						containerEndMonth = lastDay;

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
	});
	
	return win;
};

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
module.exports = androidGames;