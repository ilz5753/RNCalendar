import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  ATI,
  bcAllWhite,
  bgBlack,
  bwAllh,
  cWhite,
  IconButton,
  RippableButton,
  useKeyboard,
} from "../../../components/index.mobile";
import {
  aic,
  borderRadius,
  center,
  dim,
  fontSize,
  full,
  fullWidth,
  fw,
  height,
  layout,
  padding,
  root,
  row,
  squareLayout,
} from "../../../styles";
import { noop } from "lodash";
import { useState } from "react";

export default function MobileSearch() {
  let { goBack } = useNavigation();
  let insets = useSafeAreaInsets();
  let KHStyle = useKeyboard();
  let [searchText, setSearchText] = useState("");
  return (
    <Animated.View
      style={[
        fullWidth,
        KHStyle,
        padding("t", insets.top),
        padding("b", 30),
        bgBlack,
      ]}
    >
      <Animated.View style={[fw, height(75), padding("h", 8), row, aic]}>
        <IconButton
          {...{
            Provider: Entypo,
            name: "chevron-left",
            size: 50,
            ...cWhite,
            onPress: goBack,
          }}
        />
        <Animated.View style={[layout(dim.width - 2 * 50 - 2 * 8, 50)]}>
          <ATI
            style={[full, fontSize(25.5), cWhite, padding("h", 4)]}
            placeholder="Search"
            placeholderTextColor="gray"
            value={searchText}
            onChangeText={setSearchText}
          />
        </Animated.View>
        <IconButton
          {...{
            Provider: MaterialIcons,
            name: "keyboard-voice",
            size: 50,
            ...cWhite,
            onPress: noop,
          }}
        />
      </Animated.View>
      <Animated.ScrollView></Animated.ScrollView>
    </Animated.View>
  );
}
