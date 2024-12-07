// Declare variables for terms and clues
var clueList;
var termList;
var vocabList;
var currentTerm;
var currentClue;
var termToggle;
var chosenTerm = [];
var chosenClue = [];
var navIndex;

// Initialize the Bingo game
reset();
compileList();

// SPLASH SCREEN BUTTON (When the game starts)
onEvent("splash_button", "click", function() {
  hideElement("splash_screen");
  hideElement("splash_button");
  vocabListDisplay();
});

// DICE BUTTON (Randomly selects a term and clue)
onEvent("button_random", "click", function() {
  termToggle = false;
  pickTerm();
  hideElement("termTextbox");
  hideElement("list_highlight");
  hideElement("glass_highlight");
  showElement("dice_highlight");
  clueSelect();
  arrowUpdate();
});

// MAGNIFYING GLASS BUTTON (Toggles between term and clue)
onEvent("button_term", "click", function() {
  hideElement("list_highlight");
  hideElement("dice_highlight");
  termToggle = !termToggle;
  termToggleCheck();
  clueSelect();
  arrowUpdate();
});

// LIST BUTTON (Displays all terms and clues in a list)
onEvent("button_list", "click", function() {
  termToggle = false;
  chosenTermDisplay();
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  showElement("list_highlight");
  arrowUpdate();
});

// BACK BUTTON (Navigates to the previous term/clue)
onEvent("back_button", "click", function() {
  var toggleTemp = termToggle;
  navIndex--;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

// FORWARD BUTTON (Navigates to the next term/clue)
onEvent("forward_button", "click", function() {
  var toggleTemp = termToggle;
  navIndex++;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

// Pick a random term and its clue
function pickTerm() {
  if (termList.length > 0){
    var rand = randomNumber(0, termList.length - 1);
    currentTerm = termList[rand];
    currentClue = clueList[rand];
    removeItem(termList, rand);
    removeItem(clueList, rand);
    appendItem(chosenTerm, currentTerm);
    appendItem(chosenClue, currentClue);
    navIndex = chosenClue.length - 1;
  } else {
    currentClue = "There are no more clues left!";
    currentTerm = " ";
  }
}

// Compile the list of terms into a string
function compileList(){
  for (var i = 0; i < termList.length; i++){
    vocabList += (termList[i] + "\n");
  }
}

// Display the list of all terms and clues
function vocabListDisplay() {
  setText("clueTextbox", " ");
  setText("termTextbox", " ");
  hideElement("clueText");
  hideElement("termText");
  hideElement("chosenText");
  showElement("listText");
  setProperty("clueTextbox", "font-size", 12);
  setText("clueTextbox", vocabList);
}

// Display the chosen terms and clues
function chosenTermDisplay() {
  setText("clueTextbox", " ");
  setText("termTextbox", " ");
  hideElement("clueText");
  hideElement("termText");
  hideElement("listText");
  showElement("chosenText");
  setProperty("clueTextbox", "font-size", 12);
  var chosenTermList = "";
  for (var i = 0; i < chosenTerm.length; i++){
    chosenTermList += chosenTerm[i] + "\n";
  }
  setText("clueTextbox", chosenTermList);
}

// Display the current clue and term
function clueSelect() {
  setText("clueTextbox", " ");
  setText("termTextbox", " ");
  showElement("clueText");
  showElement("termText");
  hideElement("listText");
  hideElement("chosenText");
  setProperty("clueTextbox", "font-size", 14);
  if (currentClue != null && currentTerm != null){
    setText("clueTextbox", currentClue);
    setText("termTextbox", currentTerm);
  }
}

// Toggle term visibility
function termToggleCheck() {
  if (termToggle) {
    showElement("termTextbox");
    showElement("glass_highlight");
  } else {
    hideElement("termTextbox");
    hideElement("glass_highlight");
  }
}

// Update navigation arrows based on current term
function arrowUpdate() {
  if (navIndex > 0 && chosenTerm.length > 0) {
    showElement("back_arrow_active");
    hideElement("back_arrow_grey");
    showElement("back_button");
  } else {
    hideElement("back_arrow_active");
    showElement("back_arrow_grey");
    hideElement("back_button");
  }
  if (navIndex >= 0 && navIndex < chosenTerm.length - 1) {
    showElement("forward_arrow_active");
    hideElement("forward_arrow_grey");
    showElement("forward_button");
  } else {
    hideElement("forward_arrow_active");
    showElement("forward_arrow_grey");
    hideElement("forward_button");
  }
}

// Navigate between terms
function navigate() {
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");

  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

// Navigate to the next term
function navigateForward() {
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");
  navIndex++;
  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

// Reset the Bingo game
function reset() {
  // Define the terms (coding terms) and their definitions
  termList = [
    "HTML", "Python", "Debugging", "Build a Website", "GitHub", 
    "JavaScript", "API", "Open Source", "Mobile App", "CSS", 
    "Game Dev", "Code Break", "Favorite IDE", "SQL", "Learned Today", 
    "Java", "Hackathon", "Stack Overflow", "Algorithm", "Git", 
    "Cloud Computing", "Full Stack", "Data Structures", "Function"
  ];

  clueList = [
    "HTML is the language used to create and structure web pages.",
    "Python is a versatile programming language known for its easy syntax.",
    "Debugging is finding and fixing errors in your code.",
    "Building a website involves using HTML, CSS, and JavaScript to create a webpage.",
    "GitHub is a platform to store and share code, using Git version control.",
    "JavaScript is used to create interactive elements on websites.",
    "API is a set of protocols that allows one software to communicate with another.",
    "Open Source software allows anyone to view, modify, and share the code.",
    "A mobile app is an application designed for smartphones and tablets.",
    "CSS is used to style the appearance of web pages.",
    "Game Dev refers to the process of creating video games, involving programming, design, and testing.",
    "Code Break refers to the moment when you solve a challenging coding problem.",
    "Your favorite IDE is the environment you use to write and test your code.",
    "SQL is a language for managing and querying databases.",
    "Learned Today is a reminder of what new things you've learned in coding.",
    "Java is a widely-used programming language used in web apps and Android development.",
    "A Hackathon is a collaborative event where developers work on software projects.",
    "Stack Overflow is a popular website for asking and answering programming questions.",
    "An Algorithm is a set of instructions to solve a problem or complete a task.",
    "Git is a version control system to manage changes in your code.",
    "Cloud Computing allows you to store and process data over the internet.",
    "Full Stack development involves working on both the front-end and back-end of a web application.",
    "Data Structures are ways of organizing and storing data efficiently.",
    "A Function is a reusable block of code that performs a specific task."
  ];

  vocabList = "";
  chosenTerm = [];
  currentTerm = null;
  currentClue = null;
  termToggle = false;
  navIndex = 0;
  chosenTerm = [];
  chosenClue = [];
  hideElement("back_arrow_active");
  hideElement("forward_arrow_active");
  hideElement("back_button");
  hideElement("forward_button");
}
