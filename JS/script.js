/* since our quiz questions and answers are in javascript, we wrap all of our javascript in an IIFE so that our quiz can execute immediately page loads */
(function() {
    /* using object literals to represent the individual questions and an array to hold of all the questions that make up the quiz, using an array will make the questions easy to iterate over */
  
    // we store our quiz, results and button in seperate variables
  
  const myQuestions = [
    {
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
        c: "Steve Jobbs",
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
    //store the html output
    const output = [];
    
     /*To build the html for each question, we need to loop through each of our questions with the forEach loop*/
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        // store the list of answer choices
        const answers = [];
        for(letter in currentQuestion.answers) {
        // for each available answer...
        answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
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
  /* combine our output list into one string of html and put it on the page */
  quizContainer.innerHTML = output.join("");
  }
  
  
  // function to display quiz
  const showResults = () => {
    //get answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    //for each question 
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      // finding selected answers
       /* First, we’re making sure we’re looking inside the answer container for the current question.*/
      const answerContainer = answerContainers[questionNumber];
      /*we’re defining a CSS selector that will let us find which radio button is checked.*/
      const selector = `input[name=question${questionNumber}]:checked`;
      /* we’re using JavaScript’s querySelector to search for our CSS selector in the previously defined answerContainer. In essence, this means that we’ll find which answer’s radio button is checked.*/
    //we can get the value of that answer by using .value
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      //if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        // color the answers blue
        answerContainers[questionNumber].style.color = "green";
        // if answer is wrong
  } else {
    answerContainers[questionNumber].style.color = "red";
  }
    });
    // display number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    
    if(numCorrect === myQuestions.length) {
      scoreMessage.innerHTML = "Highest Score... YOU GOT THE BEST RESULT!";
      scoreMessage.style.color = "blue";
      
     } else if(numCorrect === myQuestions.length -1) {
        scoreMessage.innerHTML = "Fair enough, but you can do better... TRY AGAIN!";
      scoreMessage.style.color = "orange";
       
  } else if( numCorrect === myQuestions.length / 2) {
    scoreMessage.innerHTML = "Average Score, Study more and try again... YOU CAN DO BETTER!";
    scoreMessage.style.color = "violet";
    
  } else if (numCorrect < myQuestions.length / 2) {
    scoreMessage.innerHTML = "Bad Score! Study more and try again... YOU CAN DO IT!";
    scoreMessage.style.color = "red";
  } 
  }
  
    /* function  below to show our slides*/
    // buttons for navigation
   
    /*function to show slide when user selects an answer */
    
  const showSlide = n => {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if(currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if(currentSlide === slides.length -1) {
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
    // call buildQuiz to execute immediately
  })();