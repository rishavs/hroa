export const initContext = async ({res}) => {
    // res.options.headers.push (['Powered-by', 'Pika Pika Pika Choooo'])
    res.options.headers.append('Powered-by', 'Pika Pika Pika Choooo')
}