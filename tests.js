QUnit.test('Encryption - basic test', function (assert) {
    let plaintext = "ATTACKATDAWN";
    let key = "LEMON";
    let expectedCipher = "LXFOPVEFRNHR";
    assert.equal(encrypt(plaintext, key), expectedCipher, "Encryption matches expected output.");
});

QUnit.test('Decryption - basic test', function (assert) {
    let ciphertext = "LXFOPVEFRNHR";
    let key = "LEMON";
    let expectedPlain = "ATTACKATDAWN";
    assert.equal(decrypt(ciphertext, key), expectedPlain, "Decryption matches expected output.");
});

QUnit.test('Encryption - spaces and punctuation', function (assert) {
    let plaintext = "ATTACK AT DAWN!";
    let key = "LEMON";
    let expectedCipher = "LXFOPV EF RNHR!";
    assert.equal(encrypt(plaintext, key), expectedCipher, "Handles spaces and punctuation correctly.");
});

QUnit.test('Decryption - spaces and punctuation', function (assert) {
    let ciphertext = "LXFOPV EF RNHR!";
    let key = "LEMON";
    let expectedPlain = "ATTACK AT DAWN!";
    assert.equal(decrypt(ciphertext, key), expectedPlain, "Handles spaces and punctuation correctly.");
});

QUnit.test('Encryption - mixed case', function (assert) {
    let plaintext = "AttackAtDawn";
    let key = "LeMon";
    let expectedCipher = "LxfopvEfRnhr";
    assert.equal(encrypt(plaintext, key), expectedCipher, "Handles mixed case correctly.");
});

QUnit.test('Decryption - mixed case', function (assert) {
    let ciphertext = "LxfopvEfRnhr";
    let key = "LeMon";
    let expectedPlain = "AttackAtDawn";
    assert.equal(decrypt(ciphertext, key), expectedPlain, "Handles mixed case correctly.");
});

QUnit.test('Invalid input handling', function (assert) {
    assert.throws(function () {
        encrypt("", "LEMON");
    }, "Throws error on empty plaintext");

    assert.throws(function () {
        encrypt("ATTACK", "L3M0N!");
    }, "Throws error on invalid key (contains non-letters)");

    assert.throws(function () {
        decrypt("", "LEMON");
    }, "Throws error on empty ciphertext");

    assert.throws(function () {
        decrypt("LXFOPV", "L3M0N!");
    }, "Throws error on invalid key (contains non-letters)");
});
