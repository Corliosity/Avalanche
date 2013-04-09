/**
 * @author Andrew Corliss
 * Get Info for organizing by header here:
 * https://developer.appcelerator.com/question/129929/infinite-loop-on-tableviewrowsection-from-xml
 * http://developer.appcelerator.com/blog/2010/05/how-to-create-a-tweetie-like-pull-to-refresh-table.html
 * http://developer.appcelerator.com/question/126994/changing-dynamic-row-header
 * https://developer.appcelerator.com/question/74621/tableviewsection-not-creating-sections
 * http://developer.appcelerator.com/question/139620/implement-custom-table-view-headers
 */
function nhlNews(navController)
{
	var theNews = require('services/NHLrss');
	
	var win = Ti.UI.createWindow
	({
		title: 'Around the League',
		backgroundColor: '#eaeaea',
		backButtonTitle: 'Home'
	});
	
	return win;
}
module.exports = nhlNews;