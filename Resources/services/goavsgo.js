/**
 * @author Andrew Corliss
 */
function goavsgo()
{
	var url = "http://search.twitter.com/search.json?q=%23GoAvsGo&rpp=100&result_type=recent&include_entities=true";
	
	var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function()
		{
			Ti.API.info('calling my data');
			Ti.API.info(this.responseText);
			jsonArray = Ti.App.fireEvent('get.tweets',{'responseText':this.responseText});
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
		
	xhr.open('GET', url);
	xhr.send();
}
module.exports = goavsgo;