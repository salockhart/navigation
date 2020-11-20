/* globals describe, beforeAll, beforeEach, device, it, element, by */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true, disableTouchIndicators: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe(':ios:', () => {
    describe('without testID', () => {
      it('should handle tabs', async () => {
        // Notifications Tab
        await element(
          by.type('UITabBarButton').withDescendant(by.text('Notifications')),
        ).tap();

        // Mentions
        await element(
          by.type('UISegment').withDescendant(by.text('Mentions')),
        ).tap();
        await element(
          by.type('UISegment').withDescendant(by.text('All')),
        ).tap();

        // Home Tab
        await element(
          by.type('UITabBarButton').withDescendant(by.text('Home')),
        ).tap();
      });

      it('should handle nav bar', async () => {
        // Tweet
        await element(by.text('Preethi Kasireddy')).atIndex(0).tap();

        // Nav Bar Button
        await element(
          by.type('_UIButtonBarButton').withDescendant(by.text('Share')),
        ).tap();
        await element(
          by.type('_UIButtonBarButton').withDescendant(by.text('Report')),
        ).tap();

        // Back
        await element(by.type('_UIBackButtonContainerView')).tap();
      });
    });

    describe('with testID', () => {
      it('should handle tabs', async () => {
        // Notifications Tab
        await element(by.id('notificationsTab')).tap();

        // Mentions
        await element(by.id('mentionsTab')).tap();
        await element(by.id('allTab')).tap();

        // Home Tab
        await element(by.id('homeTab')).tap();
      });

      it('should handle nav bar', async () => {
        // Tweet
        await element(by.text('Preethi Kasireddy')).atIndex(0).tap();

        // Nav Bar Button
        await element(by.id('shareButton')).tap();
        await element(by.id('reportButton')).tap();

        // Back
        await element(by.id('goBackButton')).tap();
      });
    });
  });

  describe(':android:', () => {
    describe('without testID', () => {
      it('should handle tabs', async () => {
        // Notifications Tab
        await element(
          by
            .type(
              'com.google.android.material.bottomnavigation.BottomNavigationItemView',
            )
            .withDescendant(by.text('Notifications')),
        ).tap();

        // Mentions
        await element(
          by
            .type('com.google.android.material.tabs.TabLayout$TabView')
            .withDescendant(by.text('Mentions')),
        ).tap();
        await element(
          by
            .type('com.google.android.material.tabs.TabLayout$TabView')
            .withDescendant(by.text('All')),
        ).tap();

        // Home Tab
        await element(
          by
            .type(
              'com.google.android.material.bottomnavigation.BottomNavigationItemView',
            )
            .withDescendant(by.text('Home')),
        ).tap();
      });

      it('should handle nav bar', async () => {
        // Tweet
        await element(by.text('Preethi Kasireddy')).atIndex(0).tap();

        // Nav Bar Button
        await element(
          by
            .type('androidx.appcompat.view.menu.ActionMenuItemView')
            .and(by.text('Share')),
        ).tap();
        await element(
          by.type(
            'androidx.appcompat.widget.ActionMenuPresenter$OverflowMenuButton',
          ),
        ).tap();
        await element(
          by
            .type('androidx.appcompat.view.menu.ListMenuItemView')
            .withDescendant(by.text('Report')),
        ).tap();

        // Back
        await element(
          by.type('androidx.appcompat.widget.AppCompatImageButton'),
        ).tap();
      });
    });

    describe('with testID', () => {
      it('should handle tabs', async () => {
        // Notifications Tab
        await element(by.id('notificationsTab')).tap();

        // Mentions
        await element(by.id('mentionsTab')).tap();
        await element(by.id('allTab')).tap();

        // Home Tab
        await element(by.id('homeTab')).tap();
      });

      it('should handle nav bar', async () => {
        // Tweet
        await element(by.text('Preethi Kasireddy')).atIndex(0).tap();

        // Nav Bar Button
        await element(by.id('shareButton')).tap();
        await element(by.id('androidOverflowMenu')).tap();

        // We do not support for the overflow menu items
        // await element(by.id('reportButton')).tap();
        await element(
          by
            .type('androidx.appcompat.view.menu.ListMenuItemView')
            .withDescendant(by.text('Report')),
        ).tap();

        // Back
        await element(by.id('goBackButton')).tap();
      });
    });
  });
});
