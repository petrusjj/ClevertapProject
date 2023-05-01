//
//  NotificationService.m
//  nse-dev
//
//  Created by Petrus van Egeraat on 4/28/23.
//

#import "NotificationService.h"
#import "CleverTap.h"
#import <Foundation/Foundation.h>

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];

    NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:@"group.com.pyypl.dev"];
    NSString *jsonString = [defaults objectForKey:@"currentUser"];

    NSLog(@"jsonData: %@", jsonString);

    // Convert the JSON string to a dictionary
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error;
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];

    // Extract values from the dictionary
    NSString *userId = [jsonDict valueForKey:@"userId"];
    NSString *phoneNumber = [jsonDict valueForKey:@"phoneNumber"];

    // Construct a new NSDictionary object with the extracted values
    NSDictionary *profile = @{@"Identity": userId, @"Phone": phoneNumber};

    NSLog(@"profile: %@", profile);

    [[CleverTap sharedInstance] profilePush:profile];
    [[CleverTap sharedInstance] recordNotificationViewedEventWithData:request.content.userInfo];
    [super didReceiveNotificationRequest:request withContentHandler:contentHandler];
}

@end
