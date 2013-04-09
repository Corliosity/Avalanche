//require the UI components necessary to drive the test
//var NavigationController = require('NavigationController').NavigationController,
//	TestWindow = require('TestWindow').TestWindow;

//Register for push notifications
var notifications = require('services/Push');
var myNotification = new notifications();

//var myPush = new notifications(Ti.App.Properties.getBool('push', true));

var NavigationController = require('NavigationController'),
TestWindow = require('TestWindow');

//create NavigationController which will drive our simple application
var controller = new NavigationController();

//open initial window
controller.open(new TestWindow(controller));

//configure Google Analytics here so we collect data on app start

var GoogleAnalytics = require("com.thinkorange.google.analytics");
GoogleAnalytics.accountID = "UA-35858518-2";
GoogleAnalytics.debug = true;
GoogleAnalytics.optOut = false;
GoogleAnalytics.dispatchInterval = 0;
//GoogleAnalytics.trackUncaughtExceptions = true;
//Set tracker on specific pages - To start we will focus just on the first view.  We can later add more pages or less depending on the clients wishes.
var Tracker = GoogleAnalytics.tracker;
Tracker.trackView('TestWindow');
Tracker.trackView('ui/common/MasterView');
Tracker.trackView('ui/common/DetailView');
Tracker.trackView('ui/roster/roster13')
Tracker.trackView('ui/tweets/twitter');
Tracker.trackView('ui/nhl/MasterView');
Tracker.trackView('ui/nhl/DetailView');
Tracker.trackView('ui/schedule/games13');
Tracker.trackView('ui/nhl/standings');
//Tracker.sampleRate = 95;
//Tracker.anonymize = true;
Tracker.setSessionStart(true);
//GoogleAnalytics.dispatch();

