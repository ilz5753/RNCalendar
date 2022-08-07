import { createStackNavigator } from "@react-navigation/stack";
import { EmptyView, ToCMP } from "../components/index.mobile";
import MobileCalendar from "./features/calendar/index.mobile.js";
import WebCalendar from "./features/calendar/index.web";
import MobileSearch from "./features/search/index.mobile";
import MobileSettings from "./features/settings/index.mobile";
import WebSettings from "./features/settings/index.web";
let Stack = createStackNavigator();
export default function SM() {
  let screens = [
    {
      name: "Calendar",
      M: MobileCalendar,
      W: WebCalendar,
    },
    {
      name: "Settings",
      M: MobileSettings,
      W: WebSettings,
    },
    {
      name: "Search",
      M: MobileSearch,
      W: EmptyView,
    },
  ];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, M, W }, i) => (
        <Stack.Screen
          {...{
            key: i,
            name,
            component: ToCMP(M, W),
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
