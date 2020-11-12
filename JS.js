variables = {
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

    var calculate = function (target, txt) {
        var targetHTML, num;

        targetHTML = target.innerHTML;
        num = !isNaN(targetHTML);


        if ((num == true || targetHTML == ".") && data.value1.length == 0 && data.operation.length == 0) {
            if (targetHTML == ".") {
                data.value1.push("0" + targetHTML);
            } else {
                data.value1.push(targetHTML);
            }

        } else if ((num == true || targetHTML == ".") && data.value1.length > 0 && data.operation.length == 0) {
            if (data.value1[0].includes(".") == false) {
                data.value1[0] += targetHTML;
                console.log(data.value1[0].includes("."));
            } else if (data.value1[0].charAt(data.value1[0].length - 1) == "." && targetHTML !== ".") {
                data.value1[0] += targetHTML;
            } else if (data.value1[0].includes(".") == true && targetHTML !== ".") {
                data.value1[0] += targetHTML;
            } 

        } else if (num == false && data.value1.length > 0 && data.operation.length == 0 && targetHTML !== "C" && targetHTML !== "=" && targetHTML !== ".") {
            data.operation.push(targetHTML);
        } else if ((num == true || targetHTML == ".") && data.value1.length > 0 && data.operation.length > 0 && data.value2.length == 0) {
            if (data.value2.length == 0 && targetHTML == ".") { data.value2.push("0" + targetHTML); } else { data.value2.push(targetHTML); }
        } else if (num == true && data.value1.length > 0 && data.operation.length > 0 && data.value2.length > 0) {
            data.value2[0] += targetHTML;
        } else if (num == false && data.value1.length > 0 && data.operation.length > 0 && data.value2.length > 0 && targetHTML == "=") {
            switch (data.operation[0]) {
                case "+":
                    data.result.push(parseFloat(data.value1) + parseFloat(data.value2));
                    break;
                case "-":
                    data.result.push(parseFloat(data.value1) - parseFloat(data.value2));
                    break;
                case "x":
                    data.result.push(parseFloat(data.value1) * parseFloat(data.value2));
                    break;
                case "/":
                    data.result.push(parseFloat(data.value1) / parseFloat(data.value2));
                    break;
            }
        }

    }
    //2. przy = oblicz

    //3. wype³nij wynik
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
        variables.calc.keyboard.appendChild(square);
        squareArr.push(square);
        squareArr[i].innerHTML = variables.keyValues[i];
        squareArr[i].style.background = "#" + parseInt(Math.floor(Math.random() * 16777215).toString(16), 16);
    }

    var updateEquation = function (txt, ar) {
        if (ar.operation.length == 0 && ar.value2.length == 0) {
            variables.calc.equation.innerHTML = ar.value1[0];
        } else if (ar.value2.length == 0) {
            variables.calc.equation.innerHTML = ar.value1[0] + ar.operation[0];
        } else {
            variables.calc.equation.innerHTML = ar.value1[0] + " " + ar.operation[0] + " " + ar.value2[0];
        }
    };
        //else if (txt !== "=" && txt !== "C") {
        //    variables.calc.equation.innerHTML += " " + txt + " ";
        //}

    return {
        sqArray: function () {
         return squareArr
        },
        insertEq: function (txt, ar) {
            return updateEquation(txt, ar)
        }
    };
})();




var globalController = (function (UI, App) {

    UI.sqArray().forEach(function (t) {
        var arr;

        t.addEventListener("click", function () {
            App.calcThis(t);
            arr = App.publicTest();
            UI.insertEq(t.innerHTML, arr);
        })
    })

})(UIController, appController);