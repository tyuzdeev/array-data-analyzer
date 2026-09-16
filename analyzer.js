// analyzer.js

function analyzeArray() {
    // 1. Берем строку из инпута
    let inputString = document.getElementById("array-input").value;
    
    // 2. Делим по запятой
    let stringArray = inputString.split(",");
    let numbers = [];

    // 3. Чистим от пробелов и переводим в настоящие числа
    for (let i = 0; i < stringArray.length; i++) {
        // parseInt убирает пробелы и делает из строки число
        let num = parseInt(stringArray[i]); 
        
        // Проверка, чтобы не сломалось, если ввели букву или лишнюю запятую
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }

    // 4. Главная логика поиска дублей (Сложность O(N))
    let positions = {};

    for (let i = 0; i < numbers.length; i++) {
        let val = numbers[i];
        
        // Если такого числа еще не было, создаем пустой массив для его индексов
        if (positions[val] === undefined) {
            positions[val] = [];
        }
        
        // Добавляем текущий индекс
        positions[val].push(i);
    }

    // 5. Выводим результат на экран
    let resultContainer = document.getElementById("result-container");
    let resultBox = document.getElementById("result-box");
    
    // Показываем скрытый блок
    resultContainer.classList.remove("hidden");
    // Очищаем от старых результатов
    resultBox.innerHTML = ""; 

    let hasDuplicates = false;

    // Проходим по словарю и ищем, где больше 1 индекса
    for (let key in positions) {
        if (positions[key].length > 1) {
            hasDuplicates = true;
            
            // Создаем красивую плашку для каждого дубликата
            let div = document.createElement("div");
            div.className = "bg-gray-700/50 p-3 rounded-lg border border-gray-600";
            div.innerHTML = `<span class="text-emerald-400 font-bold">Элемент [${key}]</span> повторяется ${positions[key].length} раза. Позиции: <span class="text-gray-300">${positions[key].join(', ')}</span>`;
            
            resultBox.appendChild(div);
        }
    }

    // Если дублей вообще нет
    if (hasDuplicates === false) {
        let div = document.createElement("div");
        div.className = "text-gray-400 p-3 text-center";
        div.innerText = "Дубликатов не найдено. Массив уникален!";
        resultBox.appendChild(div);
    }
}
