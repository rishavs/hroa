export const setAPIHeaders = async ({res}) => {
    res.options.headers = new Headers({
        'Content-Type': 'application/json'
    });
}
