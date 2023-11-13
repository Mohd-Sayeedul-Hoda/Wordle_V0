'use strict'

let grid = document.getElementById('grid')    

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
buildGrid();

let wordList= [
	//'patio',
	//'darts',
	//'piano',
	'horse',
];

let randomIndex= Math.floor(Math.random()*wordList.length)
let secret = wordList[randomIndex]

let attempts = ['rohan','wowzy','horse']
let currentAttempt=''

updateGrid()

function updateGrid(){
	let row = grid.firstChild
	for (let attempt of attempts){
		drawPastAttempt(row,attempt)
		row=row.nextSibling
	}
	drawCurrentAttempt(row,currentAttempt)
	row = row.nextSibling
}

function drawPastAttempt(row, attempt){
	for (let i = 0; i<5 ; i++){
		let cell = row.children[i]
		if (attempt[i] !== undefined){
			cell.textContent = attempt[i]  
		}
		else{
			cell.innerHTML = '<div style="opacity:0">X</div>'
		}
		cell.style.background = getByColor(attempt,i)
		
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

