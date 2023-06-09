package com.pyypl.dev;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.react.CleverTapModule;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ClevertapProject";
  }

  // clevertap
  @Override
  public void onNewIntent(final Intent intent) {
    super.onNewIntent(intent);

    CleverTapAPI cleverTapDefaultInstance = CleverTapAPI.getDefaultInstance(this);
    if (cleverTapDefaultInstance != null) {
      /**
       * On Android 12, Raise notification clicked event when Activity is already running in activity backstack
       */
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        cleverTapDefaultInstance.pushNotificationClickedEvent(intent.getExtras());
      }
    }
  }

  // clevertap
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    CleverTapModule.setInitialUri(getIntent().getData());
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

  }
}
