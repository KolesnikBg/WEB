document.addEventListener("DOMContentLoaded", function () {
    // Находим все заголовки аккордеонов
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const parentTable = this.closest(".table-lesson");
            // Находим содержимое аккордеона внутри этой таблицы
            const content = parentTable.querySelector(".accordion-content");
            const triangle = parentTable.querySelector("#triangle-accordion")

            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "table-row-group"; // Показываем содержимое
                triangle.innerHTML = '<td colspan="3" id="triangle-accordion">Дисциплины &#9660;</td>'
            } else {
                content.style.display = "none"; // style: "none"
                triangle.innerHTML = '<td colspan="3" id="triangle-accordion">Дисциплины &#9658;</td>'
            }
        });
    });
// дата до
    const targetDate = new Date("2025-06-20T23:59:59").getTime();

    function updateCountdown() {
    const now = new Date().getTime(); 
    const timeRemaining = targetDate - now; 

        // расчет времени
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // текст для бегущей строки
        const countdownText = `Начало работы приемной комиссии через: ${days} дня ${hours} часов ${minutes} минут ${seconds} секунд`;

        // подмена текста
        document.getElementById("countdown").textContent = countdownText;
    }

    // таймер 
    setInterval(updateCountdown, 1000);

    // запуск таймера при загрузке страницы
    updateCountdown();

    //закрытие бегущей строки
    document.getElementById("closeCountdown").addEventListener("click", function () {
        const countdownContainer = document.getElementById("countdownContainer");
        countdownContainer.style.display = "none"; // Скрываем контейнер
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const timerElement = document.getElementById("timer");
    const textLoad = document.getElementById("text-loader")
    const rand = Math.floor(Math.random() * 2)
    console.log(rand)
    switch (rand) {
        case 1:
            textLoad.innerHTML = '<p id="text-loader">Бежим на кафедру Информационных Технологий</p>';
            break;
    
        default:
            textLoad.innerHTML = '<p id="text-loader">Уже почти на кафедре Информационных Технологий</p>';
            break;
    }
    let timeLeft = 3; // Начальное значение таймера (в секундах)
    // Функция обновления таймера
    const countdown = setInterval(() => {
        if (timeLeft > 0) {
            timerElement.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(countdown); // Останавливаем таймер

            // экран загрузки скрывается
            setTimeout(() => {
                loadingScreen.style.display = "none"; // скрываем  загрузки
                // mainContent.style.display = "block"; // принтуем основное страницу
            }, 200); // микро задержка по приколу)
        }
    }, 500); // Обновляем каждую секунду
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const emailInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const errorMailMessage = form.querySelector('.error_mail_pas:first-of-type');
    const errorPasswordMessage = form.querySelector('.error_mail_pas:last-of-type');
  
    // Скрываем сообщения об ошибках по умолчанию
    errorMailMessage.style.display = 'none';
    errorPasswordMessage.style.display = 'none';
  
    // Регулярное выражение для проверки корректности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Функция для проверки email
    function validateEmail(email) {
      return emailRegex.test(email);
    }
  
    // Функция для проверки пароля (минимум 6 символов)
    function validatePassword(password) {
      return password.length >= 6;
    }
  
    // Обработчик отправки формы
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Предотвращаем отправку формы
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      let isValid = true;
  
      // Проверка email
      if (!validateEmail(email)) {
        errorMailMessage.style.display = 'block';
        isValid = false;
      } else {
        errorMailMessage.style.display = 'none';
      }
  
      // Проверка пароля
      if (!validatePassword(password)) {
        errorPasswordMessage.style.display = 'block';
        isValid = false;
      } else {
        errorPasswordMessage.style.display = 'none';
      }
  
      // Если все проверки пройдены, можно выполнить дальнейшие действия
      if (isValid) {
        alert('Запрос на вход в методический кабинет отправлен!');
        // Здесь можно добавить логику для отправки данных на сервер
      }
    });
  });