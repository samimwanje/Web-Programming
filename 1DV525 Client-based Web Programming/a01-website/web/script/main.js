
var words = ["This", "Is", "A", "Programming", "Language", "Called", "JavaScript"
, "It", "Is", "Used", "To", "Control", "How", "A", "Webpage", "Should", "React" 
, "After", "Certain", "Events"]; 


function buttonClicked() {
	
var vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
var v = 0;
var currentWord = words[Math.floor(Math.random() * words.length)];

document.getElementById('word').innerHTML = "Current Word: " +currentWord;
document.getElementById('word').innerHTML += '<br> Upper case: ' +currentWord.toUpperCase();
document.getElementById('word').innerHTML += '<br> Lower case: ' +currentWord.toLowerCase();
document.getElementById('word').innerHTML += '<br> Length: ' +currentWord.length;

for( var i = 0; i < currentWord.length; i++){
	for(var x = 0; x < vowels.length; x++){
		if(currentWord.toUpperCase().charAt(i) == vowels[x])
		v++;} }
	
	document.getElementById('word').innerHTML += '<br> Vowels: ' +v;
	
	// Ignore if text field is empty.
	var guessedChar = document.getElementById("guessed").value;
	if(guessedChar != ""){ inputReader(currentWord,guessedChar); }
	
}



function inputReader(currentWord,guessedChar){
	
	
	
	var hits = 0;
	var positions =  " ";
	for( var i = 0; i < currentWord.length; i++){
		if(currentWord.toLowerCase().charAt(i) == guessedChar.toLowerCase()){
		hits++ ; 
		positions += i +", "; }}
	
	if(hits >=  1){
	document.getElementById('word').innerHTML += '<br> Contains: ' +"YES";
	document.getElementById('word').innerHTML += '<br> Times found: ' +hits; 
	document.getElementById('word').innerHTML += '<br> Index(s): ' +positions; 
	}
	else{
	document.getElementById('word').innerHTML += '<br> Contains: ' +"NO";}
	
	
	
	
	
	
	
	
	
	
	
	
}
