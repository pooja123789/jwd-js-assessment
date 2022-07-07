window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    const btnSubmitElement = document.querySelector("#btnSubmit");
    const btnResetElement = document.querySelector("#btnReset");
    const scoreElement = document.querySelector("#score");
    const timeElement = document.querySelector("#time");
    var remainingTime = 60; // being 60 seconds
    var submitted = false; // to keep track if the user submitted the test ontime
  
    start.addEventListener('click', function (e) {
      document.querySelector('#quizBlock').style.display = 'block';
      start.style.display = 'none';
      timer();
    });
    // quizArray QUESTIONS & ANSWERS
    // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
    // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
    const quizArray = [
      {
        q: 'Which is the third planet from the sun?',
        o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
        a: 1, // array index 1 - so Earth is the correct answer here
      },
      {
        q: 'Which is the largest ocean on Earth?',
        o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        a: 3,
      },
      {
        q: 'What is the capital of Australia',
        o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
        a: 1,
      },
      {
        q:"Which language runs in a web browser?",
        o:["JavaScript","Python","Java","C++"],
        a:0,
      },
      {
        q:"What year was JavaScript Launched?",
        o:["1996","1995","1994","none of the above"],
        a:1,
    }
    ];
  
    // function to Display the quiz questions and answers from the object
    const displayQuiz = () => {
      const quizWrap = document.querySelector('#quizWrap');
      let quizDisplay = '';
      quizArray.map((quizItem, index) => {
        quizDisplay += `<ul class="list-group">
                     Q - ${quizItem.q}
                      <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                      <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                      <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                      <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                      </ul>
                      <div>&nbsp;</div>`;
        quizWrap.innerHTML = quizDisplay;
      });
    };
  
    //adding timer
    const timer=()=>{
  
      let countdown = setInterval(()=>{    
        if (submitted){
          timeElement.innerHTML= "You have submitted your answers ontime."
        }   
        else if (remainingTime>0){
          remainingTime--;
          timeElement.innerHTML=`00:${remainingTime}`
        }else{
          timeElement.innerHTML= "Your time is up."
          calculateScore();
        }
        //console.log(remainingTime);
      },1000);
      }
      
    // Calculate the score
    const calculateScore = () => {
      let score = 0;
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          //highlight the li if it is the correct answer
          let li = `li_${index}_${i}`;
          let r = `radio_${index}_${i}`;
          liElement = document.querySelector('#' + li);
          radioElement = document.querySelector('#' + r);
  
          if (quizItem.a == i) {
            //change background color of li element here
            liElement.style.backgroundColor = "green";
          }
  
          if (radioElement.checked) {
            // i represent the radioElement.value or the current radio button of the current round(iteration) of for loop. But we don't have value attribute in radio button, hence, using i to represent the value of each radio button)
            if (i == quizItem.a){
              score++;
              console.log(`Score is : ${score}`);
            }
          }
        }
      });
      scoreElement.innerHTML=`Total score: ${score}`;
      btnSubmitElement.style.display="none";
  
      //checking if user submmited the quiz ontime when calculate score function is called.
      if (remainingTime > 0){
        submitted = true;      
      }
    };
  
    // call the displayQuiz function
    displayQuiz();
  
    // reload when reload button clicked
    btnResetElement.addEventListener("click",()=>window.location.reload());
    //btnSubmitElement.addEventListener("click",testing);
    btnSubmitElement.addEventListener("click",calculateScore);
  
  });