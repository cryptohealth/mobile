/**
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  Platform,
  BackHandler,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import WebView from 'react-native-webview';

const App: () => React$Node = () => {
  const [webView, setWebView] = useState({
    webView: useRef(),
    canGoBack: false,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress());
    }
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }, []);

  function onAndroidBackPress() {
    if (webView.canGoBack && webView.ref) {
      webView.webView.ref.goBack();
      return true;
    }
    return false;
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled
      style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{
          uri: 'https://cryptohealth-dev.surge.sh/',
        }}
        ref={webView.webView}
        onNavigationStateChange={navState => {
          setWebView({...webView, canGoBack: navState.canGoBack});
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default App;
