

export const incrementYearBy = ( yearIncrement, departureDate? ) => {
    var d = departureDate || new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + yearIncrement, month, day);
    console.log(c);

    return c;
} 