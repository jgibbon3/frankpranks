// Pic Controller

var UIController = (function () {

    var pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    var DOMstrings = {

        jakePic: 'jake-pic',
        jakeQuestion: 'the_question',
        jakeAnswer0: 'answer_0',
        jakeAnswer1: 'answer_1',
        jakeAnswer2: 'answer_2',
        jakeSelectAnswer: '.select_answer',
        jakeQContainer: '.question',
        jakeNext: '#next_q'

    };

    return {

        passPics: function () {
            return pictures;
        },

        choosePicNum: function () {

            var picNumber,

                picNumber = Math.floor((Math.random() * pictures.length));

            return picNumber;

        },

        changePic: function (picNum) {

            document.getElementById(DOMstrings.jakePic).src = 'images/jake-' + picNum + '.png';

        },

        displayQuestion: function (question) {
            document.getElementById(DOMstrings.jakeQuestion).textContent = question;
        },

        displayAnswers: function (answer) {
            document.getElementById(DOMstrings.jakeAnswer0).textContent = answer[0];

            document.getElementById(DOMstrings.jakeAnswer1).textContent = answer[1];
            document.getElementById(DOMstrings.jakeAnswer2).textContent = answer[2];

        },

        showResult: function (result, picNum, pictures, score) {

            var html, newHtml;

            html = '<div class="score"><h3 id="correct">%correct%<h3><h4 id="score_report">%score%</h4></div><button type="submit" class="select_answer" id="next_q">Next Question</button>'

            newHtml = html.replace('%score%', 'Score = ' + score);


            if (result) {

                newHtml = newHtml.replace('%correct%', 'Right!!!');
                document.getElementById(DOMstrings.jakePic).src = 'images/jake-' + pictures[picNum] + '-right.png';

            } else {
                newHtml = newHtml.replace('%correct%', 'Wrong:-\(');
                document.getElementById(DOMstrings.jakePic).src = 'images/jake-' + pictures[picNum] + '-wrong.png';
            }

            document.querySelector(DOMstrings.jakeQContainer).innerHTML = newHtml;

        },

        returnQuestion: function () {
            var html = '<div class="actual_question" id="the_question">This is where the q will be</div><div class="answers-container"><div class="answer-button" id="first-button"><button class="mult-choice" id="answer_0" value=0>Hey</button></div><div class="answer-button" id="second-button"><button class="mult-choice" id="answer_1" value=1>What</button></div><div class="answer-button" id="third-button"><button class="mult-choice" id="answer_2" value=2>Up</button></div></div><button type="submit" class="select_answer" id="submitter">Submit</button>'

            document.querySelector(DOMstrings.jakeQContainer).innerHTML = html;
        },

        getDOMstrings: function () {
            return DOMstrings;
        }

    }

})();

var qController = (function () {

    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    var q1 = new Question('Where does the South in South Bend come from?', ['Dr. South, the founder of the city', 'It is the South part of the river', 'North Bend was taken'], 0);

    var q2 = new Question('How did the monks choose South Bend to build Notre Dame?', ['They saw a vision come from the lake', 'The mule they came in on died', 'God told them'], 1);

    var q3 = new Question('Where did Sample St get it\'s name?', ['No one knows to this day', 'It was a placeholder, but they forgot before they published the map', 'It as named after Maximilian Sampele, an early community leader'], 1);

    var q4 = new Question('Why did they name it \'Studebaker\'?', ['The original family that founded the company was named Studebaker', 'They used a oujia board', 'It was founded by studious bakers who were not the best spellers'], 2);

    var q5 = new Question('What did Studebaker produce?', ['Wagon parts', 'Cars', 'Bricks'], 2);

    var q6 = new Question('How did South Bend Chocolate Factory get started?', ['Studebaker rebranded', 'There was a deadly chocolate surplus and it was the best available solution', 'That\'s a thing?'], 0);

    var questions = [q1, q2, q3, q4, q5, q6];

    return {

        passQuestion: function () {
            return questions;
        },

        selectNum: function (questions) {
            var qNum,

                qNum = Math.floor(Math.random() * questions.length);

            return qNum;

        },

        checkAnswer: function (answer, correct, score) {

            var result;

            if (answer === correct) {
                result = true;
                score = score + 1;


            } else {
                result = false;
            }

            return result;

        },

        checkScore: function (result, score) {
            if (result) {
                score = score + 1;
            } else {
                score = score;
            }

            return score;
        }

    };

})();

// Control
var controller = (function (UICtrl, qCtrl) {

    // Event Listener
    var checkedBox, DOMstrings;

    DOMstrings = UICtrl.getDOMstrings();

    var setupEventListeners = function () {
        var mult1 = document.getElementById(DOMstrings.jakeAnswer0);
        var mult2 = document.getElementById(DOMstrings.jakeAnswer1);
        var mult3 = document.getElementById(DOMstrings.jakeAnswer2);

        var multChoices = [mult1, mult2, mult3];

        for (var i = 0; i < multChoices.length; i++) {
            multChoices[i].addEventListener("click", function () {

                var current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace("active", "");
                }

                this.className += " active";

                checkedBox = parseInt(this.value);

            })
        }

        document.querySelector(DOMstrings.jakeSelectAnswer).addEventListener('click', triedAnswer);

        document.getElementById('secret-pic').addEventListener('click', function() {
            document.getElementById('secret-pic').innerHTML = '<img src="images/secret-pic.png" id="secret-pic-1">';
        });

    };

    var questions, theNumber, theQuestion, picNumber, daAnswer, score, totalQ;

    score = 0;

    // Question Control
    questions = qCtrl.passQuestion();

    totalQ = questions.length;

    theNumber = qCtrl.selectNum(questions);
    theQuestion = questions[theNumber];

    UICtrl.displayQuestion(theQuestion.question);
    UICtrl.displayAnswers(theQuestion.answers);

    // Picture Control
    pictures = UICtrl.passPics();
    picNumber = UICtrl.choosePicNum();

    UICtrl.changePic(pictures[picNumber]);

    var proximoQuestion = function () {

        questions.splice(theNumber, 1);
        pictures.splice(picNumber, 1);

        UICtrl.returnQuestion();

        if (questions.length && pictures.length > 0) {
            theNumber = qCtrl.selectNum(questions);
            theQuestion = questions[theNumber];

            UICtrl.displayQuestion(theQuestion.question);
            UICtrl.displayAnswers(theQuestion.answers);

            picNumber = UICtrl.choosePicNum();

            UICtrl.changePic(pictures[picNumber]);

            document.querySelector(DOMstrings.jakeSelectAnswer).textContent = 'Submit';

            setupEventListeners();
        } else {
            var html, newHtml, percentage;

            percentage = Math.round(((score / totalQ) * 100)) + '%';

            document.getElementById(DOMstrings.jakePic).src = 'images/Picture2.png';
            html = '<div class="score"><h3 id="score_report">Final Score = %score%</h3><h4>%percentage%</h4></div>';
            newHtml = html.replace('%score%', score);
            newHtml = newHtml.replace('%percentage%', percentage);
            document.querySelector(DOMstrings.jakeQContainer).innerHTML = newHtml
        }

    };

    var triedAnswer = function () {

        var result;
        console.log(checkedBox);
        console.log(theQuestion.correct);

        if (checkedBox !== undefined) {

            result = qCtrl.checkAnswer(checkedBox, theQuestion.correct, score);
        } else {
            alert('Choose an answer for chrissakes');
        }


        score = qCtrl.checkScore(result, score);

        UICtrl.showResult(result, picNumber, pictures, score);

        document.querySelector(DOMstrings.jakeNext).addEventListener('click', proximoQuestion);

    };

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(UIController, qController);

controller.init();