export const dateFormats = [
    'YYYY/MM/DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'MM-DD-YYYY',
    'DD-MM-YYYY',
    'Month D, Yr',
    'D Month Yr'
];

export const timeFormats = [
    {
        label: '12 hour',
        value: '12h'
    },
    {
        label: '24 hour',
        value: '24h'
    }
];

export const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const zeroPadding = (num, places) => String(num).padStart(places, '0');


export const getFormattedTime = (date, format) => {
    const now = date ? new Date(date) : new Date();
    if (format === '12h') {
        let hours = now.getHours();
        const minutes = zeroPadding(now.getMinutes(), 2);
        const seconds = zeroPadding(now.getSeconds(), 2);
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${zeroPadding(hours, 2)}:${minutes}:${seconds} ${ampm}`;
    } else {
        const hours = zeroPadding(now.getHours(), 2);
        const minutes = zeroPadding(now.getMinutes(), 2);
        const seconds = zeroPadding(now.getSeconds(), 2);
        return `${hours}:${minutes}:${seconds}`;
    }
}

export const getFormattedDate = (date, format) => {
    const now = date ? new Date(date) : new Date();
    const month = zeroPadding(now.getMonth() + 1, 2);
    const day = zeroPadding(now.getDate(), 2);
    const year = now.getFullYear();
    const monthName = now.toLocaleString('default', { month: 'long' });

    let week = `(${weeks[now.getDay()]})`;

    let result = '';

    if (format === 'YYYY/MM/DD') {
        result = `${year}/${month}/${day}`;
    } else if (format === 'MM/DD/YYYY') {
        result = `${month}/${day}/${year}`;
    } else if (format === 'DD/MM/YYYY') {
        result = `${day}/${month}/${year}`;
    } else if (format === 'YYYY-MM-DD') {
        result = `${year}-${month}-${day}`;
    } else if (format === 'MM-DD-YYYY') {
        result = `${month}-${day}-${year}`;
    } else if (format === 'DD-MM-YYYY') {
        result = `${day}-${month}-${year}`;
    } else if (format === 'Month D, Yr') {
        result = `${monthName} ${day}, ${year}`;
    } else if (format === 'D Month Yr') {
        result = `${day} ${monthName} ${year}`;
    }

    return result + ' ' + week;
}

const STORAGE_KEY = 'clock_app_';

export class Storage {

    static set(key, value) {
        key = STORAGE_KEY + key;
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        key = STORAGE_KEY + key;
        return JSON.parse(localStorage.getItem(key));
    }

    static remove(key) {
        key = STORAGE_KEY + key
        localStorage.removeItem(key);
    }
}
