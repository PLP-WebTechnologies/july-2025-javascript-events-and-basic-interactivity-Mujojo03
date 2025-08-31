// Initialize variables
let count = parseInt(localStorage.getItem('clickCount')) || 0;
const countBtn = document.getElementById("countBtn");
const countDisplay = document.getElementById("countDisplay");

// Update display
countDisplay.textContent = "Count: " + count;

// Click counter with persistence
countBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = "Count: " + count;
  localStorage.setItem('clickCount', count);
});

// Toggle Dark/Light Theme with persistence
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// FAQ Toggle
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  });
});

const form = document.getElementById("signupForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Error display
  let valid = true;

  // Name Validation
  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Name must be at least 3 characters.";
    valid = false;
  } else {
    document.getElementById("nameError").textContent = "";
  }

  // Email Validation (basic regex)
  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Enter a valid email.";
    valid = false;
  } else {
    document.getElementById("emailError").textContent = "";
  }

  // Password Validation (at least 6 chars)
  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
    valid = false;
  } else {
    document.getElementById("passwordError").textContent = "";
  }

  // Final Message
  const formMessage = document.getElementById("formMessage");
  if (valid) {
    formMessage.textContent = "✅ Form submitted successfully!";
    formMessage.style.color = "green";
  } else {
    formMessage.textContent = "❌ Please fix the errors above.";
    formMessage.style.color = "red";
  }
});

// Todo List Functionality
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
renderTodos();

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${index})" aria-label="Delete todo item">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Keyboard navigation for theme toggle
document.addEventListener("keydown", (e) => {
  if (e.key === "t" && e.ctrlKey) {
    e.preventDefault();
    themeToggle.click();
  }
});
