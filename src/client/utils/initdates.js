/* utility to create dates for the initial render of the photos in gallery */

// today
export const today = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (yyyy + '-' + mm + '-' + dd)
};

// last date (look back)
export const lookBackDate = () => {
    const lookBack = 3;
    const date = new Date();
    date.setDate(date.getDate() - lookBack)

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (yyyy + '-' + mm + '-' + dd)
};

