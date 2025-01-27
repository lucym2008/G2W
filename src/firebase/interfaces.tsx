import { Dimensions } from "react-native";

export interface Users{     //SERVE PARA PASSAR OS PARAMETROS DE CADA ITEM PARA A FLAT-LIST
    displayName: string,
    setor: string,
    tipo: string,
    email: string,
    localizacao: string,
    foto: string
}; 

export interface Vagas{     //SERVE PARA PASSAR OS PARAMETROS DE CADA ITEM PARA A FLAT-LIST
    name: string,
    salario: string,
    modalidades: string,
    fone: number,
    empresa: string,
    Experiencia: string
}; 

export const { width, height } = Dimensions.get('window');
