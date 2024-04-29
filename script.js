let topPositions = [0, 0, 0];
let storageHeight = 0;
let animationIntervals = [null, null, null];
let animationIntervalsStorage = [null, null, null];
let storages = [false, false, false];

function toggleWaterLevel(num) {
    const waterflow = document.getElementById(`waterflow${num}`);
    const btn = document.getElementById(`btn${num}`);

    btn.classList.toggle("active");
    waterflow.classList.toggle("flow");
    storages[num - 1] = !storages[num - 1];
    if (!animationIntervals[num - 1]) {
        animationIntervals[num - 1] = setInterval(() => decreaseWaterLevel(num, waterflow), 50);
        if (!animationIntervalsStorage[num - 1]) {
            animationIntervalsStorage[num - 1] = setInterval(() => waterStorage(num), 50);
        }
    } else {
        clearInterval(animationIntervals[num - 1]);
        animationIntervals[num - 1] = null;
    }
}

function decreaseWaterLevel(num, waterflow) {
    
    if (topPositions[num - 1] <= 100) {
        topPositions[num - 1] += 1;
        updateWaterLevel(num);
    }

    if (topPositions[num - 1] > 100) {
        waterflow.classList.toggle("flow");
        clearInterval(animationIntervals[num - 1]);
        animationIntervals[num - 1] = null;
        storages[num - 1] = false;
    }
}

function waterStorage(num) {
    if (storages[num - 1]) {
        storageHeight += 0.1;
        updateStorage();
    }
    else{
        clearInterval(animationIntervalsStorage[num - 1]);
        animationIntervalsStorage[num - 1] = null;
    }
}

function updateWaterLevel(num) {
    const waterElement = document.getElementById(`water${num}`);
    waterElement.style.top = topPositions[num - 1] + '%';
}

function updateStorage() {
    const waterStore = document.getElementById('w-storage');
    waterStore.style.height = storageHeight + '%';
}
