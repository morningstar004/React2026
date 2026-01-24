const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const counterValue = document.getElementById('counterValue');

let count = 0;

incrementBtn.addEventListener('click', function() {
    count += 1;
    console.log(count);
    counterValue.textContent = count;
});

decrementBtn.addEventListener('click', function() {
    count -= 1;
    counterValue.textContent = count;
});

counterValue.textContent = count;   
