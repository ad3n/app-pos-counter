
import util from 'lodash';
import config from '~/config';
import { lang } from "~/lang"
// import { NotificationManager } from 'react-notifications'
import currencyjs from 'currency.js'
import CryptoJS from 'crypto-js'

const { isObject, capitalize, toLower, has, mapValues, findKey, join, map } = util

export const capitalizeFirstLetter = (key:string) => capitalize(key)

export const encrypt = (text:string) => {
    if ( isObject(text)) {
        return CryptoJS.AES.encrypt(JSON.stringify(text), config.cipher_crypt)
    } else {
        return CryptoJS.AES.encrypt(text, config.cipher_crypt)
    }
}

export const decryptObject = (crypted:string) => {
    const bytes = CryptoJS.AES.decrypt(crypted.toString(), config.cipher_crypt)
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return decryptedData
}

export const decrypt = (crypted:string) => {
    const bytes = CryptoJS.AES.decrypt(crypted.toString(), config.cipher_crypt)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

    return decryptedData
}

// export const createNotification = (type:string, content:string) => {
//     switch (type) {
//         case 'info':
//             NotificationManager.info(content, 'Info');
//             break;
//         case 'success':
//             NotificationManager.success(content, 'Great!');
//             break;
//         case 'warning':
//             NotificationManager.warning(content, 'Warning message');
//             break;
//         case 'error':
//             NotificationManager.error(content, 'Error message');
//             break;
//     }
// }

export const currency = (number:number) => {
    return currencyjs(number, {
        separator: ".",
        decimal: ",",
        precision: 0,
        symbol: "Rp ",
    }).format()
}

export const numberCurrency = (number:number) => {
    return currencyjs(number, {
        separator: ".",
        decimal: ",",
        precision: 0,
        symbol: "",
    }).format()
}

export const currencyRaw = (text:any) => {
    return currencyjs(text, {
        separator: ".",
        decimal: ",",
        precision: 0,
    })
}

export const priceRaw = (item:any) => {
    if (item.on_sale) {
        return currencyRaw(item.sale_price)
    }

    return currencyRaw(item.regular_price)
}

export const urlExists = (url:string) => {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
}

export const validateRequired = (data:any, filterData:any) => {
    let output:any = {}
    filterData.map((key:string) => {
        if (has(data, key) && (data[key] === '' || data[key] === null || data[key] === undefined)) {
            output[key] = lang('required.' + key)
        }
    })

    return output;
}

export const validateEmail = (email:string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isSuperadmin = (payload:any) => {
    if ( has(payload, 'id')) {
        return ( toLower(payload.role) == 'administrator' || toLower(payload.role) == 'manager') ? true : false;
    } else if ( has(payload, 'user')) {
        return ( toLower(payload.user.role) == 'administrator' || toLower(payload.user.role) == 'manager') ? true : false;
    }

    return false;
}

export const isChasier = (payload:any) => {
    if ( has(payload, 'id')) {
        return  toLower(payload.role) === 'staff' ? true : false;
    } else if ( has(payload, 'user')) {
        return toLower(payload.user.role) === 'staff' ? true : false;
    }

    return false;
}

export const transformErrorsField = (messages:Object, id:PropertyKey) => {
    if( Object.hasOwn(messages, id) ) {
        for (const [key, values] of Object.entries(messages)) {
           if( key === id) {
            return values as []
           }
        }
    }

    return null
}

// export const inputNumberOnly = (evt) => {
//     let theEvent = evt;
//     let key
//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = window.event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /[0-9]|\./;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }

export const encapsulateErrors = (data:any) => {
    let errors:Array<any> = []
    if ( has(data, 'validated')) {
        if ( has(data, 'messages') && typeof data.messages === 'object') {
            return mapValues(data.messages, (item) => {
                return join(item, "\n")
            })
        } else if ( has(data, 'messages') && typeof data.messages === 'string') {
            return data.messages
        }

        return errors;
    }

    return data
}

export const showErrors = (data:any) => {
    let errors = ''

    if ( has(data, 'messages') && typeof data.messages === 'object') {
        let combines = mapValues(data.messages, (item) => {
            return join(item, "\n")
        })

        map(combines, (item) => {
            errors += item
        })

        return errors
    } else if ( has(data, 'messages') && typeof data.messages === 'string') {
        return data.messages
    }

    return 'Warning error!';
}

export const findStatusText = (data:string) => (status:any) => {
    return findKey(data, status) ? true : false;
}

export const encodeUri = (uri:string) => {
    const str = uri.replace(" ", '%20')
    return encodeURIComponent(str)
}

export const pageTitle = (title:string) => {
    return title + " | " + config.app_title
}

export const cacheStore = (type = 'local') => {
    if (type === 'local') {
        return localStorage
    } else if (type === 'session') {
        return sessionStorage
    }
}