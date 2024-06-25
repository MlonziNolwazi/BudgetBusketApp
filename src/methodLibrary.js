  function capitalizeFirstLetter(string) {
    if (!string) return ''; // Check for empty or null string
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function capitalizeFirstLetterOfEveryWord(sentence) {
    return sentence.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

export { capitalizeFirstLetter, capitalizeFirstLetterOfEveryWord }