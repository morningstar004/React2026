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
    if(counterValue.textContent === '0'){
        document.getElementById('decrement').disabled = true;
    }else if(counterValue.textContent > '0'){
        document.getElementById('decrement').disabled = false;
        count -= 1;
        counterValue.textContent = count;
    }
});

counterValue.textContent = count;   

