//Application Window Component Constructor
function ApplicationWindow(navController) {
	//declare module dependencies
	var rss = require('services/NHLrss'),
		MasterView = require('ui/nhl/MasterView'),
		DetailView = require('ui/nhl/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'transparent',
		title: 'NHL News',
		backButtonTitle: 'Back',
		barColor: '#13386c',
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'RSS Reader'
	});
	var button = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});
	button.addEventListener('click', function(e) {
		refreshRSS();
	});
	self.rightNavButton = button;
	self.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({backgroundColor:'#eaeaea', title:'NHL News', barColor: '#13386c'});
	detailContainerWindow.add(detailView);
	
	/*
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	*/

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.showLink(e.link);
		detailView.showArticle(e.description);
		detailView.showTitle(e.title);
		detailView.showDate(e.pubDate);
		//detailView.showImage(e.image);
		navController.open(detailContainerWindow);
	});
	
	function refreshRSS() {
		rss.loadRssFeed({
			success: function(data) {
	    		masterView.refreshRssTable(data);
	    	}
		});
	}
	
	// load initial rss feed
	refreshRSS();
	
	return self;
};
module.exports = ApplicationWindow;