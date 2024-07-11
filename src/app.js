let result = document.querySelector(".result")
let buttons=document.querySelectorAll(".number")
let operators = document.querySelectorAll(".operator");
let equal = document.querySelector(".equal");
let clear = document.querySelector(".clear");
let delete_button= document.querySelector(".delete");
let inputs = Array.from(buttons)
operators = Array.from(operators)
class stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
    }
    expression() {
        return this.items
    }
   clear() {
    this.items = [];
  }
 
}

let equation = new stack()
let first = "";
inputs.forEach(button => {
    button.addEventListener("click", function () {
        result.innerHTML += button.value;
        first += button.value;

         equation.push(button.value);

    })
});



operators.forEach(operator => {
    operator.addEventListener("click", function () {
        result.innerHTML += " " + operator.value + " ";
       
        equation.push(operator.value);
      
    })
});

equal.addEventListener("click", function () {
    let formula= result.innerHTML;
    let lastChar = formula[formula.length - 1];
    if (operators.includes(lastChar) || lastChar === " ") {
        formula= formula.slice(0, -1);
    }
    let solved = getResult();
    if (solved == undefined) {
        alert("Error: Division by zero");
        result.innerHTML =""
    } else {
        if (solved % 1!= 0) {
            solved = solved.toFixed(2);
        } else {
            solved = Math.round(solved);
        }
         result.innerHTML = solved;
         equation.clear();
         equation.push(solved);
    }
   
});


function getResult() {
   
    let num;
    let char; 
    let temp=""
    for (let i = 0; i < equation.expression().length; i++){
        if (Number(equation.expression()[i])) {
            temp += equation.expression()[i];
        }
        else {
            char = equation.expression()[i];
            num = temp;
            temp = "";
        }
    }

     num = Number(num);
     
    let num2 = Number(temp);
    let solved;
    switch (char) {
        case '+':
            solved = num + num2;
            break;
        case '-':
            solved = num - num2;
            break;
        case '*':
            solved = num * num2;
            break;
        case '/': {
            
            if (num2===0) {
                solved = "Error: Division by zero";
                break;
            } else {
                solved = num / num2;
                break;
            }
        }
            
        default:
            break;
    }
   

    return solved
    
}

clear.addEventListener("click", () => {
    result.innerHTML = "";
})

function davidByZero(num) {
    return true

}

delete_button.addEventListener("click", () => {
    let formula = result.innerHTML;
    result.innerHTML = formula.slice(0, -1);
    equation.pop();
})
