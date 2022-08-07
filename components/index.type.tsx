import { Ref } from 'react';
import { ColorValue, GestureResponderEvent, ScrollView, ViewProps } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { mpbcbwType } from '../style';
type Ripple = {
    color: ColorValue;
    // radius: number;
    borderless: boolean;
    duration: number;
};
export type RippleButtonProps = Animated.AnimateProps<ViewProps> & {
    onPress: (event: GestureResponderEvent) => void;
    onPressIn: (event: GestureResponderEvent) => void;
    onPressOut: (event: GestureResponderEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    ripple: Ripple;
    disabled: boolean;
};
export type Vector<T> = {
    x: SharedValue<T>;
    y: SharedValue<T>;
}
export interface LocalAnimationVariables {
    useVector<T>(x: T, y: T): Vector<T>;
}
export type GapProps = {
    size: number;
    type: mpbcbwType;
}
export type FullWidthPagerProps = {
    data: Array<any>;
    Height: number | string;
    onSwipePrev: (index: number) => void;
    onSwipeNext: (index: number) => void;
}
export type FullWidthPagerState = {
    activePage: number;
    svRef: Ref<ScrollView>
}
