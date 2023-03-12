
const form = document.getElementById('inputForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('basicInput').value;
    parseJSON(input);
});