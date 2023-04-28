//
//  NotificationService.m
//  nse-dev
//
//  Created by Petrus van Egeraat on 4/28/23.
//

#import "NotificationService.h"
#import "CleverTap.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];

    NSDictionary *profile = @{
        @"Identity": @"e6c8ac1d-b830-4469-9596-bba81540513b",
        @"Phone": @"+971544965779"
    };
    [[CleverTap sharedInstance] profilePush:profile];
    
    [super didReceiveNotificationRequest:request withContentHandler:contentHandler];
}

@end
