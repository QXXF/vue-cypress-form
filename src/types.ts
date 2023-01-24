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
    type: any,
    model: any | null,
    set?: any[],
    errors?: boolean,
    placeholder?: string,
    val?: ((input: string) => string | false)[]
}

export enum inputTypes {
    TEXT = 'text',
    MAIL = 'mail',
    SELECT = 'select'
}