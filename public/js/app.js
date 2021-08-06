const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetchForecast();
});
let messageOne = document.getElementById("message-1");
let messageTwo = document.getElementById("message-2");
messageOne.textContent = "";
messageTwo.textContent = "";
const fetchForecast = () =>
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;

        console.log(data);
      }
    });
  });
