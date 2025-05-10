document.addEventListener("DOMContentLoaded", function () {
  // 1. Аккордеон (раскрытие таблиц)
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  if (accordionHeaders.length > 0) {
      accordionHeaders.forEach(header => {
          header.addEventListener("click", function () {
              const parentTable = this.closest(".table-lesson");
              if (!parentTable) return;

              const content = parentTable.querySelector(".accordion-content");
              const triangle = parentTable.querySelector("#triangle-accordion");

              if (!content || !triangle) return;

              if (content.style.display === "none" || content.style.display === "") {
                  content.style.display = "table-row-group";
                  triangle.innerHTML = '<td colspan="3" id="triangle-accordion">Дисциплины &#9660;</td>';
              } else {
                  content.style.display = "none";
                  triangle.innerHTML = '<td colspan="3" id="triangle-accordion">Дисциплины &#9658;</td>';
              }
          });
      });
  }

  // 2. Таймер обратного отсчёта
  const countdownElement = document.getElementById("countdown");
  const countdownContainer = document.getElementById("countdownContainer");
  const closeCountdownBtn = document.getElementById("closeCountdown");

  if (countdownElement) {
      const targetDate = new Date("2025-06-20T23:59:59").getTime();

      function updateCountdown() {
          const now = new Date().getTime();
          const timeRemaining = targetDate - now;

          if (timeRemaining <= 0) {
              countdownElement.textContent = "Приёмная комиссия уже работает!";
              return;
          }

          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          countdownElement.textContent = `Начало работы приемной комиссии через: ${days} дня ${hours} часов ${minutes} минут ${seconds} секунд`;
      }

      setInterval(updateCountdown, 1000);
      updateCountdown();

      if (closeCountdownBtn && countdownContainer) {
          closeCountdownBtn.addEventListener("click", function () {
              countdownContainer.style.display = "none";
          });
      }
  }

  // 3. Экран загрузки
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const timerElement = document.getElementById("timer");
  const textLoad = document.getElementById("text-loader");

  if (loadingScreen && timerElement && textLoad) {
      const rand = Math.floor(Math.random() * 2);
      switch (rand) {
          case 1:
              textLoad.innerHTML = '<p id="text-loader">Бежим на кафедру Информационных Технологий</p>';
              break;
          default:
              textLoad.innerHTML = '<p id="text-loader">Уже почти на кафедре Информационных Технологий</p>';
              break;
      }

      let timeLeft = 3;
      const countdown = setInterval(() => {
          if (timeLeft > 0) {
              timerElement.textContent = timeLeft;
              timeLeft--;
          } else {
              clearInterval(countdown);
              setTimeout(() => {
                  loadingScreen.style.display = "none";
                  if (mainContent) mainContent.style.display = "block";
              }, 200);
          }
      }, 500);
  }

  // 4. Форма входа
  const form = document.querySelector('.login-form');
  if (form) {
      const emailInput = form.querySelector('input[name="username"]');
      const passwordInput = form.querySelector('input[name="password"]');
      const errorMailMessage = form.querySelector('.error_mail_pas:first-of-type');
      const errorPasswordMessage = form.querySelector('.error_mail_pas:last-of-type');

      if (errorMailMessage && errorPasswordMessage) {
          errorMailMessage.style.display = 'none';
          errorPasswordMessage.style.display = 'none';
      }

      // лучшая что есть в интеренете:
      const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@(?:[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

      function validateEmail(email) {
          return emailRegex.test(email);
      }

      function validatePassword(password) {
          return password.length >= 6;
      }

      form.addEventListener('submit', (event) => {
          event.preventDefault();

          const email = emailInput?.value.trim() || "";
          const password = passwordInput?.value.trim() || "";

          let isValid = true;

          if (!validateEmail(email)) {
              if (errorMailMessage) errorMailMessage.style.display = 'block';
              isValid = false;
          } else {
              if (errorMailMessage) errorMailMessage.style.display = 'none';
          }

          if (!validatePassword(password)) {
              if (errorPasswordMessage) errorPasswordMessage.style.display = 'block';
              isValid = false;
          } else {
              if (errorPasswordMessage) errorPasswordMessage.style.display = 'none';
          }

          if (isValid) {
              alert('Запрос на вход в методический кабинет отправлен!');
          }
      });
  }

  // 5. Масштабирование изображений
  const scaleButton = document.getElementById("scale-button");
  let isScaled = false;

  if (scaleButton) {
      scaleButton.addEventListener('click', () => {
          const images = document.querySelectorAll('img');
          images.forEach(img => {
              img.style.transform = isScaled ? 'scale(1)' : 'scale(1.2)';
          });
          isScaled = !isScaled;
      });
  }

  // 6. Копирование телефонов
  const phoneElements = document.querySelectorAll('.phone');
  const notification = document.getElementById('copy-notification');

  phoneElements.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
          const fullText = this.textContent.trim();
          const phoneNumber = fullText.split('—')[0].trim();

          navigator.clipboard.writeText(phoneNumber).then(() => {
              if (notification) {
                  notification.classList.add('show');
                  setTimeout(() => {
                      notification.classList.remove('show');
                  }, 3000);
              }
          }).catch(err => {
              console.error('Ошибка копирования:', err);
          });
      });
  });
});