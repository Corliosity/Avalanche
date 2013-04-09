/**
 * @author Andrew Corliss
 */
function shop(navController)
{
	var win = Ti.UI.createWindow({
		title:	'Shop Avalanche',
		backgroundColor:'#eaeaea',
		layout:	'vertical',
		barColor: '#13386c',
		backButtonTitle: 'Home'
	});
	
	var view = Ti.UI.createWebView({
		url:'http://shop.nhl.com/category/index.jsp?categoryId=3176431&cp=3194476.3169591'
	});
	win.add(view);
	
	return win;
}
module.exports = shop;
