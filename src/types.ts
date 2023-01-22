export interface ActiveStep {
    id: number
}

export interface FormStepper {
    title: string,
    steps: FormStep[]
}

export interface FormStep {
    stepid: number
    title: string,
    inputs: Input[],
}

export interface Input {
    id: number
    label: string,
    type: string,
    model: any | null,
    set?: any[],
    val?: void[],
    errors?: boolean
}

export enum inputTypes {
    TEXT = 'text',
    MAIL = 'mail',
    SELECT = 'select'
}