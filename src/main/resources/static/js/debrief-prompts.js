/*JavaScript variable and arraylist to store questions*/
const array = ['What game topic did you choose and how did you find the game?', 'Were there some questions/topics in particular you struggled with?', 'How would you approach the game differently?', 'Would you recommend this game to your friends? Why?', 'What do you think are the most effective counter measures that were mentioned for your chosen disaster topic?', 'What did you make of the timer constraint? How did this affect how you played the game?'];

const it = array[Symbol.iterator]();

const el = document.getElementById('question');

/*JavaScript function for calling the questions when the button with id "next" is clicked*/
document.getElementById('next').onclick = function() {
  let next = it.next(); // This presents the next element
  (next.done) ?
  	[el.innerText, this.innerText, this.disabled] = ['That is the end of the debrief session! Hope you enjoyed it.', 'Done', true]
  	: el.innerText = next.value;
}


