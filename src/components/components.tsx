import { Text } from "react-native-paper";
import { css } from "../style";
import { StyleProp, TextStyle } from "react-native";

export const H1 = ({ children, style }: { children?: React.ReactNode, style?: StyleProp<TextStyle> }) => <Text style={[style, css.h1]}>{children}</Text>;
export const H2 = ({ children, style }: { children?: React.ReactNode, style?: StyleProp<TextStyle> }) => <Text style={[style, css.h2]}>{children}</Text>;
export const H3 = ({ children, style }: { children?: React.ReactNode, style?: StyleProp<TextStyle> }) => <Text style={[style, css.h3]}>{children}</Text>;
