'use strict';

let v = {
    calculator: document.querySelector(".calcHolder"),
    calc: {
        disp: document.querySelector(".cDisplay"),
        keyboard: document.querySelector(".cButtons"),
        equation: document.querySelector(".equation"),
        result: document.querySelector(".result")
    },
    keyValues: ["%", "+/-", "C", "/", "7", "8", "9", "x", "4", "5", "6", "+", "1", "2", "3", "-", "0", ".", "="],
};

let appController = (() => {

    let data = {
        value1: [],
        value2: [],
        operation: [],
        result: []
    };


    let clearAll = () => {
        data.value1 = [];
        data.value2 = [];
        data.result = [];
        data.operation = [];
        v.calc.equation.innerHTML = "";
        v.calc.result.innerHTML = "";
    }

    let calc = () => {
        let val;
        switch (data.operation[0]) {
            case "+":
                val = parseFloat(data.value1) + parseFloat(data.value2);
                if (val % 1 != 0) {
                    data.result.push(val.toFixed(5));
                }
                else { data.result.push(val); }
                break;
            case "-":
                val = parseFloat(data.value1) - parseFloat(data.value2);
                if (val % 1 != 0) {
                    data.result.push(val.toFixed(5));
                }
                else { data.result.push(val); }
                break;
            case "x":
                val = parseFloat(data.value1) * parseFloat(data.value2);
                if ((val % 1) != 0) {
                    data.result.push(val.toFixed(5));
                }
                else {
                    data.result.push(val);
                }
                break;
            case "/":
                if (parseFloat(data.value2) == 0) { alert("Nice try bro, lol"); 
                } else {
                    val = parseFloat(data.value1) / parseFloat(data.value2);
                    if (val % 1 != 0) {
                        data.result.push(val.toFixed(5));
                    }
                    else { data.result.push(val); }
                }
                break;
            case "%":
                val = parseFloat(data.value2) / parseFloat(data.value1);
                if ((val % 1) != 0) {
                    data.result.push(val.toFixed(5));
                }
                else {e
                    data.result.push(val);
                }
                break;
        }
    }

    let calculate = (target, txt) => {
        let targetHTML, num;

        targetHTML = target.innerHTML;
        num = !isNaN(targetHTML);


        if (targetHTML == "C") {
            clearAll();
        }

        if ((num == true || targetHTML == ".") && data.value1.length == 0 && data.operation.length == 0) {
            if (targetHTML == ".") {
                data.value1.push("0" + targetHTML);
            } else {
                data.value1.push(targetHTML);
            }

        } else if ((num == true || targetHTML == ".") && data.value1.length > 0 && data.operation.length == 0) {
            if (data.value1[0].includes(".") == true && targetHTML == ".") {
            } else {
                data.value1[0] += targetHTML;
            }

        } else if (num == false && data.value1.length > 0 && data.operation.length == 0 && targetHTML != "C" && targetHTML != "=" && targetHTML != "." && targetHTML != "+/-") {
            data.operation.push(targetHTML);

        } else if ((num == true || targetHTML == ".") && data.value1.length > 0 && data.operation.length > 0 && data.value2.length == 0) {
            if (data.value2.length == 0 && targetHTML == ".") {
                data.value2.push("0" + targetHTML);
            } else {
                data.value2.push(targetHTML);
            }

        } else if ((num == true || targetHTML == ".") && data.value1.length > 0 && data.operation.length > 0 && data.value2.length > 0) {
            if (data.value2[0].includes(".") && targetHTML == ".") {
            } else {
                data.value2[0] += targetHTML;
            }

        } else if (data.value1.length > 0 && data.operation.length > 0 && data.value2.length > 0 ) {
            if (targetHTML == "=") {
                calc();
            } else if (targetHTML == "+" || targetHTML == "-" || targetHTML == "x" || targetHTML == "/" || targetHTML == "%") {
                calc();
                data.value1[0] = data.result[data.result.length-1];
                data.value2 = [];
                data.operation[0] = targetHTML;
            }
        }

    }

    return {
        publicTest: () => {
            return data
        },
        calcThis: (target, txt) => {
            return calculate(target, txt)
        }
    }
    })();

let UIController = (() => {

    let squareArr = [];

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

        }
        if (i != 3 && i != 7 && i != 11 && i != 15 && i != 18) {
            squareArr[i].style.background = `url("./img/bg${i}.jpg")`;
            squareArr[i].style.backgroundRepeat = "no-repeat";

        }
    }
    squareArr[18].style.width = "50%";
    squareArr[18].style.background = "#e62f89";
    squareArr[18].style.color = "white";

    let onClick = (target) => {
        target.style.fontSize = "2em";
        setInterval(function () {
        target.style.fontSize = "1.2em";
        }, 80);
    };

    let updateEquation = (txt, ar) => {
        if (ar.value1.length > 0 && ar.operation.length == 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = ar.value1[0];
        } else if (ar.value1.length > 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = `${ar.value1[0]} ${ar.operation[0]}`;
        } else if (ar.value1.length > 0){
            v.calc.equation.innerHTML = `${ar.value1[0]} ${ar.operation[0]} ${ar.value2[0]}`;
        }
        if (ar.result.length > 0) {
            v.calc.result.innerHTML = ar.result[ar.result.length - 1];
        }        
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

let globalController = ((UI, App) => {

    UI.sqArray().forEach((t) => {
        let arr, bg;

        t.addEventListener("click", () => {
            App.calcThis(t);
            arr = App.publicTest();
            UI.insertEq(t.innerHTML, arr);
            UI.clickAnimation(t);
        })

        t.addEventListener("mouseover", () => {
            bg = t.style.background;
            t.style.background = "green";
        })
        t.addEventListener("mouseout", () => {
            t.style.background = bg;
        })
    })

})(UIController, appController);