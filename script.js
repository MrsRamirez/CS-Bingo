var clueList;
var termList;
var vocabList;
var currentTerm;
var currentClue;
var termToggle;
var chosenTerm = [];
var chosenClue = [];
var navIndex;


reset();
compileList();

onEvent("splash_button", "click", function( ) {              // SPLASH BUTTON
  hideElement("splash_screen");  
  hideElement("splash_button");  
  vocabListDisplay();
});

onEvent("button_random", "click", function( ) {              // DICE BUTTON
  termToggle = false;
  pickTerm();
  hideElement("termTextbox");
  hideElement("list_highlight");
  hideElement("glass_highlight");
  showElement("dice_highlight");
  clueSelect();
  arrowUpdate();
});

onEvent("button_term", "click", function( ) {               // MAGNIFYING GLASS BUTTON
  hideElement("list_highlight");
  hideElement("dice_highlight");
  termToggle = !termToggle;
  termToggleCheck();
  clueSelect();
  arrowUpdate();
});

onEvent("button_list", "click", function( ) {               // LIST BUTTON
  termToggle = false;
  chosenTermDisplay();
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  showElement("list_highlight");
  arrowUpdate();
});

onEvent("back_button", "click", function( ) {               // BACK NAV BUTTON
  var toggleTemp = termToggle;
  navIndex--;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

onEvent("forward_button", "click", function( ) {            // FORWARD NAV BUTTON
  var toggleTemp = termToggle;
  navIndex++;
  navigate();
  arrowUpdate();
  termToggle = toggleTemp;
  termToggleCheck();
});

function pickTerm() {
  if (termList.length > 0){
    var rand = randomNumber(0, termList.length-1);
    currentTerm = termList[rand];
    currentClue = clueList[rand];
    removeItem(termList, rand);
    removeItem(clueList, rand);
    appendItem(chosenTerm, currentTerm);
    appendItem(chosenClue, currentClue);
    navIndex = chosenClue.length-1;
  } else {
    currentClue = "There are no more clues left!";
    currentTerm = " ";
  }
}

function compileList(){
  for(var i = 0; i < termList.length; i++){
    vocabList += (termList[i] + "\n");
  }
}

function vocabListDisplay(){
  setText("clueTextbox"," ");
  setText("termTextbox"," ");
  hideElement("clueText");
  hideElement("termText");
  hideElement("chosenText");
  showElement("listText");
  setProperty("clueTextbox", "font-size", 12);
  setText("clueTextbox", vocabList);
}

function chosenTermDisplay(){
  setText("clueTextbox"," ");
  setText("termTextbox"," ");
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

function clueSelect(){
  setText("clueTextbox", " ");
  setText("termTextbox"," ");
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

function termToggleCheck(){
  if (termToggle){
    showElement("termTextbox");
    showElement("glass_highlight");
  } else {
    hideElement("termTextbox");
    hideElement("glass_highlight");
  }
}

function arrowUpdate(){

  if (navIndex > 0 && chosenTerm.length > 0){
    showElement("back_arrow_active");
    hideElement("back_arrow_grey");
    showElement("back_button");
  } else {
    hideElement("back_arrow_active");
    showElement("back_arrow_grey");    
    hideElement("back_button");
  }
  if (navIndex >= 0 && navIndex < chosenTerm.length - 1){
    showElement("forward_arrow_active");
    hideElement("forward_arrow_grey");
    showElement("forward_button");
  } else {
    hideElement("forward_arrow_active");
    showElement("forward_arrow_grey");    
    hideElement("forward_button");
  }
}

function navigate(){
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");

  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

function navigateForward(){
  hideElement("dice_highlight");
  hideElement("glass_highlight");
  hideElement("list_highlight");
  navIndex++;
  currentClue = chosenClue[navIndex];
  currentTerm = chosenTerm[navIndex];
  clueSelect();
}

function reset(){
  clueList = getColumn("CSP_Vocabulary_Bingo_6", "Clue");
  termList = getColumn("CSP_Vocabulary_Bingo_6", "Term");
  vocabList = "";
  chosenTerm = [];
  currentTerm = null;
  currentClue = null;
  var termToggle = false;
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


