import id from "./id"
import en from "./en"
import config from "../config"
import utils from "lodash"

const {  startsWith, capitalize, template } = utils
export const lang = (key:string) => {
    const idLang = config.lang_id
    let lang

    switch (idLang) {
        case 'en':
            lang = en()
            break;

        case 'id':
            lang = id()
            break;

        default:
            lang = en()
            break;
    }

    return resolver(lang, key)
}


const resolver = (lang:Map<any, any>, key:string) => {
    if (lang.has(key)) {
        return lang.get(key)
    }

    if ( startsWith(key, "required.", 0)) {
        const start = "required.".length
        let field = key.slice(start)
        const compiled = template(lang.get("required_field"))

        if (lang.has(field)) {
            field = lang.get(field)
        } else {
            field = backwardsLang(field)
        }

        return compiled({ 'field': field })
    }

    return backwardsLang(key)
}

const backwardsLang = (key:string) => {
    return capitalize(key).replace("_", " ")
}
