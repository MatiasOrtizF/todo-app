import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import Main from './src/components/Main.jsx';
import Login from './src/screen/Login.jsx';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Main" component={Main} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}