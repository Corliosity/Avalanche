/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"nDFtDav1oEeakfMrWbP7i3IEy9IWGTfG"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"Qe19PZwRVMxhFZQ4W0V9PPVvZ5D9g6AA"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"6H9j6U7ZiCrbFyD2gFEwiljiCqiDPsTG"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"v0X7ToGKDHEQoU4huRuiPz4c0CxU3dSq"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"IgeawrEyP3RIOiDUCOsoVQaYEmV29V1Z"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"IHu5IukVFinR4VonRb80F3uDxqzz0NFv"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end