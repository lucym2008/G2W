import { TextInput, TextInputProps } from "react-native"

export function InputWhite({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={{
        width: "90%",
        marginTop: 10,
        height: 50,
        paddingLeft: 20,
        color: "#000",
        borderColor: '#000',
        backgroundColor: "#444",
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
      }}
      {...rest}
    />
  )
}

export function TxtInput({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={{
        width: '100%',
        height: 50,
        paddingLeft: 20,
        color: "#000",
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 0,
        fontSize: 16,
      }}
      {...rest}
    />
  )
}
