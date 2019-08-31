/*

A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once.

Given a string, detect whether or not it is a pangram. 
Return True if it is, False if not.

If the given string has any uppercase or numbers, it should return false

*/

function isPangram(string) {
    let allLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let arr = string.split('')
    for (let letter of arr) {
        let ind = allLetters.indexOf(letter.toLowerCase())
        if (ind > -1)
            allLetters.splice(ind, 1)
    }
    return allLetters.length == 0
}

module.exports = {
    isPangram
};