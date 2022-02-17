const wordE1 =document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn= document.getElementById("play-button")
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"]

let selectedWord = words[Math.floor(Math.random() * words.length)]


const correctLetter = [];
const wrongLetters = [];


function displayWord(){
    wordE1.innerHTML=`
    ${selectedWord
    .split('')
    .map(letter =>`
    <span class="letter">${correctLetter.includes(letter)? letter : ''}
    </span>
    
    
    `
    )
    .join('')}
    
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congurulations ! You won!';
        popup.style.display ='flex';
    }
    
}


// update the wrong wrong Letters

function updateWrongLetterE1(){
    //Displya wrong Letters
    wrongLettersE1.innerHtml = ` 
    ${wrongLetters.length>0 ? "<p>WRONG</p>": " "}
    

    `;

    


    //Display parts

    figureParts.forEach((part,index)=> {
        const errors =wrongLetters.length;

        
        


        if (index < errors) {
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
        
    });

    // check if lost

    if (wrongLetters.length === figureParts.length){
        
        finalMessage.innerText = "Unfortunately you lost.";
        popup.style.display = 'flex';
    }

}

//Show natification

function ShowNatification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press

window.addEventListener("keydown", e=>{
    if(e.keyCode >=65 && e.keyCode<=90){
        const letter = e.key;
        

        if(selectedWord.includes(letter)){
            if(!correctLetter.includes(letter)){
                correctLetter.push(letter);

                displayWord();

            }else{
                ShowNatification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterE1();

            }else{
                ShowNatification();
            }
        }
    }
});



//Restart game and play again after
playAgainBtn.addEventListener("click", ()=>{
    correctLetter.splice(0);
    wrongLetters.splice(0)

    selectedWord = words[Math.floor(Math.random()*words.length)];

    displayWord();
    updateWrongLetterE1();

    popup.style.display = "none";
})

displayWord();