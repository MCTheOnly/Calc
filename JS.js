'use strict';

const v = {
    calculator: document.querySelector(".calcHolder"),
    calc: {
        disp: document.querySelector(".cDisplay"),
        keyboard: document.querySelector(".cButtons"),
        equation: document.querySelector(".equation"),
        result: document.querySelector(".result")
    },
    keyValues: ["%", "+/-", "C", "/", "7", "8", "9", "*", "4", "5", "6", "+", "1", "2", "3", "-", "0", ".", "="],
    operators: ["+", "-", "*", "/", "%"],
    forbidden: ["C", "=", ".", "+/-"]
};

console.log(v.keyValues.includes("+"));

const appController = (() => {

    const data = {
        value1: [],
        value2: [],
        operation: [],
        result: []
    };


    const clearAll = () => {
        data.value1 = [];
        data.value2 = [];
        data.result = [];
        data.operation = [];
        v.calc.equation.innerHTML = "";
        v.calc.result.innerHTML = "";
    };

    const calc = () => {
        let val1, val2, valRes, valMod, valPush, pusher;

        val1 = parseFloat(data.value1);
        val2 = parseFloat(data.value2);
        valRes = eval(`${val1} ${data.operation[0]} ${val2}`);
        valPush = (outcome) => data.result.push(outcome);
        pusher = (outcome) => {
            valMod = (valRes % 1) != 0;
            if (valMod) { valPush(outcome.toFixed(5)); }
            else { valPush(outcome); };
        };
        pusher(valRes);
    };

    const calculate = (target, txt) => {
        let targetHTML, num, numDot, val1Check, val2Check, opCheck, operators, forbidden, dot;

        targetHTML = target.innerHTML;
        num = !isNaN(targetHTML);
        dot = targetHTML == ".";
        numDot = (num || dot);
        val1Check = data.value1.length == 0;
        val2Check = data.value2.length == 0;
        opCheck = data.operation.length == 0;
        operators = v.operators.includes(targetHTML);
        forbidden = v.forbidden.includes(target);


        if (targetHTML == "C") { clearAll(); };

        if (numDot && val1Check && opCheck) {
            if (dot) {
                data.value1.push("0.");
            } else { data.value1.push(targetHTML); }
        } else if (numDot && !val1Check && opCheck) {
            if (data.value1[0].includes(".") == true && dot) {
            } else { data.value1[0] += targetHTML; }
        } else if (!num && !val1Check && opCheck && !forbidden) {
            data.operation.push(targetHTML);
        } else if (numDot && !val1Check && !opCheck && val2Check) {
            if (data.value2.length == 0 && dot) {
                data.value2.push("0.");
            } else { data.value2.push(targetHTML); }
        } else if (numDot && !val1Check && !opCheck && !val2Check) {
            if (data.value2[0].includes(".") && dot) {
            } else { data.value2[0] += targetHTML; }
        } else {
            if (targetHTML == "=") {
                calc();
            } else if (operators) {
                calc();
                data.value1[0] = data.result[data.result.length - 1];
                data.value2 = [];
                data.operation[0] = targetHTML;
            };
        };
    };

    return {
        publicTest: () => {
            return data
        },
        calcThis: (target, txt) => {
            return calculate(target, txt)
        }
    }
    })();

const UIController = (() => {

    const squareArr = [];

    for (let i = 0; i < 19; i++) {
        const square = document.createElement("div");
        square.classList.add("button");
        v.calc.keyboard.appendChild(square);
        squareArr.push(square);

        squareArr[i].innerHTML = v.keyValues[i];

        if (i == 3 || i == 7 || i == 11 || i == 15) {
            squareArr[i].style.background = "#9156e1";
            squareArr[i].style.color = "white";
            squareArr[i].style.backgroundRepeat = "no-repeat";
        };
        if (i != 3 && i != 7 && i != 11 && i != 15 && i != 18) {
            squareArr[i].style.background = `url("./img/bg${i}.jpg")`;
            squareArr[i].style.backgroundRepeat = "no-repeat";

        };
    };
    squareArr[18].style.width = "50%";
    squareArr[18].style.background = "#e62f89";
    squareArr[18].style.color = "white";

    const onClick = (target) => {
        target.style.fontSize = "2em";
        setInterval(function () {
        target.style.fontSize = "1.2em";
        }, 80);
    };

    const updateEquation = (txt, ar) => {
        if (ar.value1.length > 0 && ar.operation.length == 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = ar.value1[0];
        } else if (ar.value1.length > 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = `${ar.value1[0]} ${ar.operation[0]}`;
        } else if (ar.value1.length > 0){
            v.calc.equation.innerHTML = `${ar.value1[0]} ${ar.operation[0]} ${ar.value2[0]}`;
        };
        if (ar.result.length > 0) {
            v.calc.result.innerHTML = ar.result[ar.result.length - 1];
        };
    };

    return {
        sqArray: () => {
         return squareArr
        },
        insertEq: (txt, ar) => {
            return updateEquation(txt, ar)
        },
        clickAnimation: (target) => {
            return onClick(target);
        }
    };
})();

const globalController = ((UI, App) => {

    UI.sqArray().forEach((t) => {
        let arr, bg;

        t.addEventListener("click", () => {
            App.calcThis(t);
            arr = App.publicTest();
            UI.insertEq(t.innerHTML, arr);
            UI.clickAnimation(t);
        });
        t.addEventListener("mouseover", () => {
            bg = t.style.background;
            t.style.background = "green";
        });
        t.addEventListener("mouseout", () => {
            t.style.background = bg;
        });
    });
})(UIController, appController);