/**
 * @author Andrew Corliss
 */
function stands()
{
	var osname = Ti.Platform.osname;
	var url ="http://www.corliosity.com/json/standings.php";
	
	var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function(e)
		{
			Ti.API.info('Calling the NHL Standings');
			Ti.API.info('My Response ' + this.responseText);
			jsonArray = Ti.App.fireEvent('get.stands',{'responseText':this.responseText});
		}
		xhr.onerror = function(e)
		{
			Ti.API.info('error, HTTP status = ' + this.status);
			//alert(e.error);
			Ti.API.info(e.error);
			setTimeout(function(){alert("Sorry it appears that we are having difficulties getting the current events.  Please check back in a few minutes for updates.")},0);
		}
		
	xhr.open('GET', url);
	xhr.send();
}
module.exports = stands;