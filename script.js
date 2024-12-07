// Global Variables
var clueList;
var termList;
var vocabList = '';
var currentTerm;
var currentClue;
var termToggle;
var chosenTerm = [];
var chosenClue = [];
var navIndex = 0;

// Initialize the game
reset();
compileList();

// Splash Screen Button Event
onEvent("splash_button", "click", function() {
  hideElement("splash_screen");
  hideElement("splash_button");
  vocabListDisplay();
});

// Random Term Button Event (Dice Button)
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

// Magnifying Glass Button Event (Toggle Term)
onEvent("button_term", "click", function() {
  hideElement("list_highlight");
  hideElement("dice_highlight");
  termToggle = !termToggle;
  termToggleCheck();
  clueSelect();
  arrowUpdate();
});

// List Button Event (Show List of All Terms)
onEvent("button_list", "click", function() {
  termToggle = false;
  chosenTermDisplay();
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  showElement("list_highlight");
  arrowUpdate();
});

// Back Button Event
onEvent("back_button", "click", function() {
  var toggleTemp = termToggle;
  navIndex--;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

// Forward Button Event
onEvent("forward_button", "click", function() {
  var toggleTemp = termToggle;
  navIndex++;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

// Function to pick a random term
function pickTerm() {
  if (termList.length > 0) {
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

// Function to compile the list of terms for display
function compileList() {
  for (var i = 0; i < termList.length; i++) {
    vocabList += (termList[i] + "\n");
  }
}

// Function to display all terms in a list
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

// Function to display the chosen terms
function chosenTermDisplay() {
  setText("clueTextbox", " ");
  setText("termTextbox", " ");
  hideElement("clueText");
  hideElement("termText");
  hideElement("listText");
  showElement("chosenText");
  setProperty("clueTextbox", "font-size", 12);
  var chosenTermList = "";
  for (var i = 0; i < chosenTerm.length; i++) {
    chosenTermList += chosenTerm[i] + "\n";
  }
  setText("clueTextbox", chosenTermList);
}

// Function to select a clue to display
function clueSelect() {
  setText("clueTextbox", " ");
  setText("termTextbox", " ");
  showElement("clueText");
  showElement("termText");
  hideElement("listText");
  hideElement("chosenText");
  setProperty("clueTextbox", "font-size", 14);
  if (currentClue != null && currentTerm != null) {
    setText("clueTextbox", currentClue);
    setText("termTextbox", currentTerm);
  }
}

// Function to toggle whether to show the term or not
function termToggleCheck() {
  if (termToggle) {
    showElement("termTextbox");
    showElement("glass_highlight");
  } else {
    hideElement("termTextbox");
    hideElement("glass_highlight");
  }
}

// Function to update the navigation arrows (back and forward)
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

// Function to navigate through chosen terms
function navigate() {
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");

  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

// Function to navigate forward through chosen terms
function navigateForward() {
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");
  navIndex++;
  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

// Function to reset the game
function reset() {
  clueList = [
    "A markup language for creating web pages",
    "A high-level, interpreted programming language",
    "The process of finding and fixing errors in code",
    "A tool for managing code versions and collaborating on projects",
    "A scripting language that allows interactive content on websites",
    "A method for two software components to communicate",
    "A code or software that is made freely available for anyone to use or modify",
    "An application developed for mobile devices",
    "A style sheet language used to describe the look of a document",
    "The process of creating video games",
    "A puzzle game that involves deciphering a code",
    "A developer’s most-used tool for writing code",
    "A language used for managing data in databases",
    "What you learned during a coding session",
    "A widely-used programming language known for its portability",
    "An online platform for developers to ask questions and share knowledge",
    "A set of steps used to solve a problem or perform a task",
    "A system for managing and sharing code repositories",
    "Remote servers that store data and run applications",
    "A complete development stack for both frontend and backend",
    "The structures that hold and organize data in a program",
    "A block of reusable code to perform a specific task"
  ];

  termList = [
    "HTML", "Python", "Debugging", "GitHub", "JavaScript", "API", "Open Source", "Mobile App", "CSS", "Game Dev", "Code Break", 
    "Favorite IDE", "SQL", "Learned Today", "Java", "Hackathon", "Stack Overflow", "Algorithm", "Git", "Cloud Computing", 
    "Full Stack", "Data Structures", "Function"
  ];

  vocabList = "";
  chosenTerm = [];
  currentTerm = null;
  currentClue = null;
  termToggle = false;
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");
  navIndex = 0;
  chosenTerm = [];
  chosenClue = [];
  hideElement("back_arrow_active");
  hideElement("forward_arrow_active");
  hideElement("back_button");
  hideElement("forward_button");
}
