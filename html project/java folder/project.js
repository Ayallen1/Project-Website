const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-indicator h4');

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 10);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} at ${hours}:${minutes > 9 ? minutes : '0' + minutes}am`;

const futureTime = futureDate.getTime();

function getCountdownTimer() {
    const today = new Date().getTime();
    const remainingTime = futureTime - today;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(remainingTime / oneDay);
    let hours = Math.floor((remainingTime % oneDay) / oneHour);
    let minutes = Math.floor((remainingTime % oneHour) / oneMinute);
    let seconds = Math.floor((remainingTime % oneMinute) / 1000);

    const values = [days, hours, minutes, seconds];

    function format(item) {
        return item < 10 ? `0${item}` : item;
    }

    items.forEach((item, index) => {
        item.innerHTML = format(values[index]);
    });

    if (remainingTime < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired expired-message">Sorry,this giveaway has expired!<br/> Please check back soon.</h4>`;
        const expiredMessage = document.querySelector('.expired-message');
        expiredMessage.style.color = 'red';
        expiredMessage.style.fontWeight = 'bold';
        expiredMessage.textContent = expiredMessage.textContent.toUpperCase();
    }
}

let countdown = setInterval(getCountdownTimer, 1000);
getCountdownTimer();
