/**
 * @author Andrew Corliss, Joseandro Luiz
 */
var pushnotifications = null;
//We don't need to include this many times, just once
if (Ti.Platform.osname === "android") {
	pushnotifications = require('com.arellomobie.push');
}
else{
	Ti.include('/services/pushwoosh.js');
}


function Push() {
	
	Ti.API.info("Registering for push notifications");
	//var testflight = require("com.0x82.testflight");

	if (Ti.Platform.osname === "android") {
		//pushnotifications = require('com.arellomobie.push');
		Ti.API.info("module is => " + pushnotifications);
		
		pushnotifications.pushNotificationsRegister("862891134777", "79A5E-44967", {
		    //NOTE: all the functions fire on the background thread, do not use any UI or Alerts here
		    success:function(e)
		    {
		        Ti.API.info('JS registration success event: ' + e.registrationId);
		    },
		    error:function(e)
		    {
		        Ti.API.error("Error during registration: "+e.error);
		    },
		    callback:function(e) // called when a push notification is received
		    {
		        Ti.API.info('JS message event: ' + JSON.stringify(e.data));
		        var json = JSON.parse(e.data)
		        setTimeout(function(){
		        	alert("New message: "+ json.title);
		        },2000);
		    }
		});
	} else {
		//Require doesn't treat pushwoosh.js file as a module, adopting Ti.include instead
		//Ti.require('/data/pushwoosh.js');
		PushWoosh.appCode = '79A5E-44967'; //79A5E-44967
		/*
		var options = {};
		//options[testflight.ATTACH_BACKTRACE_TO_FEEDBACK] = true;
		//options[testflight.DISABLE_IN_APP_UPDATES] = true; 
		//testflight.takeOff('7eb798a0b815897f262e28a88c5d7b99_MTYxNTg5MjAxMi0xMi0wMyAxNTozMDo0Ny4wMDgxNzA',options);
		*/
		//record stats for app open with Pushwoosh
		PushWoosh.sendAppOpen();
		
		Ti.Network.registerForPushNotifications({
			types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
			success : function(e) {
				var deviceToken = e.deviceToken;
				Ti.API.info('successfully registered for apple device token with ' + e.deviceToken);

				PushWoosh.register(function(data) {
					Ti.API.debug("PushWoosh register success: " + JSON.stringify(data));
				}, function(e) {
					Ti.API.warn("Couldn't register with PushWoosh: " + JSON.stringify(e));
				});
			},
			error : function(e) {
				Ti.API.warn("push notifications disabled: " + JSON.stringify(e));
			},
			callback : function(e) {
				Ti.API.warn("push message received: " + JSON.stringify(e));

				//send stats to Pushwoosh about push opened
				PushWoosh.sendPushStat(e.data.p);

				var a = Ti.UI.createAlertDialog({
					title : 'New Message',
					message : e.data.alert
					//message : JSON.stringify(e.data)  //if you want to access additional custom data in the payload
				});
				a.show();
			}
		});
	}
};

/*
function Push(push_is_on) {
	Ti.API.info("Registering for push notifications - silent mode");
	
	if (Ti.Platform.name === "android") {
		if (push_is_on === false){
			pushnotifications.unregister();
		}
		else{
			//pushnotifications = require('com.arellomobie.push');
			Ti.API.info("module is => " + pushnotifications);
			
			pushnotifications.pushNotificationsRegister("com54avs54pushing", "79A5E-44967", {
			    //NOTE: all the functions fire on the background thread, do not use any UI or Alerts here
			    success:function(e)
			    {
			        Ti.API.info('JS registration success event: ' + e.registrationId);
			    },
			    error:function(e)
			    {
			        Ti.API.error("Error during registration: "+e.error);
			    },
			    callback:function(e) // called when a push notification is received
			    {
			        Ti.API.info('JS message event: ' + JSON.stringify(e.data));
			        var json = JSON.parse(e.data)
			        setTimeout(function(){
			        	alert("New push message: "+json.title);
			        },2000);
			    }
			});			
		}
	} 
	else {
		if (push_is_on === false){
			PushWoosh.unregister(function(data) {
				Ti.API.info("--->> "+JSON.stringify(data));
			}, function(errorregistration) {
				Ti.API.info("Couldn't unregister with PushWoosh");
			});
		}
		else{
			PushWoosh.appCode = '79A5E-44967';
			PushWoosh.sendAppOpen();
			
			Ti.Network.registerForPushNotifications({
				types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
				success : function(e) {
					var deviceToken = e.deviceToken;
					Ti.API.info('successfully registered for apple device token with ' + e.deviceToken);
	
					PushWoosh.register(function(data) {
						Ti.API.debug("PushWoosh register success: " + JSON.stringify(data));
					}, function(e) {
						Ti.API.warn("Couldn't register with PushWoosh: " + JSON.stringify(e));
					});
				},
				error : function(e) {
					Ti.API.warn("push notifications disabled: " + JSON.stringify(e));
				},
				callback : function(e) {
					Ti.API.warn("push message received: " + JSON.stringify(e));
	
					//send stats to Pushwoosh about push opened
					PushWoosh.sendPushStat(e.data.p);
	
					var a = Ti.UI.createAlertDialog({
						title : 'New Message',
						message : e.data.alert
					});
					a.show();
				}
			});	
		}
	}
}
*/
Push.prototype.unRegister = function() {
	Ti.API.info("Unregistered for push notifications");
	if (Ti.Platform.osname === "android"){
		//Unregisters from push notifications
		pushnotifications.unregister(function(data) {
			Ti.UI.createAlertDialog({
				title : 'Successfully unregistered',
				message : 'You will no longer receive notifications from us on this device' //JSON.stringify(data)
			}).show();
		}, function(errorregistration) {
			Ti.API.warn("Couldn't unregister with PushWoosh");
		});
	}
	else{
		//Ti.Network.unregisterForPushNotifications();
		PushWoosh.unregister(function(data) {
			Ti.UI.createAlertDialog({
				title : 'Successfully unregistered',
				message : 'You will no longer receive notifications from us on this device' //JSON.stringify(data)
			}).show();
		}, function(errorregistration) {
			Ti.API.warn("Couldn't unregister with PushWoosh");
		});
	}
};

module.exports = Push;
