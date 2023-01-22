import { checkInputValidity } from "./components/inputs/config"
import { descriptor, activeStep } from "./store"
import type { FormStep, Input } from "./types"

export const updateFormState = ( id: number, val: any[], value: any ): any[] => {
    // Recupera l'indice del FormStep tramite #activeStep id
    // Recupera l'indice dell'input modificato tramite @arg id
    const stepIdx = descriptor.value.steps.findIndex( (item: FormStep) => item.stepid === activeStep.value.id )
    const inputIdx = descriptor.value.steps[ stepIdx ].inputs.findIndex( (item: Input) => item.id === id )

    // Assegna @arg value all'altezza richiesta
    descriptor.value.steps[ stepIdx ].inputs[ inputIdx ].model = value

    // Calcola la presenza di errori in base ai validatori inclusi nel descrittore
    // Includo nel model un flag che descrive la presenza di uno o piu errori
    const errors = checkInputValidity( value, val )
    descriptor.value.steps[ stepIdx ].inputs[ inputIdx ].errors = errors.some( (x: any) => typeof x === 'string')

    // Dopo aver assegnato il value, ritorna (se presenti), una lista di errori
    return errors
}

export const getDescriptorValues = () => {
    // Estrae label e value dal descriptor per gli input valorizzati
    let results: any[] = []
    descriptor.value.steps.forEach( step => {
        step.inputs.forEach( ({label, model}) => {
            if ( model ) results.push({ label: label, value: model })
        })
    })
    return results
}