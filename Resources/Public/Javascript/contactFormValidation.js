//Client validation

function validateForm() {
    var adres, postalcode, email, phone;

    adres = document.getElementById("adres").value;
    email = document.getElementById("email").value;

    if (hasNumber(adres) === false) {
        document.getElementById("adres-validation").innerHTML = "Het opgegeven adres bevat geen huisnummer";
        console.log(email.includes("@"));
    }
    if (email.includes("@") === false) {
        document.getElementById("email-validation").innerHTML = "Het opgegeven emailadres is onjuist";
    }

    function hasNumber(string) {
        return /\d/.test(string);
    }

    return false;
}