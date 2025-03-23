import { registerRootComponent } from 'expo';
import { ExpoRoot }  from 'expo-router';
import "./global.css"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return (
    <SafeAreaProvider >
      <SafeAreaView style={{width: deviceWidths, height: deviceHeight,}}>
      <ExpoRoot context={ctx} />;
      </SafeAreaView>
    </SafeAreaProvider>
  ) 
}
registerRootComponent(App);