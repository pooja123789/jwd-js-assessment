window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function (e) {
      document.querySelector('#quizBlock').style.display = 'block';
      start.style.display = 'none';
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
      },{
        q: 'What is 1*7?',
        o: [4, 5, 6, 7],
        a: 3,
      }, {
        q: 'What is 8*8?',
        o: [20, 30, 40, 64],
        a: 3,
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
          // Add an Event listener for the submit button
  
          const btn = document.getElementById('btnSubmit');
          btn.addEventListener('click', function(event){
          const totalScore = calculateScore(this);
          console.log('Button Clicked');
          console.log('Total Score = ' + totalScore);
        })
  
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
  
  
                if (radioElement.checked) {
                  // code for task 1 goes here
                if (quizItem.a == i) {
                  //change background color of li element here
                  score = score + 1;
                  liElement.style.backgroundColor = 'green';
  
                } else {
                  liElement.style.backgroundColor = 'red'
                }               
               } else if(quizItem.a == i) {
                liElement.style.backgroundColor = 'yellow';
               }
                  console.log('Score in loop', score);
                }
                document.getElementById('score').innerHTML = "Score: " + score + '/' + quizArray.length;
              });
                
              return score;
            };           
  
              // call the displayQuiz function
              displayQuiz();
          });
  
              //Reload the page when the reset button is clicked
              const reset = document.getElementById('btnReset');
              reset.addEventListener('click', () => {
              window.location.reload();
          })
  
            //Add a countdown timer
            
            const startingMinutes = 1;
            let time = startingMinutes * 60;
            const timer = document.getElementById('time');
  
            setInterval(updateCountdown, 1000);
  
            function updateCountdown() {
              const minutes = Math.floor(time / 60);
              let seconds = time % 60;            
              timer.innerHTML = `${minutes}: ${seconds}`;
              
              if(time > 0) {
                time --;
              }
              else if(time === 0) 
              clearInterval(time);
              alert(`Time out!! Your score is: ${calculateScore(this)}`); 
            
            }