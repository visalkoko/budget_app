// Module 

var BudgetController = (function() {

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem : function(type, des, value){
            var newItem, ID;
            // [1,3,4,5] = last id = 6
            // [1,3,6,8] = last id = 9

            // Create new ID (check if ID is more than 0)

            if (data.allItems[type].length > 0){

                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else{
                ID = 0;
            }
           // Check the type of inc and exp
            if (type === 'inc'){
                newItem = new Income(ID, des, value);
            }
            else if (type === 'exp'){
                newItem = new Expense(ID, des, value);
            }

            // Push all new Item to the type based on exp or inc
            data.allItems[type].push(newItem);

            // return newItem to the function
            return newItem;
        },
        testing: function(){

            console.log(data);
        }
    }

    

})();

// UIModule

var UIController = (function(){

    // easy if want to change class name
    var DOM = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        btnValue: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',

    }
    // expose the method to public
    return{

        getInput: function() {
            return {
                type : document.querySelector(DOM.type).value, // type of exp and inc
                description : document.querySelector(DOM.description).value,
                value : document.querySelector(DOM.value).value,
            }
        },
        getDOM: function(){
            return DOM;
        },

        addListItem: function(obj, type){
            var html, newHTML, element;

            // create HTML string with placeholder text
            if (type === 'inc'){
                element = DOM.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp')
            {
                element = DOM.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Replace placeholder text with some actual data
            newHTML = html.replace('%id', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);
           
            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOM.description + ', ' + DOM.value);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
            fieldsArr[0].focus();
            
        }


    } 

    

})();

var Controller = (function(BudgetCtrl, UICtrl){
    
    var setupEventListener = function(){
        var DOM = UICtrl.getDOM();
        document.querySelector(DOM.btnValue).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        })
    }

    

    var ctrlAddItem = function () {
    // Get Input from User
    var input, newItem;
    
    input = UICtrl.getInput();

    if (input.description !=='' && !isNaN(input.value) && input.value > 0){
    // Add item to the budgetController
    newItem = BudgetCtrl.addItem(input.type, input.description, input.value);
    // Display item to the UIController
    UICtrl.addListItem(newItem, input.type);

    // Clear fields
    UICtrl.clearFields();
    // Calculate the item
    }

   

    }

   return {
       init: function(){
         
           setupEventListener();
       }
   }


})(BudgetController, UIController);

Controller.init();