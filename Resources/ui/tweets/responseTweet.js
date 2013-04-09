/**
 * @author Andrew Corliss
 */
function responseTweet(user, tweet, image, created, myurl, navController)
{
	var win = Ti.UI.createWindow({
		title: user,
		backButtonTitle: 'Back',
		backgroundColor: '#999',
		barColor: '#4099FF'
	});
	
	Ti.API.info(myurl);
	
	var view = Ti.UI.createView({
		borderRadius:6,borderWidth:1,borderColor:'#000',
		top: '5dp',
		width:'100%',
		height:Ti.UI.SIZE,
		backgroundColor: '#fff'
	});
	/*
	var userText = Ti.UI.createLabel({
		left: '60dp',
		top: '5dp',
		text: user,
		font: {
			fontSize: 14,
			fontWeight: 'bold'
		}
	});
	
	var userImage = Ti.UI.createImageView({
		borderRadius:6,borderWidth:1,borderColor:'#000',
		image: image,
		left: '10dp',
		top: '5dp',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	
	var tweetText = Ti.UI.createLabel({
		text: tweet,
		left: '75dp',
		top: '25dp',
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: 14
		}
	});
	
	var dateText = Ti.UI.createLabel({
		text: created,
		right: '5dp',
		top: '5dp',
		width: 'auto',
		height: 'auto',
		font: {
			fontSize: 9
		}
	});
	
	var spacer = Ti.UI.createLabel({
		top: '100dp',
		height: '20dp'
	});
	
	view.add(spacer);
	view.add(dateText);
	view.add(tweetText);
	view.add(userImage);
	view.add(userText);
	*/
	var webView = Ti.UI.createWebView({
		url: 'http://twitter.com/'+user+'/status/'+myurl
	});
	view.add(webView);
	win.add(view);
	/*
	view.addEventListener('click', function(){
		Ti.API.info('view clicked');
		//Titanium.Platform.openURL(myurl);
		Titanium.Platform.openURL('http://twitter.com/'+userText.text+'/status/'+myurl);
	});
	*/
	return win;
}
module.exports = responseTweet;