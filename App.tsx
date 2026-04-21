import { SignupProvider } from "./src/context/SignupContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SignupProvider>
      <AppNavigator />
    </SignupProvider>
  );
}
