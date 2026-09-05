const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}-message`;

  if (type === 'assistant') {
    message.innerHTML = `<div class="message-label">Payroll Assistant</div><p></p>`;
  } else {
    message.innerHTML = '<p></p>';
  }

  message.querySelector('p').textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function demoReply(question) {
  const text = question.toLowerCase();

  if (text.includes('tax')) {
    return 'In the current payroll project, tax is calculated from the employee\'s basic salary using the calculate_tax function.';
  }

  if (text.includes('deduction')) {
    return 'The current payroll calculation includes tax as a deduction. HRA and bonus are added before calculating net salary.';
  }

  if (text.includes('salary') || text.includes('net')) {
    return 'The current calculation is: basic salary + HRA + bonus - tax. HRA is 20% of basic salary and bonus is 10%.';
  }

  return 'I am currently in demo mode. Later, this message can be sent to your backend and AI API to answer payroll questions using your database.';
}

function sendMessage(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, 'user');
  messageInput.value = '';

  setTimeout(() => {
    addMessage(demoReply(cleanQuestion), 'assistant');
  }, 350);
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(messageInput.value);
});

document.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => {
    sendMessage(button.dataset.question);
  });
});
