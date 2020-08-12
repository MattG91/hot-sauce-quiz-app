

/*************************************************Event handlers*/ 

function startQuizHandler() {
  $('#start-btn').on('click', () => {
    startQuiz();
  });
}

function submitQuestionHandler() {
  $('#submit-btn').on('click', () => {
    checkForActiveAnswer();
  });
}

function nextQuestionHandler() {
  $('#next-btn').on('click', () => {
    questionAreaDecider();
  });
}

function restartQuizHandler() {
  $('#restart-btn').on('click', () => {
    restartQuiz();
  });
}

/*************************************************Question generator*/

function renderQuestion() {
  if (STORE.currentQuestion >= STORE.questions.length) {
    return ""
  }
  const answerNodes = STORE.questions[STORE.currentQuestion].answers.map(renderOption);
  $('#questionArea').html(`
    <div class="top-and-bottom-padding">
      ${renderCurrentQuestion()}
      <hr>
      <form class="indie-flower">
        <fieldset class="margin-top">
          <legend>
            ${answerNodes.join("")}
          </legend>
        </fieldset>
      </form>
      <p class="indie-flower" id="questionResult"></p>
    </div>
  `);
}

/*************************************************Single purpose functions*/ 
function checkSubmit(e) {
  if(e && e.keyCode == 13) {
    checkForActiveAnswer();
    $('#next-btn').focus();
  }
}

function startQuiz() {
  $('#start-btn').hide();
  $('#submit-btn').show();
  $('#startQuiz').hide();
  $('#questionArea').show();
  $('.item').show();
  renderQuestion();
  increaseCurrentQuestion();
}

function renderCurrentQuestion() {
  return `<p class="indie-flower">${STORE.questions[STORE.currentQuestion].question}</p>`
}

function renderOption(answer) {
  return `<input type="radio" name="possibleAnswers" value="${answer}" onKeyPress="return checkSubmit(event)" required>
  <label class="questionText li-padding" for="quest1">${answer}</label><br></br>`;
}

function checkQuestion(userAnswer) {
  const correctAnswer = STORE.questions[STORE.correctAnswerSelector].correctAnswer;
  if (userAnswer === correctAnswer) {
    $('#questionResult').text('You got it correct!')
    increaseCorrectAnswers();
  } else {
    $('#questionResult').text(`Almost! the correct answer is "${correctAnswer}"`);
  }
  increaseAnswerSelector();
}

function checkForActiveAnswer() {
  const userAnswer = $('input:checked').val();
  if (userAnswer) {
      checkQuestion(userAnswer);
      $('#submit-btn').hide();
      $('#next-btn').show();
  } else {
      alert('Please select an answer');
  }
}

function questionAreaDecider() {
  if (STORE.currentQuestion < STORE.questions.length) {
    $('#next-btn').hide();
    $('#submit-btn').show();
    renderQuestion();
    increaseCurrentQuestion();
  } else {
    showFinalResults();
  };
}

function showFinalResults() {
  $('.item').hide();
  $('#next-btn').hide();
  $('#restart-btn').show();
  $('#questionArea').hide();
  $('#finalResultsHeader').text('Here are your test results');
  let greatScore = `Great job, you got a perfect score! ${STORE.correctAnswers} out of 10!`;
  let okScore = `Not bad! You got ${STORE.correctAnswers} out of 10. Want to try again?`;
  let badScore = `Looks like you could use some practice! You got ${STORE.correctAnswers} out of 10. Try again!`;
  if (STORE.correctAnswers === STORE.MAX_QUESTIONS) {
    $('#finalResults').text(greatScore);
  } else if (STORE.correctAnswers >= STORE.okScoreNumber) {
    $('#finalResults').text(okScore);
  } else {
    $('#finalResults').text(badScore);
  }
  $('#finalResultsArea').show();
}

function restartQuiz() {
  resetValues();
  $('.item').show();
  $('#finalResultsArea').hide();
  $('#questionArea').show();
  $('#restart-btn').hide();
  $('#submit-btn').show();
  renderQuestion();
  increaseCurrentQuestion();
}

function resetValues() {
  STORE.currentQuestion = 0;
  STORE.correctAnswers = 0;
  STORE.correctAnswerSelector = 0;
  $('.currentQuestion').text(1);
  $('.currentScore').text(0);
}

function increaseCurrentQuestion() {
  STORE.currentQuestion++;
  $('.currentQuestion').text(STORE.currentQuestion);
}

function increaseCorrectAnswers() {
  STORE.correctAnswers++;
  $('.currentScore').text(STORE.correctAnswers);
}

function increaseAnswerSelector()  {
  STORE.correctAnswerSelector++;
}

/*************************************************Initializing function*/ 

function makeQuiz() {
  startQuizHandler();
  submitQuestionHandler();
  nextQuestionHandler();
  restartQuizHandler();
}

$(makeQuiz);
