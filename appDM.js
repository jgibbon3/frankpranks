// Build a UI Controller

var UIDMController = (function () {

    var pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var DOMstrings = {

        ideaSubmit: 'idea-submit-btn',
        firstLabel: 'first-label',
        secondLabel: 'second-label',
        thirdLabel: 'third-label',
        dmOpenForm: 'open-form',
        bottomInventi: 'bottom-inventi-container',
        dmInstructions: 'term-instructions',
        dmPic: 'dm-pic',
        term1: 'term1',
        term2: 'term2'


    };

    return {

        passPics: function () {
            return pictures;
        },
        // 1. Chooses a pic randomly
        picNum: function () {
            var theNumber;

            theNumber = Math.floor(Math.random() * pictures.length);

            return theNumber;
        },

        // 2. Change the pic


        changePic: function (picNum) {

            document.getElementById(DOMstrings.dmPic).src = 'images/dm-' + picNum + '.png';

        },

        // 3. Display the terms

        displayTerms: function (midwestT, jargonT) {

            document.getElementById(DOMstrings.term1).textContent = midwestT;

            document.getElementById(DOMstrings.term2).textContent = jargonT;

        },

        getDOMstrings: function () {
            return DOMstrings;
        }

    };

})();


// Term Controller 

var termController = (function () {

    // 1. Create two banks of terms
    var midwest, jargon;

    midwest = ['Cows', 'Ope!', 'Corn', 'RVs', 'Cheese', 'Beer', 'Flannel', '4H', 'Lake Effect Snow', 'Soybeans', 'Flyover Cities', 'Small Talk', 'Bubblers', 'Puppy Chow', 'Ranch', 'Sledding', 'State Fairs', 'Cow Farts'];
    jargon = ['Blockchain', 'AI', 'Uber', 'Machine Learning', 'Big Data', 'Cloud-based', 'Augmented Reality', 'Crypto', 'Internet of Things', 'On-Demand', 'Neural Net', '5G', 'Self-driving', 'Drones'];

    return {

        // 2. Randomly select a term from each
        midwestNumber: function () {
            var daNumber;

            daNumber = Math.floor(Math.random() * midwest.length);

            return daNumber;

        },

        jargonNumber: function () {
            var daNumber;

            daNumber = Math.floor(Math.random() * jargon.length);

            return daNumber;
        },

        // 3. Submit information



        // 4. Create random bank of support messages

        // 5. Select random support message

        // 6. Pass terms
        passTerms: function () {
            return [midwest, jargon, midwest.length, jargon.length];
        }

    };

})();

var controller = (function (UIDMCtrl, termCtrl) {

    var DOMstrings = UIDMCtrl.getDOMstrings();

    var setupEventListeners = function () {

        // document.getElementById('idea-submit-btn').addEventListener('click', )

        document.getElementById(DOMstrings.ideaSubmit).addEventListener('click', submitAnswer);

        document.getElementById(DOMstrings.firstLabel).addEventListener('click', function () {
            document.getElementById(DOMstrings.firstLabel).scrollIntoView();
        });

        document.getElementById(DOMstrings.secondLabel).addEventListener('click', function () {
            document.getElementById(DOMstrings.secondLabel).scrollIntoView();
        });

        document.getElementById(DOMstrings.thirdLabel).addEventListener('click', function () {
            document.getElementById(DOMstrings.thirdLabel).scrollIntoView();
        });


    };

    var terms, midwestTerm, jargonTerm, midwestNum, jargonNum, inventiResult, pictures;

    terms = termCtrl.passTerms();

    midwestNum = termCtrl.midwestNumber();

    midwestTerm = terms[0][midwestNum];

    jargonNum = termCtrl.jargonNumber();

    jargonTerm = terms[1][jargonNum];

    console.log(jargonTerm);

    UIDMCtrl.displayTerms(midwestTerm, jargonTerm);

    pictures = UIDMCtrl.passPics();

    picNumber = UIDMCtrl.picNum();

    UIDMCtrl.changePic(pictures[picNumber]);

    var submitAnswer = function () {


        inventiResult = document.getElementById(DOMstrings.dmOpenForm).value;

        if (inventiResult === '') {
            alert('Well try something at least');
        }

        console.log(inventiResult);
        
        terms[0].splice(midwestNum, 1);
        terms[1].splice(jargonNum, 1);
    
        if (terms[0].length > 0 && terms[1].length > 0 && pictures.length > 0) {

            midwestNum = termCtrl.midwestNumber();
            jargonNum = termCtrl.jargonNumber();
            midwestTerm = terms[0][midwestNum];
            jargonTerm = terms[1][jargonNum];
            picNumber = UIDMCtrl.picNum();

            console.log(jargonNum);

            document.getElementById(DOMstrings.dmInstructions).textContent = 'Nice! How about another?';

            UIDMCtrl.displayTerms(midwestTerm, jargonTerm);
            UIDMCtrl.changePic(pictures[picNumber]);


            document.getElementById(DOMstrings.dmOpenForm).value = '';
        } else {

            document.getElementById(DOMstrings.bottomInventi).innerHTML = '<div class="final-inventi"><h2 class="final-inventi" id="last-message">That\'s all folks!<h2><br><h3 class="final-inventi" id="lastest-message">Feel free to restart the site and try new combinations</h3></div>'
        }

    };

    return {

        init: function () {
            setupEventListeners();

        }

    }

})(UIDMController, termController);

controller.init();