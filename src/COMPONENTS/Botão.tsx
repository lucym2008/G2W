import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { colors } from "./global"

export function Botão({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 60,
        backgroundColor: colors.amarelo1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
      }}
      {...rest}
    />
    
  )
}

export function BotãoInicio({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        backgroundColor: colors.amarelo1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...rest}
    />
  )
}

