export const getDate = (str) => {
    const date = new Date(str)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// + ' ' + date.getHours() + ':' +date.getMinutes() + ':' +date.getSeconds()