// Переключение вариантов
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".variant").forEach(v => v.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
    });
});
 
// Вариант 2
const form2 = document.getElementById("form2");
const message2 = document.getElementById("message2");
const counter2 = document.getElementById("counter2");
 
message2.addEventListener("input", () => {
    counter2.textContent = message2.value.length;
});
 
form2.addEventListener("submit", event => {
    event.preventDefault();
    clearErrors(["name2", "topic2", "message2"]);
    const name = document.getElementById("name2").value.trim();
    const topic = document.getElementById("topic2").value;
    const message = message2.value.trim();
    let valid = true;
 
    if (!name) {
        showError("name2", "Введите имя.");
        valid = false;
    }
    if (!topic) {
        showError("topic2", "Выберите тему сообщения.");
        valid = false;
    }
    if (!message) {
        showError("message2", "Введите текст сообщения.");
        valid = false;
    } else if (message.length < 10) {
        showError("message2", "Сообщение должно содержать минимум 10 символов.");
        valid = false;
    }
 
    const result = document.getElementById("result2");
    if (valid) {
        result.className = "result success";
        result.textContent = `Сообщение отправлено: ${name} — «${topic}».`;
    } else {
        result.className = "result failure";
        result.textContent = "Исправьте ошибки в форме.";
    }
});
 
// Вариант 8
const form8 = document.getElementById("form8");
const product8 = document.getElementById("product8");
const quantity8 = document.getElementById("quantity8");
const total8 = document.getElementById("total8");
 
function calculateTotal8() {
    const productPrice = Number(product8.selectedOptions[0].dataset.price || 0);
    const quantity = Number(quantity8.value) || 0;
    const delivery = document.querySelector('input[name="delivery8"]:checked');
    const deliveryPrice = Number(delivery?.dataset.price || 0);
    const services = [...document.querySelectorAll('input[name="service8"]:checked')]
        .reduce((sum, item) => sum + Number(item.dataset.price || 0), 0);
    total8.textContent = `${productPrice * quantity + deliveryPrice + services} ₸`;
}
[product8, quantity8, ...document.querySelectorAll('input[name="delivery8"], input[name="service8"]')]
    .forEach(element => element.addEventListener("change", calculateTotal8));
quantity8.addEventListener("input", calculateTotal8);
 
form8.addEventListener("submit", event => {
    event.preventDefault();
    clearErrors(["product8", "quantity8"]);
    document.getElementById("error-delivery8").textContent = "";
 
    const quantity = Number(quantity8.value);
    let valid = true;
 
    if (!product8.value) {
        showError("product8", "Выберите товар.");
        valid = false;
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
        showError("quantity8", "Количество должно быть целым числом больше 0.");
        valid = false;
    }
    if (!document.querySelector('input[name="delivery8"]:checked')) {
        document.getElementById("error-delivery8").textContent = "Выберите способ доставки.";
        valid = false;
    }
 
    const result = document.getElementById("result8");
    if (valid) {
        result.className = "result success";
        result.textContent = `Заказ оформлен. Итоговая стоимость: ${total8.textContent}`;
    } else {
        result.className = "result failure";
        result.textContent = "Исправьте ошибки в форме.";
    }
});
 
// Вариант 16
const form16 = document.getElementById("form16");
 
form16.addEventListener("submit", event => {
    event.preventDefault();
    clearErrors(["name16", "email16", "phone16", "address16", "delivery16", "payment16"]);
    document.getElementById("error-agree16").textContent = "";
    document.getElementById("error-personal16").textContent = "";
 
    const name = document.getElementById("name16").value.trim();
    const email = document.getElementById("email16").value.trim();
    const phone = document.getElementById("phone16").value.trim();
    const address = document.getElementById("address16").value.trim();
    const delivery = document.getElementById("delivery16").value;
    const payment = document.getElementById("payment16").value;
    const agree = document.getElementById("agree16").checked;
    const personal = document.getElementById("personal16").checked;
 
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d[\d\s()-]{9,}$/;
 
    if (!name) { showError("name16", "Введите имя."); valid = false; }
    if (!emailPattern.test(email)) { showError("email16", "Введите корректный e-mail."); valid = false; }
    if (!phonePattern.test(phone)) { showError("phone16", "Введите корректный номер телефона."); valid = false; }
    if (!address) { showError("address16", "Введите адрес доставки."); valid = false; }
    if (!delivery) { showError("delivery16", "Выберите способ доставки."); valid = false; }
    if (!payment) { showError("payment16", "Выберите способ оплаты."); valid = false; }
    if (!agree) {
        document.getElementById("error-agree16").textContent = "Необходимо согласиться с условиями заказа.";
        valid = false;
    }
    if (!personal) {
        document.getElementById("error-personal16").textContent = "Необходимо согласиться на обработку персональных данных.";
        valid = false;
    }
 
    const result = document.getElementById("result16");
    if (valid) {
        result.className = "result success";
        result.textContent = `Заказ подтвержден. Получатель: ${name}. Доставка: ${delivery}. Оплата: ${payment}.`;
    } else {
        result.className = "result failure";
        result.textContent = "Исправьте ошибки, отмеченные рядом с полями.";
    }
});
 
function showError(id, text) {
    const field = document.getElementById(id);
    field.classList.add("invalid");
    field.classList.remove("valid");
    const error = document.getElementById(`error-${id}`);
    if (error) error.textContent = text;
}
 
function clearErrors(ids) {
    ids.forEach(id => {
        const field = document.getElementById(id);
        field.classList.remove("invalid");
        field.classList.add("valid");
        const error = document.getElementById(`error-${id}`);
        if (error) error.textContent = "";
    });
}
