//Application Window Component Constructor
function ApplicationWindow(navController) {
	//declare module dependencies
	var rss = require('services/rss'),
		MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'transparent',
		title: 'Avalanche News',
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
	var detailContainerWindow = Ti.UI.createWindow({backgroundColor:'#eaeaea', title:'Avs Hockey', barColor: '#13386c'});
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
		//detailView.showArticle(e.link);
		detailView.showArticle(e.description);
		detailView.showTitle(e.title);
		detailView.showDate(e.pubDate);
		detailView.showImage(e.myImage);
		detailView.showLink(e.link);
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