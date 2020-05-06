#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface NVTabBarItemView : UIView

@property UITabBarItem *tab;
@property (nonatomic, assign) BOOL selected;
@property (nonatomic, strong) UINavigationController *navigationController;
@property (nonatomic, copy) RCTBubblingEventBlock onPress;

@end
