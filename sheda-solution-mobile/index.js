import { registerRootComponent } from 'expo';
import { ExpoRoot }  from 'expo-router';
import "./global.css"

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
