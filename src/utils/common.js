import moment from 'moment';
import jwt from 'jsonwebtoken'
export const timestampToDate = (timestamp, format = 'DD/MM/YYYY') => {
    const day = moment.unix(timestamp);
    return day.format(format);
}

export const momentObjectToDateString = (momentObject, format = 'DD/MM/YYYY') => {
    const day = moment(momentObject);
    return day.format(format);
}

export const getCurrentTimestamp = () => {
    return Math.ceil(new Date().getTime() / 1000);
}

export const isAuth = (token) => {
    try{
        const { exp } = jwt.decode(token);
        return exp > getCurrentTimestamp();
    }catch(err){
        console.log(err);
        return false;
    }
}
