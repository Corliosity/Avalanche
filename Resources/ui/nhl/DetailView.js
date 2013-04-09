//Detail View Component Constructor
function DetailView() {
	var self = Ti.UI.createView({backgroundImage:'images/bg.png'});
	var title = Ti.UI.createLabel({top:'10dp', left:'5dp', width: 'auto', height: 'auto', font:{fontWeight: 'bold', fontSize:18}, textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER, color: '#333'});
	self.add(title);
	var images = Ti.UI.createImageView({right:'3dp', top:'12dp'});
	self.add(images);
	var scrollView = Ti.UI.createScrollView({contentWidth: 'auto', contentHeight: '600dp', showVerticalScrollIndicator: true, top: '70dp', width: '100%'});
	self.add(scrollView);
	var published = Ti.UI.createLabel({top:'75dp', left:'5dp', width: 'auto', height: 'auto', textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT, color: '#333'});
	self.add(published);
	var description = Ti.UI.createTextArea({top:'30dp', font:{fontSize:14}, editable:false, width:'100%', height:'auto', color: '#000', backgroundColor:'transparent'});
	scrollView.add(description);
	var link = Ti.UI.createLabel({top: '220dp', font: {fontSize:14}, width: Ti.UI.SIZE, height: Ti.UI.SIZE, color:'blue'});
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
	/*
	self.showImage = function(myImage)
	{
		images.setImage(myImage);
	};
	*/

	self.showLink = function(url) {
		link.setText(url);
	};
	
	link.addEventListener('click', function(d){
		Ti.Platform.openURL(d.source.text);
	});
	/*
	webview.addEventListener('load', function(e) {
		self.fireEvent('articleLoaded');
	});
	*/
	
	return self;
}
module.exports = DetailView;
