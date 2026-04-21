import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "../screens/Homepage";
import LoginScreen from "../screens/Login";
import Money from "../screens/Money";
import Profile from "../screens/Profile";
import Signup1Screen from "../screens/Signup1";
import Signup2Screen from "../screens/Signup2";
import Signup3Screen from "../screens/Signup3";
import SignupSuccess from "../screens/SignupSuccess";
import WelcomeScreen from "../screens/Welcome";
import History from "../screens/History";
import Document from "../screens/Document";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup1: undefined;
  Signup2: undefined;
  Signup3: undefined;
  SignupSuccess: undefined;
  Homepage: undefined;
  Profile: undefined;
  Money: undefined;
  History: undefined;
  Document: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup1" component={Signup1Screen} />
        <Stack.Screen name="Signup2" component={Signup2Screen} />
        <Stack.Screen name="Signup3" component={Signup3Screen} />
        <Stack.Screen name="SignupSuccess" component={SignupSuccess} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Money" component={Money} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Document" component={Document} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
