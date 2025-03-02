function sanitizeKey(key) {
    return key.replace(/[^a-zA-Z]/g, '').toUpperCase(); // Remove non-alphabetic characters and uppercase
}

function encrypt(plaintext, key) {
    if (!plaintext || !key.match(/^[a-zA-Z ]+$/)) throw "Invalid input: Key must contain only letters.";

    let sanitizedKey = sanitizeKey(key);
    let ciphertext = "";
    let keyIndex = 0;

    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];

        if (char.match(/[a-zA-Z]/)) {
            let shift = sanitizedKey[keyIndex % sanitizedKey.length].charCodeAt(0) - 65;
            let base = char === char.toUpperCase() ? 65 : 97;
            let encryptedChar = String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            ciphertext += encryptedChar;
            keyIndex++;
        } else {
            ciphertext += char; // Maintain spaces and punctuation
        }
    }
    return ciphertext;
}

function decrypt(ciphertext, key) {
    if (!ciphertext || !key.match(/^[a-zA-Z ]+$/)) throw "Invalid input: Key must contain only letters.";

    let sanitizedKey = sanitizeKey(key);
    let plaintext = "";
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];

        if (char.match(/[a-zA-Z]/)) {
            let shift = sanitizedKey[keyIndex % sanitizedKey.length].charCodeAt(0) - 65;
            let base = char === char.toUpperCase() ? 65 : 97;
            let decryptedChar = String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
            plaintext += decryptedChar;
            keyIndex++;
        } else {
            plaintext += char;
        }
    }
    return plaintext;
}

function handleEncrypt() {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    try {
        let encryptedText = encrypt(plaintext, key);
        document.getElementById("ciphertext").value = encryptedText;
        document.getElementById("error-message").textContent = "";
    } catch (error) {
        document.getElementById("error-message").textContent = error;
    }
}

function handleDecrypt() {
    let ciphertext = document.getElementById("ciphertext").value;
    let key = document.getElementById("key").value;

    try {
        let decryptedText = decrypt(ciphertext, key);
        document.getElementById("plaintext").value = decryptedText;
        document.getElementById("error-message").textContent = "";
    } catch (error) {
        document.getElementById("error-message").textContent = error;
    }
}
