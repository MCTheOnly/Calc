v = {
    calculator: document.querySelector(".calcHolder"),
    calc: {
        disp: document.querySelector(".cDisplay"),
        keyboard: document.querySelector(".cButtons"),
        equation: document.querySelector(".equation"),
        result: document.querySelector(".result")
    },
    keyValues: ["%", "+/-", "C", "/", "7", "8", "9", "x", "4", "5", "6", "+", "1", "2", "3", "-", "0", ".", "="]
};


var appController = (function () {

    var data = {
        value1: [],
        value2: [],
        operation: [],
        result: []
    };


    var clearAll = function () {
        data.value1 = [];
        data.value2 = [];
        data.result = [];
        data.operation = [];
        v.calc.equation.innerHTML = "";
        v.calc.result.innerHTML = "";
    }

    var calc = function () {
        var x;
        switch (data.operation[0]) {
            case "+":
                x = parseFloat(data.value1) + parseFloat(data.value2);
                if (x % 1 !== 0) {
                    data.result.push(x.toFixed(5));
                }
                else { data.result.push(x); }
                break;
            case "-":
                x = parseFloat(data.value1) - parseFloat(data.value2);
                if (x % 1 !== 0) {
                    data.result.push(x.toFixed(5));
                }
                else { data.result.push(x); }
            case "x":
                x = parseFloat(data.value1) * parseFloat(data.value2);
                if (x % 1 !== 0) {
                    data.result.push(x.toFixed(5));
                }
                else { data.result.push(x); }
            case "/":
                if (data.value2 == 0) { alert("Nice try bro, lol"); 
                } else {
                    x = parseFloat(data.value1) / parseFloat(data.value2);
                    if (x % 1 !== 0) {
                        data.result.push(x.toFixed(5));
                    }
                    else { data.result.push(x); }
                }
                break;
            //case "%":
            //    data.
        }
    }

    var calculate = function (target, txt) {
        var targetHTML, num;

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

        } else if (num == false && data.value1.length > 0 && data.operation.length == 0 && targetHTML !== "C" && targetHTML !== "=" && targetHTML !== "." && targetHTML !== "+/-" && targetHTML !== "%") {
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
            } else if (targetHTML == "+" || targetHTML == "-" || targetHTML == "x" || targetHTML == "/") {
                calc();
                data.value1[0] = data.result[data.result.length-1];
                data.value2 = [];
                data.operation[0] = targetHTML;
            }
        }

    }

    return {
        publicTest: function () {
            return data
        },
        calcThis: function (target, txt) {
            return calculate(target, txt)
        }
    }
    })();

var UIController = (function () {

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
        if (i !== 3 && i !== 7 && i !== 11 && i !== 15 && i !== 18) {
            squareArr[i].style.background = 'url("./img/bg' + i + '.jpg")';
            console.log(i);
            squareArr[i].style.backgroundRepeat = "no-repeat";

        }
    }
    squareArr[18].style.width = "50%";
    squareArr[18].style.background = "#e62f89";
    squareArr[18].style.color = "white";

    var onClick = function (target) {
        target.style.fontSize = "2em";
        setInterval(function () {
        target.style.fontSize = "1.2em";
        }, 80);
    };

    var updateEquation = function (txt, ar) {
        if (ar.value1.length > 0 && ar.operation.length == 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = ar.value1[0];
        } else if (ar.value1.length > 0 && ar.value2.length == 0) {
            v.calc.equation.innerHTML = ar.value1[0] + " " + ar.operation[0];
        } else if (ar.value1.length > 0){
            v.calc.equation.innerHTML = ar.value1[0] + " " + ar.operation[0] + " " + ar.value2[0];
        }
        if (ar.result.length > 0) {
            v.calc.result.innerHTML = ar.result[ar.result.length - 1];
        }        
    };

    return {
        sqArray: function () {
         return squareArr
        },
        insertEq: function (txt, ar) {
            return updateEquation(txt, ar)
        },
        clickAnimation: function (target) {
            return onClick(target);
        }
    };
})();

var globalController = (function (UI, App) {

    UI.sqArray().forEach(function (t) {
        var arr, bg;

        t.addEventListener("click", function () {
            App.calcThis(t);
            arr = App.publicTest();
            UI.insertEq(t.innerHTML, arr);
            UI.clickAnimation(t);
        })

        t.addEventListener("mouseover", function () {
            bg = t.style.background;
            t.style.background = "green";
        })
        t.addEventListener("mouseout", function() {
            t.style.background = bg;
        })
    })

})(UIController, appController);