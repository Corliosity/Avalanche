/**
 * @author Andrew Corliss
 */
function avs_videos()
{
	//http://localhost:8888/myPlayers.php
	//"http://www.corliosity.com/json/players.json"
	var url = "http://www.corliosity.com/json/getAvsVideo.php";
	
	var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function(e)
		{
			Ti.API.info('Calling Data');
			Ti.API.info(this.responseText);
			jsonArray = Ti.App.fireEvent('get.videos',{'responseText':this.responseText});
		}
		xhr.onerror = function(e)
		{
			Ti.API.info('error, HTTP status = ' + this.status);
			//alert(e.error);
			Ti.API.info(e.error);
			setTimeout(function(){alert("Sorry it appears that we are having difficulties getting the current events.  Please check back in a few minutes for updates.")},3000);
		}
		
	xhr.open('GET', url);
	xhr.send();
}
module.exports = avs_videos;