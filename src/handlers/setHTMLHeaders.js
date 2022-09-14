export const setHTMLHeaders = async ({res}) => {
    // res.options.headers.push (['Content-Type', 'text/html; charset=UTF-8'])
    res.options.headers.append('Content-Type', 'text/html; charset=UTF-8')

}
