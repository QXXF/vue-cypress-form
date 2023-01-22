import { validators } from "./components/inputs/config"

export const listaCittà = [
    {
        id: 1,
        label: "Milano"
    },
    {
        id: 2,
        label: "Roma"
    },
    {
        id: 3,
        label: "Napoli"
    },
    {
        id: 4,
        label: "Altro..."
    }
]

export const listaRegioni = [
    {
        id: "A1",
        label: "Lombardia"
    },
    {
        id: "B2",
        label: "Lazio"
    },
    {
        id: "C3",
        label: "Campania"
    },
    {
        id: "EE",
        label: "Altro..."
    }
]

export const listaNazioni = [
    {
        id: "IT",
        label: "Italia"
    },
    {
        id: "FR",
        label: "Francia"
    },
    {
        id: "UK",
        label: "Regno Unito"
    },
    {
        id: "OT",
        label: "Altro..."
    }
]

export const selectValidations = [
    validators.REQ
]

export const textValidations = [
    validators.REQ,
    validators.MXLEN,
    validators.MNLEN,
    validators.STRING
]

export const mailValidations = [
    validators.REQ,
    validators.MXLEN,
    validators.MNLEN,
    validators.MAIL
]