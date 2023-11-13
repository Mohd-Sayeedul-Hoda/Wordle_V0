'use strict'

let grid = document.getElementById('grid')    

let wordList= [
	'patio',
	'darts',
	'piano',
	'horse',
	'hello',
	'water',
	'pizza',
	'sushi',
	'crabs',

];

let randomIndex= Math.floor(Math.random()*wordList.length)
let secret = wordList[randomIndex]

let attempts = []
let currentAttempt=''

buildGrid();
updateGrid()
window.addEventListener('keydown', handleKeyDown)


function handleKeyDown(e){
	let letter = e.key.toLowerCase()
	if (letter === 'enter'){
		if(currentAttempt.length < 5){
			return
		}
		if(!wordList.includes(currentAttempt)){
			alert("not in my thesaurus")
			return
		}
		attempts.push(currentAttempt)
		currentAttempt= ''
	}else if(letter === 'backspace'){
		currentAttempt = currentAttempt.slice(0,currentAttempt-1)
	}else if(/[a-z]/.test(letter)){
		if(currentAttempt.length < 5){
			currentAttempt +=letter
		}
	}
	updateGrid()
	
}

function buildGrid(){
	for (let i=0; i<6; i++){
		let row = document.createElement('div')
		for (let j=0; j<5;j++){
			let cell = document.createElement('div')
			cell.className='cell'
			row.appendChild(cell)
			cell.textContent= ''
		}
	grid.appendChild(row)
	}
}

function updateGrid(){
	let row = grid.firstChild
	for (let attempt of attempts){
		drawAttempt(row,attempt,false)
		row=row.nextSibling
	}
	drawAttempt(row,currentAttempt,true)
	row = row.nextSibling
}

function drawAttempt(row, attempt,isCurrent){
	for (let i = 0; i<5 ; i++){
		let cell = row.children[i]
		if (attempt[i] !== undefined){
			cell.textContent = attempt[i]  
		}
		else{
			cell.innerHTML = '<div style="opacity:0">X</div>'
		}
		if (isCurrent){
			cell.style.background = '#111'
		}else{
			cell.style.background = getByColor(attempt,i)
		}
		
	}
}

function drawCurrentAttempt(row, attempt){
	for (let i = 0; i<5 ; i++){
		let cell = row.children[i]
		if (attempt[i] !== undefined){
			cell.textContent = attempt[i] 
		}else{
			cell.innerHTML = '<div style="opacity: 0">X</div>'
		}
	}
}

function getByColor(attempt,i){
	let correctLetter = secret[i]
	let attemptLetter = attempt[i]
	if (attemptLetter ===undefined || secret.indexOf(attemptLetter) === -1){
		return '#212121'
	}
	if (correctLetter === attemptLetter){
		return '#538d4e'
	}
	return '#b59f3b'
}

