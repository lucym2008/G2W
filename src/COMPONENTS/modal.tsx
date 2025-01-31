import { View } from "@/components/Themed";
import { Text } from "react-native";
import { BotãoInicio } from "./Botão";
import React from "react";

interface IModal {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void
}

export function Modal({isOpen, setOpen}: IModal) {
   if (isOpen) {
    return(
        <View style={{width: '100%', height: '100%', backgroundColor: "white", alignItems: "center", justifyContent: "center"}}>
            <View style={{width: 300, height: 100, backgroundColor: "red"}}>
                <Text>Ola</Text>
                <BotãoInicio onPress={() => setOpen(!isOpen)}/>
            </View>
        </View>
    )
   } else {
    return <></>;
   }
}