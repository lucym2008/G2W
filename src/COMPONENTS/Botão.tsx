import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { colors } from "./global"
import { width } from "../firebase/interfaces"

export function Botão({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        width: width * 1,
        height: 60,
        backgroundColor: colors.amarelo1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...rest}
    />
    
  )
}

export function BotãoInicio({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        width: '75%',
        height: 60,
        backgroundColor: colors.amarelo1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...rest}
    />
  )
}

export function BotãoRedondo({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        backgroundColor: colors.amarelo1,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...rest}
    />
  )
}

