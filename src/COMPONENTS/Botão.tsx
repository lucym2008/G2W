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
        width: '90%',
        height: 70,
        backgroundColor: colors.tituloBranco,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
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

