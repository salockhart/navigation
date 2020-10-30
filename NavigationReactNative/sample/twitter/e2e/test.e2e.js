describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true, disableTouchIndicators: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe(':ios:', () => {
    it('should handle tabs', async () => {
      // Notifications Tab
      await element(
        by.type('UITabBarButton').withDescendant(by.text('Notifications')),
      ).tap();

      // Mentions
      await element(
        by.type('UISegment').withDescendant(by.text('Mentions')),
      ).tap();
      await element(by.type('UISegment').withDescendant(by.text('All'))).tap();

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
    });
  });

  describe(':android:', () => {
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
    });
  });
});
