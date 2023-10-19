
//griglia
let vetQuadrati;
let score = 0;
const btn = document.querySelector('button');
const numBombe = 8;

btn.addEventListener('click', function () {
    const playground = document.getElementById('playground');
    playground.innerHTML = '';
    let numSquare = document.getElementById('select').value;

    if (numSquare === 'facile') {
        numSquare = 100;
    } else if (numSquare === 'medio') {
        numSquare = 81;
    } else {
        numSquare = 49;
    }

    //let indiceBombe = 0;

    for (let i = 1; i <= numSquare; i++) {
        let square = createSquare(numSquare);
        square.innerHTML = i;
        playground.append(square);
    }

    vetQuadrati = document.getElementsByClassName('square');

    let indiceCaselle;
    /*
    while (indiceBombe < numBombe) {

        indiceCaselle = getRndInteger(0, numSquare - 1);


        if (vetQuadrati[indiceCaselle].classList.contains('bomb')) {
            continue;
        } else {
            vetQuadrati[indiceCaselle].classList.add('bomb');
            indiceBombe++;
        }

    }
    */

    for(let i = 0; i < numBombe;){
        indiceCaselle = getRndInteger(0, numSquare - 1);
        if(vetQuadrati[indiceCaselle].classList.contains('bomb')){
            continue;
        }else{
            vetQuadrati[indiceCaselle].classList.add('bomb');
            //console.log(vetQuadrati[indiceCaselle].innerHTML);
            i++;
        }
    }

    

})

// utility

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//creazione quadrati

function createSquare(rowSquare) {
    const squareWidth = Math.sqrt(rowSquare);
    const square = document.createElement('div');

    square.classList.add('square');
    square.style.width = `calc(100% /  ${squareWidth} )`
    square.style.height = `calc(100% /  ${squareWidth} )`
    //square.innerHTML = squareIndex + 1;

    //click sui quadrati
    square.addEventListener('click', function squareClick() {
        square.classList.add('active');
        //controllo se i quadrati contengono la classe bomba
        if (vetQuadrati[square.innerHTML - 1].classList.contains('bomb')) {
            square.removeEventListener('click', squareClick)
            vetQuadrati[square.innerHTML - 1].classList.remove('active');
            vetQuadrati[square.innerHTML - 1].classList.add('red');
            stampaBombe(vetQuadrati);
            console.log(score);
            alert(`hai perso il tuo score é di : ${score}`);
            setTimeout(reset, 3000);
            //altrimenti controllo se ho messo tutte le bombe 
        } else{
            square.removeEventListener('click', squareClick)
            square.classList.add('active');
            score ++;
            if (vetQuadrati.length - document.getElementsByClassName('active').length === numBombe){
                alert(`hai vinto il tuo score é di : ${score}`);
                reset();
            }
        }
    })

    return square;
}


function stampaBombe(vetQuadrati){
    for(let i = 0; i < vetQuadrati.length; i++){
        if(vetQuadrati[i].classList.contains('bomb')){
            vetQuadrati[i].classList.add('red');
        }
    }
}

//reset del campo se perdo o vinco

function reset() {
    const playground = document.getElementById('playground');
    playground.innerHTML = '';
    score = 0;
}