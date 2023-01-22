import { reactive, ref, type Ref } from "vue"
import { listaCittà, listaNazioni, listaRegioni, mailValidations, selectValidations, textValidations } from "./libs"
import { type ActiveStep, type FormStepper, inputTypes } from "./types"

export const activeStep: Ref<ActiveStep> = reactive( ref({id: 1}) )
export const descriptor: Ref<FormStepper> = reactive( ref({
    title: "Multistep Demo",
    steps: [
        {
            stepid: 1,
            title: "Primo Step",
            inputs: [
                {
                    id: 1,
                    label: "Nome",
                    type: inputTypes.TEXT,
                    placeholder: "Inserisci un nome",
                    model: null,
                    val: textValidations
                },
                {
                    id: 2,
                    label: "Cognome",
                    type: inputTypes.TEXT,
                    placeholder: "Inserisci un cognome",
                    model: null,
                    val: textValidations
                },
                {
                    id: 3,
                    label: "Email",
                    type: inputTypes.MAIL,
                    placeholder: "Inserisci un indirizzo mail",
                    model: null,
                    val: mailValidations
                },
            ]
        },
        {
            stepid: 2,
            title: "Secondo Step",
            inputs: [
                {
                    id: 1,
                    label: "Città",
                    type: inputTypes.SELECT,
                    placeholder: "Seleziona una città...",
                    model: null,
                    set: listaCittà,
                    val: selectValidations
                },
                {
                    id: 2,
                    label: "Regione",
                    type: inputTypes.SELECT,
                    placeholder: "Seleziona una regione...",
                    model: null,
                    set: listaRegioni,
                    val: selectValidations
                },
                {
                    id: 3,
                    label: "Nazione",
                    type: inputTypes.SELECT,
                    placeholder: "Seleziona una nazione...",
                    model: null,
                    set: listaNazioni,
                    val: selectValidations
                }
            ]
        }
    ]
}))