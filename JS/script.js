// wrap in an IIFE so quiz can execute immediately page loads
(function () {

  //Array of questions
  const myQuestions = [{
      question: "Which of these is the correct way to create an Array?",
      answers: {
        a: "let colors = [blue green black]",
        b: "let colors = {blue, green, black}",
        c: "let colors = ['blue', 'green', 'black']",
        d: "let colors = ('blue', 'green', 'black')"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of these is not a comparison operator?",
      answers: {
        a: "<",
        b: ">",
        c: "=",
        d: "!="
      },
      correctAnswer: "c"
    },
    {
      question: "Which of these is not a JavaScript Framework",
      answers: {
        a: "Flask",
        b: "Angular",
        c: "Ember",
        d: "Backbone"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the result of the following:  '1' - - '1';?",
      answers: {
        a: "0",
        b: "'11'",
        c: "11",
        d: "2"
      },
      correctAnswer: "d"
    },
    {
      question: "Who is the founder of JavaScript?",
      answers: {
        a: "Mark Zuckerberg",
        b: "Bill Gates",
        c: "Steve Jobs",
        d: "None of the above"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the result: new String(\"This is a string\") instanceof String; ?",
      answers: {
        a: "true",
        b: "false",
        c: "typeError",
        d: "syntaxError"
      },
      correctAnswer: "a"
    },
    {
      question: "How do you add a multiline comment in JavaScript?",
      answers: {
        a: "//This is a comment",
        b: "<--This is a comment--!>",
        c: "/*This is a comment*/",
        d: "All of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: {
        a: "function myFunction()",
        b: "function = myFunction()",
        c: "function: myFunction{ }",
        d: "None of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the result?: String('Hello') === 'Hello';",
      answers: {
        a: "true",
        b: "false",
        c: "referrenceError",
        d: "None of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the result?: NaN === NaN;",
      answers: {
        a: "true",
        b: "NaN",
        c: "undefined",
        d: "false"
      },
      correctAnswer: "d"
    }
  ];

  // create functions to build quiz
  const buildQuiz = () => {

    const output = []; //stores html output

    //loop through each of our questions with the forEach loop

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        // store the list of answer choices
        const answers = [];
        // if (checked) {
        // }
        for (letter in currentQuestion.answers) {
          // for each available answer...
          answers.push(
            `<label>
              <input id="isChecked" type="radio" name="question${questionNumber} "value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
              </label>`
          );
        }
        //add this questions and its answers to the output
        output.push(
          `<div class="slide">     
                  <div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>
               </div>`
        );
      });

    quizContainer.innerHTML = output.join(""); // display output list into one string of html and put it on the page
  }


  // display quiz
  const showResults = () => {
    //get answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    //for each question 
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // finding selected answers

      const answerContainer = answerContainers[questionNumber]; // looking inside the answer container for the current question

      const selector = `input[name=question${questionNumber}]:checked`; //find which radio button is checked.
      //radio button is checked
      //we can get the value of selected choice by using .value
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      //if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "green";
        // if answer is wrong
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // display number of correct answers
    resultsContainer.innerHTML = `${numCorrect} of ${myQuestions.length}`;

    if (numCorrect === myQuestions.length) {
      scoreMessage.innerHTML = "Great!!!... YOU ARE THE CHAMP!";
      scoreMessage.style.color = "green";

    } else if (numCorrect === myQuestions.length - 1) {
      scoreMessage.innerHTML = "Almost There, you can do better... TRY AGAIN!";
      scoreMessage.style.color = "orange";

    } else if (numCorrect === myQuestions.length / 2) {
      scoreMessage.innerHTML = "Average Score, Study more and try again... YOU CAN DO BETTER!";
      scoreMessage.style.color = "violet";

    } else if (numCorrect < myQuestions.length / 2) {
      scoreMessage.innerHTML = "OOOOPS! Study more and try again... YOU CAN DO IT!";
      scoreMessage.style.color = "red";
    }
  }

  // buttons for navigation

  //function to show slide when user selects an answer 

  const showSlide = n => {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  /* function to make navigation buttons work to show provious and next slides */
  const showNextSlide = () => {
    showSlide(currentSlide + 1);
  }

  const showPreviousSlide = () => {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const scoreMessage = document.getElementById("message");
  const submitButton = document.getElementById("submit");
  // call quiz immediatey
  buildQuiz();
  // when submit button is clicked call the showResults function
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  const modal = document.getElementById("scores");
  const closeOverlay = document.getElementById("close");
  const restart = document.getElementById("restart");
  // open modal
  submit.addEventListener('click', () => {
    modal.style.display = "block";

    // close modal
    closeOverlay.addEventListener('click', () => {
      modal.style.display = "none";
      // window.location = "quiz.html";
    });

    // close modal when user clicks outside of the modal
    window.addEventListener('mouseup', (event) => {
      if (event.target != modal && event.target.parentNode != modal) {
        modal.style.display = "none";
        submit.setAttribute("disabled", true);
        submit.style.background = "gray";

        // window.location = "quiz.html";
      }
    });
  });

  //Restart quiz onclick of restart button
  restart.addEventListener('click', () => window.location = 'quiz.html');

})();