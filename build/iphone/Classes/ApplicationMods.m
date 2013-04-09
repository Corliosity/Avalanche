#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"ti.cloud",@"name",@"ti.cloud",@"moduleid",@"2.3.1",@"version",@"1056b5d2-2bb5-4339-b930-297637aeec4e",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"google_analytics",@"name",@"com.thinkorange.google.analytics",@"moduleid",@"2.0",@"version",@"97f3764b-0cdb-4734-9925-f27c04204758",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"twitter",@"name",@"com.0x82.twitter",@"moduleid",@"1.1",@"version",@"a497fdc6-34d1-44ac-bed6-0dfbde939f9b",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end