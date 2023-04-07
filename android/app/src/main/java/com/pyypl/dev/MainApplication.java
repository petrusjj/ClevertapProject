package com.pyypl.dev;

// Android
import android.app.Activity;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.app.Application.ActivityLifecycleCallbacks;

// AndroidX
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

// React
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.soloader.SoLoader;
import com.pyypl.dev.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

// Clevertap
import com.clevertap.android.sdk.ActivityLifecycleCallback;
import com.clevertap.react.CleverTapApplication;
import com.clevertap.android.pushtemplates.PushTemplateNotificationHandler;
import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.android.sdk.interfaces.NotificationHandler;

import org.json.JSONObject;

public class MainApplication extends CleverTapApplication
        implements ActivityLifecycleCallbacks, ReactApplication{

  private static final String TAG = "MainApplication";

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    CleverTapAPI.setNotificationHandler((NotificationHandler) new PushTemplateNotificationHandler());
    ActivityLifecycleCallback.register(this);   

    super.onCreate();

    CleverTapAPI cleverTapAPI = CleverTapAPI.getDefaultInstance(getApplicationContext());
    cleverTapAPI.suspendInAppNotifications();
    cleverTapAPI.setCTPushNotificationListener(this);

    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  // Push Notification Clicked callback workaround when app is in killed state
  // https://github.com/CleverTap/clevertap-react-native/blob/master/android/src/main/java/com/clevertap/react/CleverTapApplication.java#L33
  @Override
  public void onNotificationClickedPayloadReceived(final HashMap<String, Object> payload) {
      Log.e(TAG, "onNotificationClickedPayloadReceived called");
      final String CLEVERTAP_PUSH_NOTIFICATION_CLICKED = "CleverTapPushNotificationClicked";

      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
          public void run() {

              // Construct and load our normal React JS code bundle
              final ReactInstanceManager mReactInstanceManager = ((ReactApplication) getApplicationContext())
                      .getReactNativeHost().getReactInstanceManager();
              ReactContext context = mReactInstanceManager.getCurrentReactContext();
              // If it's constructed, send a notification
              if (context != null) {
                  sendEvent(CLEVERTAP_PUSH_NOTIFICATION_CLICKED, getWritableMapFromMap(payload), context);
              } else {
                  // Otherwise wait for construction, then send the notification
                  mReactInstanceManager
                          .addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                              public void onReactContextInitialized(ReactContext context) {
                                  sendEvent(CLEVERTAP_PUSH_NOTIFICATION_CLICKED, getWritableMapFromMap(payload),
                                          context);
                                  mReactInstanceManager.removeReactInstanceEventListener(this);
                              }
                          });
                  if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
                      // Construct it in the background
                      mReactInstanceManager.createReactContextInBackground();
                  }
              }

          }
      });

  }

  // https://github.com/CleverTap/clevertap-react-native/blob/master/android/src/main/java/com/clevertap/react/CleverTapApplication.java#L69
  private void sendEvent(String eventName, Object params, ReactContext context) {
      Log.e(TAG, "SEND EVENT");
      try {
          context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                  .emit(eventName, params);
          Log.e(TAG, "Sending event "+eventName);
      } catch (Throwable t) {
          Log.e(TAG, t.getLocalizedMessage());
      }
  }

  private WritableMap getWritableMapFromMap(Map<String, ? extends Object> var1) {
      JSONObject extras = var1 != null ? new JSONObject(var1) : new JSONObject();
      WritableMap extrasParams = Arguments.createMap();
      Iterator extrasKeys = extras.keys();
      while (extrasKeys.hasNext()) {
      String key = null;
      String value = null;
      try {
          key = extrasKeys.next().toString();
          value = extras.get(key).toString();
      } catch (Throwable t) {
          Log.e(TAG, t.getLocalizedMessage());
      }

      if (key != null && value != null) {
          extrasParams.putString(key, value);
      }
      }
      return extrasParams;
  }

    @Override
    public void onActivityCreated(@NonNull final Activity activity, @Nullable final Bundle savedInstanceState) {

    }

    @Override
    public void onActivityStarted(@NonNull final Activity activity) {

    }

    @Override
    public void onActivityResumed(@NonNull final Activity activity) {
        Bundle payload = activity.getIntent().getExtras();
        if (payload != null && payload.containsKey("pt_id") && (payload.getString("pt_id").equals("pt_rating")
                || payload
                .getString("pt_id").equals("pt_product_display"))) {
            NotificationManager nm = (NotificationManager) activity.getSystemService(Context.NOTIFICATION_SERVICE);
            nm.cancel(payload.getInt("notificationId"));
        }
    }

    @Override
    public void onActivityPaused(@NonNull final Activity activity) {

    }

    @Override
    public void onActivityStopped(@NonNull final Activity activity) {

    }

    @Override
    public void onActivitySaveInstanceState(@NonNull final Activity activity, @NonNull final Bundle outState) {

    }

    @Override
    public void onActivityDestroyed(@NonNull final Activity activity) {

    }

    /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.pyypl.dev.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
