$(window).on('load', function() {
// JSON questions
var questions = {
    // 1st question
    "question0": {
        "questionText":"How many months do we have in a year?",
        "choices": {
            "1" : "12 months",
            "2" : "10 months",
            "3" : "9 months",
            "4" : "8 months"
        },
        "answer" : "1"
    },
    // 2nd question
    "question1": {
        "questionText":"How many days do we have in a week?",
        "choices": {
            "1" : "13 days",
            "2" : "9 days",
            "3" : "7 days",
            "4" : "11 days"
        },
        "answer" : "3"
    },
    // 3rd question
    "question2": {
        "questionText":"How many days are there in a year?",
        "choices": {
            "1" : "275 days",
            "2" : "365 days",
            "3" : "384 days",
            "4" : "263 days"
        },
        "answer" : "2"
    },
     // 4rd question
     "question3": {
        "questionText":"What is 2+2?",
        "choices": {
            "1" : "2",
            "2" : "3",
            "3" : "4",
            "4" : "6"
        },
        "answer" : "3"
    },
     // 5rd question
     "question4": {
        "questionText":"Which number comes after 6?",
        "choices": {
            "1" : "5",
            "2" : "8",
            "3" : "7",
            "4" : "9"
        },
        "answer" : "3"
    },
     // 6rd question
     "question5": {
        "questionText":"How many colors are there in a rainbow?",
        "choices": {
            "1" : "6",
            "2" : "9",
            "3" : "8",
            "4" : "7"
        },
        "answer" : "4"
    },
     // 7rd question
     "question6": {
        "questionText":"What are your ears for?",
        "choices": {
            "1" : "seeing",
            "2" : "feelilng",
            "3" : "listening/hearing",
            "4" : "sensing"
        },
        "answer" : "3"
    },
     // 8rd question
     "question7": {
        "questionText":"Which day comes after Friday?",
        "choices": {
            "1" : "Thursday",
            "2" : "Tuesday",
            "3" : "Monday",
            "4" : "Saturday"
        },
        "answer" : "4"
    },
     // 9rd question
     "question8": {
        "questionText":"We use our eyes to...?",
        "choices": {
            "1" : "See",
            "2" : "Hear",
            "3" : "Feel",
            "4" : "Eat"
        },
        "answer" : "1"
    }
 }

 var actualQuestion = 0;
 var maxQuestions = countObjectLenght(questions) - 1;
 var answers = drawAnswers(9);
 var selections = {};

 // draw initial question
 drawQuestion(0);
 drawRadio(0);

 // default hide
if (actualQuestion == 0){
    hideStuff('#prevButton');
}

// Count number of questions
function countObjectLenght(object) {
    let count = 0;
    let i;
    
    for (i in object) {
        if (object.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
 }
// save answers in array
 function drawAnswers (numberOfQuestions) {
    let answer = [];
    let i;
    for (i = 0; i <numberOfQuestions; i++) {
        //console.log(questions['question'+i].answer);
            answer.push(questions['question' + i].answer);
    }
    return answer;
 }

// to hide elements
function hideStuff(element) {
    $(element).hide();
}
hideStuff('#restartButton');

 // Next button actions
    $('#nextButton').on('click', function (url) {
      url.preventDefault();
      //check if the question number is not exceeded
      if (actualQuestion < maxQuestions) {
            $('#prevButton').show();
            saveAnswer(actualQuestion);
            ++actualQuestion;
            if (actualQuestion == maxQuestions) {
                hideStuff('#nextButton');
            }
            drawQuestion(actualQuestion);
            drawRadio(actualQuestion);
      } else {
          console.log("That Was the last question");
      }
    });

// Previous button actions
    $('#prevButton').on('click', function (url) {
        url.preventDefault();
        //check if the question number is not exceeded
        if (actualQuestion < 1) {  
            hideStuff('#prevButton');
            console.log("There is no such question");
        } else {
            $('#nextButton').show();
            saveAnswer(actualQuestion);
            --actualQuestion;
            if (actualQuestion == 0){
                hideStuff('#prevButton');
            }
            drawQuestion(actualQuestion);
            drawRadio(actualQuestion);
          }
    });

    function finishButtonHelper() {
        checkAnswers(maxQuestions + 1);
        hideStuff('#prevButton');
        hideStuff('#nextButton');
        hideStuff('#finishButton');
        hideStuff('#checkButton');
        $('#quizQuestions').empty();
        $('#quizList').empty();
        $('#restartButton').show();
    }

// Finish button actions
    $('#finishButton').on('click', function (url) {
        url.preventDefault();
        let countNan = 0;
       // save the last question, hide what's not needed and show summary (correct answers)
                saveAnswer(actualQuestion); 
                for (i = 0; i <= maxQuestions; i++) {
                    if (isNaN(selections[i])) {
                        countNan++
                    }
                }
                if (countNan > 0) {
                     if (confirm("You have not answered to all of the questions, are you sure?")) {
                        finishButtonHelper();
                     }
                } else if (confirm("Are you sure want to finish?")) {
                    finishButtonHelper();
                 }
    });

// Check button actions
    $('#checkButton').on('click', function (url) {
        url.preventDefault();
        checkAnswer(actualQuestion);
    });

// Restart button actions 
    $('#restartButton').on('click', function (url) {
        url.preventDefault();
        document.location.reload();
    });

// Shuffle - Fisher - Yates algoritm
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Create question
function drawQuestion (number) {
    $('#quizPopup').empty();
    $('#quizQuestions').empty();
    $('#quizList').empty();
    $('#quizQuestions').append('<p class="questions__paragraph">Question:</p><p>' + questions['question' + number].questionText + '</p>');
}

// create radios
function drawRadio (number) {
    // output
    var text = "";
    let x;
    let pos = 0;
    let choiceList = questions['question' + number].choices;
    let writeChoice = "";
    // to mix outputs
    var table = [1,2,3,4];
    shuffle(table);
    for (x in choiceList) {
        // pos will be always 1,2,3,4 but values are shuffled
        writeChoice = questions['question' + number].choices[table[pos]];
        if (table[pos] == selections[number]){
            text += '<li><input type="radio" name="radios" value="' + table[pos] + '" checked>' + writeChoice + '</li>';
        } else {
            text += '<li><input type="radio" name="radios" value="' + table[pos] + '">' + writeChoice + '</li>';
        }
    ++pos;
    }
    $('#quizList').append(text);
}

// retreive answers from user and save in array
function saveAnswer(number) {
   selections[number] =+ $('input[name="radios"]:checked').val();
   return selections;
}

// check if answer is correct or wrong (button "Check")
function checkAnswer (number) {
    let checkedRadio = $('input[name="radios"]:checked');
    $('input[name="radios"]').change(function() {
        $('input[name="radios"]').parent().removeClass("correct");
        $('input[name="radios"]').parent().removeClass("wrong");
    });
     if ($('input[name="radios"]:checked').val() == questions['question' + number].answer) {
        checkedRadio.parent().addClass("correct");
    } else {
        checkedRadio.parent().addClass("wrong");
        }
}

// check answers (button "Finish")
function checkAnswers(lenght) {
    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < lenght; i++) {
        if (selections[i] == answers[i]) {
            correct++;       
        } else {
            wrong++;
        }
    }
    if (correct > 7) {
        $('#quizPopup').append('<h3>Well done!</h3>');
    } else {
        $('#quizPopup').append("<h3>There's always room for improvement, Try again!</h3>");
    }

     if (correct == 1) {
        $('#quizPopup').append(correct + ' correct answer,<br>');
    } else {
        $('#quizPopup').append(correct + ' correct answers,<br>');
    }

     if (wrong == 1) {
        $('#quizPopup').append(wrong + ' wrong answer.<br>');
    } else {
        $('#quizPopup').append(wrong + ' wrong answers.<br>');
    }
}
});
