import { Foto } from "./foto"

export const DBFolder='usuarios';
export interface Login {
    email: string;
    login: string;
    nome: string;
    senha: string;
    foto: Foto;
}