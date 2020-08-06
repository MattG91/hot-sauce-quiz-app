
/*************************************************Global variables*/ 
let currentQuestion = 0;
let correctAnswers = 0;
let correctAnswerSelector = 0;

/*************************************************Event handlers*/ 
function startQuiz() {
  $('#start-btn').on('click', function(event) {
    $('#start-btn').hide();
    $('#submit-btn').show();
    $('#startQuiz').hide();
    $('#questionArea').show();
    $('.item').show();
    renderQuestion();
    increaseCurrentQuestion();
  });
}

function submitQuestion() {
  $('#submit-btn').on('click', event => {
    checkForActiveAnswer();
  });
}

function nextQuestion() {
  $('#next-btn').on('click', event => {
    if (currentQuestion < STORE.length) {
      $('#next-btn').hide();
      $('#submit-btn').show();
      renderQuestion();
      increaseCurrentQuestion();
    }
    else {
      console.log(correctAnswers);
      finalResults();
    };
  });
}

function restartQuiz() {
  $('#restart-btn').on('click', event => {
    resetValues();
    $('.item').show();
    $('#finalResultsArea').hide();
    $('#questionArea').show();
    $('#restart-btn').hide();
    $('#submit-btn').show();
    renderQuestion();
    increaseCurrentQuestion();
  });
}

/*************************************************Question generator*/
function renderQuestion() {
  if(currentQuestion < STORE.length) {
    $('#questionArea').html(`
      <div class="top-and-bottom-padding">
        <p class="indie-flower">${STORE[currentQuestion].question}</p>
        <hr>
        <form class="indie-flower">
          <fieldset class="margin-top">
            <legend>
              <input type="radio" name="possibleAnswers" value="${STORE[currentQuestion].answers[0]}" required>
                <label class="questionText li-padding" for="quest1">${STORE[currentQuestion].answers[0]}</label><br>
              <input type="radio" name="possibleAnswers" value="${STORE[currentQuestion].answers[1]}">
                <label class="questionText li-padding" for="quest2">${STORE[currentQuestion].answers[1]}</label><br>
              <input type="radio" name="possibleAnswers" value="${STORE[currentQuestion].answers[2]}">
                <label class="questionText li-padding" for="quest3">${STORE[currentQuestion].answers[2]}</label><br>
              <input type="radio" name="possibleAnswers" value="${STORE[currentQuestion].answers[3]}">
                <label class="questionText li-padding" for="quest4">${STORE[currentQuestion].answers[3]}</label><br>
            </legend>
          </fieldset>
        </form>
        <p class="indie-flower" id="questionResult"></p>
      </div>
    `)
  }
}

/*************************************************Single purpose functions*/ 
function checkQuestion(userAnswer) {
  let correctAnswer = STORE[correctAnswerSelector].correctAnswer;
  if (userAnswer === correctAnswer) {
    $('#questionResult').text('You got it correct!')
    increaseCorrectAnswers();
  }
  else {
    $('#questionResult').text(`Almost! the correct answer is "${correctAnswer}"`);
  }
  increaseAnswerSelector();
}

function checkForActiveAnswer() {
  let selected = $('input:checked');
  let userAnswer = selected.val();
  if (userAnswer) {
      checkQuestion(userAnswer);
      $('#submit-btn').hide();
      $('#next-btn').show();
  } else {
      alert('Please select an answer');
  }
}

function finalResults() {
  $('.item').hide();
  $('#next-btn').hide();
  $('#restart-btn').show();
  $('#questionArea').hide();
  $('#finalResultsHeader').text('Here are your test results');
  let greatScore = `Great job, you got a perfect score! ${correctAnswers} out of 10!`;
  let okScore = `Not bad! You got ${correctAnswers} out of 10. Want to try again?`;
  let badScore = `Looks like you could use some practice! You got ${correctAnswers} out of 10. Try again!`;
  if (correctAnswers === 10) {
    $('#finalResults').text(greatScore);
  }
  else if (correctAnswers >= 5) {
    $('#finalResults').text(okScore);
  }
  else {
    $('#finalResults').text(badScore);
  }
  $('#finalResultsArea').show();
}

function resetValues() {
  currentQuestion = 0;
  correctAnswers = 0;
  correctAnswerSelector = 0;
  $('.currentQuestion').text(1);
  $('.currentScore').text(0);
}

function increaseCurrentQuestion() {
  currentQuestion++;
  $('.currentQuestion').text(currentQuestion);
}

function increaseCorrectAnswers() {
  correctAnswers++;
  $('.currentScore').text(correctAnswers);
}

function increaseAnswerSelector()  {
  correctAnswerSelector++;
}

/*************************************************Initializing function*/ 
function makeQuiz() {
  startQuiz();
  submitQuestion();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);


