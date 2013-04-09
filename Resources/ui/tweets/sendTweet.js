/**
 * @author Andrew Corliss
 */
function sendTweet(navController)
{
	var TwitterApi = require('lib/twitter_api').TwitterApi;
		var twitterApi = new TwitterApi({
			consumerKey : 'SD31LyXTL1oYuFWZ94UeA',
			consumerSecret : 'INVmpl1fUvkRdluIXlrflYKIBSdCs335VLmj7QSDWI'
		});
	twitterApi.authorize();
	
	var win = Ti.UI.createWindow({
		title: 'Send a Tweet',
		backgroundImage: 'images/bg.png',
		backButtonTitle: 'Back',
		barColor: '#4099FF'
	});
	
	var view = Ti.UI.createView({
		borderRadius:6,borderWidth:4,borderColor:'#000',
		top: '5dp',
		width:'90%',
		height:'30%'
	});
	
	var tweetText = Ti.UI.createTextArea({
		width: '100%',
		borderRadius:6,borderWidth:2,borderColor:'#000',
		height: '90%',
		editable: true,
		bottom: '5dp',
		value: '#GoAvsGo'
	});
	
	var button = Ti.UI.createLabel({
		text: 'Send Tweet',
		width: '100dp',
		height: '40dp',
		top: '200dp',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundGradient: {
			type: 'linear',
        	startPoint: { x: '50%', y: '0%' },
        	endPoint: { x: '50%', y: '100%' },
        	colors: [ { color: '#ccc', offset: 0.0}, { color: '#fff', offset: 0.25 }, { color: '#999', offset: 1.0 } ]
		},
		backgroundColor: 'transparent',
		font: {
			fontWeight: 'bold'
		},
		borderRadius: 8
	});
	
	button.addEventListener('click', function(){
		
		var message = tweetText.value;
		Ti.API.info('Here is my message.. ' + message);
	
		//status update
		twitterApi.statuses_update({
			onSuccess : function(responce) {
				alert('tweet success');
				Ti.API.info(responce);
			},
			onError : function(error) {
				Ti.API.error(error);
			},
			parameters : {
				status : message
			}
		}); 


	});
	
	view.add(tweetText);
	win.add(view);
	win.add(button);
	
	return win;
}
module.exports = sendTweet;
