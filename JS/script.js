// wrap in an IIFE so quiz can execute immediately page loads
(function () {

  //Array of questions
  const myQuestions = [{
      question: "Which of these is not a Back-end Framework?",
      answers: {
        a: "Ruby on Rails",
        b: "React.JS",
        c: "MongoDB",
        d: "Mongoose"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of these is not a Programming language?",
      answers: {
        a: "Python",
        b: "SQL",
        c: "PHP",
        d: "C#"
      },
      correctAnswer: "b"
    },
    {
      question: "The Swift programming language first appeared in what year?",
      answers: {
        a: "2014",
        b: "2015",
        c: "2013",
        d: "None of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "Who was the first United States president to be impeached?",
      answers: {
        a: "Abraham Lincoln",
        b: "James Butchanan",
        c: "Jimmy Cater",
        d: "Andrew Johnson"
      },
      correctAnswer: "d"
    },
    {
      question: "Who is the founder of Apple?",
      answers: {
        a: "Mark Zuckerberg",
        b: "Bill Gates",
        c: "Steve Jobs",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of these is a Mark-up Language?",
      answers: {
        a: "Sass",
        b: "html",
        c: "Java",
        d: "All of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "Which programming language uses the most number of frameworks?",
      answers: {
        a: "SQL",
        b: "Java",
        c: "JavaScript",
        d: "C++"
      },
      correctAnswer: "c"
    },
    {
      question: "Who designed the Python Programming Language?",
      answers: {
        a: "James Gosling",
        b: "Ada Lovelace",
        c: "Larry Wall",
        d: "Guido van Rossum"
      },
      correctAnswer: "d"
    },
    {
      question: "Which Company became the first ever 1 Trillion dollar company in the U.S?",
      answers: {
        a: "Microsoft",
        b: "Google",
        c: "Apple",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Who was the first ever computer programmer?",
      answers: {
        a: "Grace Hooper",
        b: "Betty Holberton",
        c: "Snoop Dog",
        d: "Ada Lovelace"
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
              <input class="isChecked" type="radio" name="question${questionNumber}" value="${letter}">
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
  
    quizContainer.innerHTML = output.join("");   // display output list into one string of html and put it on the page
  }


  // display quiz
  const showResults = () => {
    //get answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    //for each question 
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // finding selected answers
     
      const answerContainer = answerContainers[questionNumber];  // looking inside the answer container for the current question
     
      const selector = `input[name=question${questionNumber}]:checked`;  //find which radio button is checked.
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
    // const checking = document.querySelector(".isChecked");
    // if (checking.checked) {
    // } else if (!checking.checked){
    //   window.alert("CHoose an answer!!!")
    // }
    // if (document.querySelector(".isChecked").checked) {
    //   showSlide(currentSlide + 1);
    // }
    // else {
    //   window.alert("CHoose an answer!!!")
    // }
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
      window.location = "quiz.html";
    });

    // close modal when user clicks outside of the modal
    window.addEventListener('mouseup', (event) => {
      if (event.target != modal && event.target.parentNode != modal) {
        modal.style.display = "none";
        window.location = "quiz.html";
      }
    });
  });

  // Restart quiz onclick of restart button
  restart.addEventListener('click', () => window.location = 'quiz.html');

})();