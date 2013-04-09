var createRssRow = function(item, color) {
	var tablerow = Ti.UI.createTableViewRow({
		height: 70,
		link: item.link,
		myTitle: item.title,
		myDate: item.pubDate,
		myDescrip: item.descript,
		myImage: (item.image == undefined) ? '' : item.image,
		backgroundColor:  color,
		className: 'itemRow',
		hasChild: true
	});
	
	var imageview = Ti.UI.createImageView({
		image: item.image,
		height: 42, 
		width: 68, 
		left: 5,
		top: 3
	});
	var titleview = Ti.UI.createLabel({
		text: item.title,
		color: '#000',
		height: 70,
		font: {
			fontSize: 16
		},
		left: 83,
		right: 5
	});
	var dateview = Ti.UI.createLabel({
		text: item.pubDate,
		textAlign: 'center',
		color: '#444',
		font: {
			fontSize: 12	
		},
		height: 'auto',
		width: 68,
		left: 5,
		bottom: 3
	});
	tablerow.add(imageview);
	tablerow.add(dateview);
	tablerow.add(titleview);
	
	return tablerow;
};

//Master View Component Constructor
function MasterView() {
	var osname = Ti.Platform.osname;
	
	var self = Ti.UI.createView({
		backgroundImage:'images/bg.png',
		backgroundColor:'transparent'
	});
	
	var table = Ti.UI.createTableView({backgroundColor:'transparent'});
	self.add(table);
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', { link: e.row.link, title: e.row.myTitle, pubDate: e.row.myDate, description: e.row.myDescrip, myImage: e.row.myImage });
	});
	
	self.refreshRssTable = function(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			for (var i = 0; i < data.length; i++) {
				if (osname == 'android')
				{
					var bgColor = (i % 2) ? '#eaeaea' : '#999';
				} else
				{
					var bgColor = 'transparent';
				}
				rows.push(createRssRow(data[i], bgColor));
			}
			table.setData(rows);
		}
	};

	return self;
}
module.exports = MasterView;