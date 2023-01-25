import { reactive, ref, type Ref } from "vue"
import { listaCittà, listaNazioni, listaRegioni, mailValidations, selectValidations, textValidations } from "./libs"
import { type ActiveStep, type FormStepper, inputTypes, type FormStep } from "./types"

const primoStep: FormStep = {
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
            type: inputTypes.TEXT,
            placeholder: "Inserisci un indirizzo mail",
            model: null,
            val: mailValidations
        }
    ]
}

const secondoStep: FormStep = {
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

// const terzoStep: FormStep = {
//     stepid: 3,
//     title: "Terzo step e oltre...",
//     inputs: [
//         {
//             id: 999,
//             label: "Ennesimo step",
//             type: inputTypes.TEXT,
//             placeholder: "Inserisci un input",
//             model: null,
//             val: textValidations
//         }
//     ]
// }

// Lo stepper è ampliabile, includendo altri descrittori 
// all'array di steps saranno renderizzati di conseguenza. 
// --- Prova a decommentare e aggiungere terzoStep a descriptor.steps ---

export const activeStep: Ref<ActiveStep> = reactive( ref({id: 1}) )
export const descriptor: Ref<FormStepper> = reactive( ref({
    title: "Multistep Demo",
    steps: [ primoStep, secondoStep ]
}))