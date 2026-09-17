const exampleBtn = document.getElementById('exampleBtn');
const paragraph = document.getElementById('examplePara');

function exampleBtnEvent() {
    paragraph.textContent = "Javascript works!"
}

exampleBtn.addEventListener('click', exampleBtnEvent);