// Button handling

// UI Controller

var UIController = function () {

    var DOMstrings;

    DOMstrings = {
        sbStoryNext1: 'sbstories-next-btn1',
        sbStoryNext2: 'sbstories-next-btn2',
        sbStoryBack1: 'sbstories-back-btn1',
        sbStoryBack2: 'sbstories-back-btn2'
    };

    return {
        // 1. Choose Random Story

        // 2. Display story

        // 3. Replace image

        // 4. Get DOM Strings
        getDOMstrings: function () {
            return DOMstrings;
        }

    };

}();



// Controller

var controller = function (UICtrl) {

    var DOMstrings = UICtrl.getDOMstrings();

    // 1. Set up event handler
    var setupEventListener = function () {

        document.getElementById(DOMstrings.sbStoryNext1).addEventListener('click', nextButtonFunc);

        document.getElementById(DOMstrings.sbStoryNext2).addEventListener('click', nextButtonFunc);

        document.getElementById(DOMstrings.sbStoryBack1).addEventListener('click', backButtonFunc);

        document.getElementById(DOMstrings.sbStoryBack2).addEventListener('click', backButtonFunc);

    };

    var backButtonFunc = function () {
        alert('Never look back.');
    };

    var nextButtonFunc = function () {
        console.log('hit the next button');
    };

    // 2. Create function used on click

    return {
        init: function () {
            setupEventListener();
        }
    };

}(UIController);

controller.init();