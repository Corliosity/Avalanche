/**
 * @author Andrew Corliss
 */
function games()
{
	//"http://localhost:8888/games.php"
	//"http://www.corliosity.com/json/games.json"
	var url = "http://www.corliosity.com/json/avsGames.php";
	
	var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function()
		{
			Ti.API.info('calling my data');
			Ti.API.info(this.responseText);
			jsonArray = Ti.App.fireEvent('get.events',{'responseText':this.responseText});
		}
		xhr.onerror = function()
		{
			Ti.API.info('error, HTTP status = ' + this.status);
			//alert(e.error);
			Ti.API.info(e.error);
			setTimeout(
				function()
				{
					alert("Sorry it appears that we are having difficulties getting the current events.  Please check back in a few minutes for updates.")
				},
			0);
		}
		
	xhr.open('GET', url, true);
	xhr.send();
}
module.exports = games;