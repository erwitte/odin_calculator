const divs = document.querySelectorAll(".eingabe");
const eingabefeld = document.querySelector("#calculator");
const del = document.querySelector("#del");
const equals = document.querySelector("#equals");
let rechnungDurchgefuert = 0;

for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("mouseenter", () => {
        divs[i].classList.add("focus");
    });
    divs[i].addEventListener("mouseleave", () => {
        divs[i].classList.remove("focus");
    });
    divs[i].addEventListener("click", () => {
        let eingabe = eingabePruefen(divs[i].textContent);
        let eingabeSpeicherung = eingabefeld.textContent;
        eingabefeld.textContent = eingabeSpeicherung + eingabe;
    });
}

del.addEventListener("mouseenter", () => {
    del.classList.add("focus");
});

del.addEventListener("mouseleave", () => {
    del.classList.remove("focus");
});

del.addEventListener("click", () => {
    eingabefeld.textContent = "";
});

equals.addEventListener("mouseenter", () => {
    equals.classList.add("focus");
});

equals.addEventListener("mouseleave", () => {
    equals.classList.remove("focus");
});

equals.addEventListener("click", () => {
    if (!equals.textContent == "") {
        let ergebnis;
        let eingaben = [];
        eingaben = eingabefeld.textContent.split(" ");
        if (!eingaben[eingaben.length - 1] == "") {
            ergebnis = ausrechnen(eingaben);
            eingabefeld.textContent = ergebnis;
        }
    }
});

function eingabePruefen(div) {
    let bisherigeEingaben = [];
    if (rechnungDurchgefuert == 1) {
        eingabefeld.textContent = "";
        rechnungDurchgefuert = 0;
    }
    if (!eingabefeld.textContent == "") {
        bisherigeEingaben = eingabefeld.textContent.split("");
        let letzteEingabe = bisherigeEingaben[bisherigeEingaben.length - 1]
        if (letzteEingabe == " " && (div == "+" || div == "-" || div == "*" || div == "/")) return "";
        else if (div == "+" || div == "-" || div == "*" || div == "/") return " " + div + " ";
        return div;
    }
    if (div == "+" || div == "-" || div == "*" || div == "/") return "";
    return div;
}

function ausrechnen(eingaben) {
    let ergebnis = 0;
    if (eingaben[0]) ergebnis = eingaben[0];
    for (let i = 1; i < eingaben.length - 1; i++) {
        switch (eingaben[i]) {
            case "+": ergebnis = Number(ergebnis) + Number(eingaben[i + 1]);
                break;
            case "-": ergebnis = Number(ergebnis) - Number(eingaben[i + 1]);
                break;
            case "*": ergebnis = Number(ergebnis) * Number(eingaben[i + 1]);
                break;
            case "/": 
                
                ergebnis = Number(ergebnis) / Number(eingaben[i + 1]);
                break;
        }
    }
    rechnungDurchgefuert = 1;
    if (ergebnis == "Infinity") ergebnis = "unmoeglich";
    return ergebnis;
}