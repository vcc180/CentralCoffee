import { FontAwesome, AntDesign } from "@expo/vector-icons";

export function IconFontAwesome({
    name,
    size = 24,
    color,
    style,
}) {
    return <FontAwesome  color={color} size={size} name={name} style={style}/>
}

export function IconAntDesign({
    name,
    size = 24,
    color,
    style,
}) {
    return <AntDesign  color={color} size={size} name={name} style={style}/>
}