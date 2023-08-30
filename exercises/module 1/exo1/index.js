

alert(addDateTime());

function addDateTime(){
    const dateTimeNow = new Date();
    console.log(dateTimeNow.toLocaleTimeString());
    return dateTimeNow.toLocaleTimeString();
}