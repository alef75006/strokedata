(function(){
  // Functions
  
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers1 = [];

        for (let letter of ["YES", "NO", "CAN'T SAY"]) {
          answers1.push(
            `<label>
              <input type="radio" name="question1${questionNumber}" value="${letter}">
              ${letter} 
            </label>`
          );
        } 

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="questionImage">
              <img src="data/Transformed/${questionNumber}.jpg" height="200px""></img>
            </div>
            <div class="questionImageRaw">
              <img src="data/Raw/${questionNumber}.jpg" height="200px""></img>
            </div>
            <div class="questions">
              <div class="questions1">
                <div class="question1"> ${currentQuestion.question1} </div>
                <div class="answers1"> ${answers1.join("")} </div>
              </div>
            </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function saveResults(filename, content) {
    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([content], { type: 'text/plain' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = filename;

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
  }


  function sendMail(content) {

    console.log("Essai d'envoi de l'email");
    Email.send({
        username : "strokedata@yahoo.com", 
        password : "Str0k3D4t4!!!!!!",
        to : "alexandrelefevrecnrs@gmail.com", 
        from : "Test",
        subject : "This is the subject",
        body : "And this is the body",  
        smtp : {
            host: "smtp.mail.yahoo.com", 
            port: 587,
            ssl: true // or false, depending on the encryption type
          }
    }).then(message => {
        if (message.status === 200) {
          console.log("Email envoyé avec succès");
        } else {
          console.log("Erreur lors de l'envoi de l'email : " + message.status);
        }
      });
      
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers1 = quizContainer.querySelectorAll('.answers1');

    // Answer string

    let answerString1 = "";

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // First question
      const answerContainer1 = answerContainers1[questionNumber];
      const selector1 = `input[name=question1${questionNumber}]:checked`;
      const userAnswer1 = (answerContainer1.querySelector(selector1) || {}).value;
      answerString1 += userAnswer1 + " ";

    });
    
    // Save results
    //saveResults("Output.txt", answerString1)
    sendMail(answerString1)
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  function buildQuestions() {
    let questions = []
    const N_IMAGES = 3
    for (let i=0; i < N_IMAGES; i++) {
      questions.push({
        question1: "Is the deformation realistic?",
      })
    }
    return questions
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = buildQuestions();

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
