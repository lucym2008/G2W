import { TextInput, TextInputProps } from "react-native"
import { colors } from "./global"

export function TextArea({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={{
        color: 'black',
        maxHeight: 150, // Altura ajustável da área de texto
        borderWidth: 1, // Largura da borda
        width: "90%",
        backgroundColor: colors.cinza,
        borderRadius: 9, // Bordas arredondadas
        padding: 20, // Espaçamento interno
        textAlignVertical: 'top', // Alinha o texto no topo da área de texto
        fontSize: 16, // Tamanho do texto
      }}
      {...rest}
    />
  )
}
