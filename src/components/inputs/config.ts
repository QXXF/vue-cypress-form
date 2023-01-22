const errors = {
    notString: "Un testo non può contenere numeri",
    maxLen: "Il testo inserito è troppo lungo",
    minLen: "Il testo inserito è troppo breve",
    required: "Il campo non può essere lasciato vuoto",
    notEmail: "Inserisci una mail valida"
}

export const config = {
    minlen: 2, // Max Length
    maxlen: 50, // Max Length
    mailRe: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    stringRe: /^[^\d]*$/,
    errMsg: errors
}

export const validators = {
    REQ: (input: string | any[]) => !input.length ? config.errMsg.required : false ,
    MXLEN: (input: string | any[]) => input.length > config.maxlen ? config.errMsg.maxLen : false ,
    MNLEN: (input: string | any[]) => input.length < config.minlen ? config.errMsg.minLen : false ,
    STRING: (input: string ) => !config.stringRe.test(input) ? config.errMsg.notString : false ,
    MAIL: (input: string ) => !config.mailRe.test(input) ? config.errMsg.notEmail : false 
}

export const checkInputValidity = (value: any, validators: any): any[] => {
    return validators
        .map( (validator: any) => validator(value) )
        .filter( (x: any) => x !== false )
}