// Contact Form functionality
export function initForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', handleSubmit);
  
  // Add input validation
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => clearError(input));
  });
}

function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Validate all inputs
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });
  
  if (!isValid) return;
  
  // Show loading state
  const submitBtn = form.querySelector('.form__submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="btn__text">Отправка...</span>';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showNotification('Сообщение успешно отправлено!', 'success');
    
    // Reset form
    form.reset();
    
    // Restore button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 1500);
}

function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Required validation
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Это поле обязательно';
  }
  
  // Email validation
  if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Введите корректный email';
    }
  }
  
  if (!isValid) {
    showError(input, errorMessage);
  } else {
    clearError(input);
  }
  
  return isValid;
}

function showError(input, message) {
  input.classList.add('error');
  
  // Remove existing error
  const existingError = input.parentElement.querySelector('.form__error');
  if (existingError) existingError.remove();
  
  // Add error message
  const errorElement = document.createElement('span');
  errorElement.className = 'form__error';
  errorElement.textContent = message;
  input.parentElement.appendChild(errorElement);
}

function clearError(input) {
  input.classList.remove('error');
  const errorElement = input.parentElement.querySelector('.form__error');
  if (errorElement) errorElement.remove();
}

function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 68, 68, 0.15)'};
    border: 1px solid ${type === 'success' ? '#00F0FF' : '#FF4444'};
    border-radius: 8px;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Auto remove
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
