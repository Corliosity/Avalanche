//Detail View Component Constructor
function DetailView() {
	var osname = Ti.Platform.osname;
	var self = Ti.UI.createView({backgroundImage: 'images/bg.png'});
	var title = Ti.UI.createLabel({top:'10dp', left:'5dp', width: 'auto', height: 'auto', font:{fontWeight: 'bold', fontSize:18}, textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER, color: '#333'});
	self.add(title);
	var scrollView = Ti.UI.createScrollView({contentWidth: 'auto', contentHeight: '600dp', showVerticalScrollIndicator: true, top: '70dp', width: '100%'});
	self.add(scrollView);
	var images = Ti.UI.createImageView({top:(osname == 'iphone' || osname == 'ipad') ? '0dp' : '-100dp', width: '90%', height: 'auto'});
	scrollView.add(images);
	var published = Ti.UI.createLabel({top:'45dp', left:'5dp', width: 'auto', height: 'auto', textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT, color: '#333'});
	self.add(published);
	var description = Ti.UI.createTextArea({top:(osname == 'iphone' || osname == 'ipad') ? '175dp' : '200dp', font:{fontSize:14}, editable:false, width:'100%', height:'auto', color:'#000', backgroundColor:'transparent'});
	scrollView.add(description);
	var link = Ti.UI.createLabel({top: '345dp', font: {fontSize:14}, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color:'blue'});
	scrollView.add(link);
	
	self.showTitle = function(mytitle)
	{
		title.setText(mytitle);
	};
	
	self.showDate = function(myDate)
	{
		published.setText(myDate);
	};
	
	self.showArticle = function(myData)
	{
		description.setValue(myData);
	};

	self.showImage = function(myImage)
	{
		images.setImage(myImage);
	};
	
	self.showLink = function(myLink)
	{
		link.setText(myLink);
	};

	/*	
	var webview = Ti.UI.createWebView();
	self.add(webview);

	self.showArticle = function(url) {
		webview.url = url;
	};
	
	webview.addEventListener('load', function(e) {
		self.fireEvent('articleLoaded');
	});
	*/
	
	link.addEventListener('click', function(){
		Ti.API.info('You clicked..' + link.text);
		Ti.Platform.openURL(link.text);
	});
	
	return self;
}
module.exports = DetailView;
