const flashcardsKey = "flashcards_data";

let flashcards = JSON.parse(localStorage.getItem(flashcardsKey)) || [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "2 + 2 = ?", answer: "4" },
];

let currentIndex = 0;
let showingAnswer = false;

const flashcardContent = document.getElementById("flashcard-content");
const toggleAnswerBtn = document.getElementById("toggle-answer-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const flashcardForm = document.getElementById("flashcard-form");
const editIndexInput = document.getElementById("edit-index");
const clearFormBtn = document.getElementById("clear-form-btn");

const flashcardList = document.getElementById("flashcard-list");

function saveFlashcards() {
  localStorage.setItem(flashcardsKey, JSON.stringify(flashcards));
}

function renderFlashcard() {
  if (flashcards.length === 0) {
    flashcardContent.textContent = "No flashcards available. Add some!";
    toggleAnswerBtn.style.display = "none";
    return;
  }
  toggleAnswerBtn.style.display = "inline-block";

  if (showingAnswer) {
    flashcardContent.textContent = flashcards[currentIndex].answer;
    toggleAnswerBtn.textContent = "Show Question";
  } else {
    flashcardContent.textContent = flashcards[currentIndex].question;
    toggleAnswerBtn.textContent = "Show Answer";
  }
}

function renderFlashcardList() {
  flashcardList.innerHTML = "";
  flashcards.forEach((card, index) => {
    const li = document.createElement("li");
    li.textContent = card.question;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      questionInput.value = card.question;
      answerInput.value = card.answer;
      editIndexInput.value = index;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this flashcard?")) {
        flashcards.splice(index, 1);
        if (currentIndex >= flashcards.length) currentIndex = flashcards.length - 1;
        saveFlashcards();
