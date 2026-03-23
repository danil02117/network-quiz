class QuizApp {
    constructor() {
        this.currentTopic = 0;
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.showingResult = false;
        this.questions = [];
        this.totalQuestions = 0;
        this.mode = 'topic'; // 'topic' или 'random'
        this.randomQuestionsCount = 30; // количество вопросов в случайном режиме

        this.init();
    }

    init() {
        this.renderStartScreen();
    }

    getAllQuestions() {
        const allQuestions = [];
        questionsData.forEach(topic => {
            topic.questions.forEach(q => {
                allQuestions.push({ ...q, topic: topic.topic });
            });
        });
        return allQuestions;
    }

    // Функция перемешивания вариантов ответов с сохранением индекса правильного ответа
    shuffleOptions(question) {
        const indices = question.options.map((_, i) => i);
        const shuffledIndices = this.shuffleArray([...indices]);
        const newCorrectIndex = shuffledIndices.indexOf(question.correct);
        
        return {
            ...question,
            options: shuffledIndices.map(i => question.options[i]),
            correct: newCorrectIndex
        };
    }

    startTopicMode(topicIndex) {
        this.mode = 'topic';
        this.currentTopic = topicIndex;
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.showingResult = false;
        // Перемешиваем вопросы и варианты ответов в каждом вопросе
        this.questions = this.shuffleArray([...questionsData[topicIndex].questions]).map(q => this.shuffleOptions(q));
        this.totalQuestions = this.questions.length;
        this.render();
    }

    startRandomMode() {
        this.mode = 'random';
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.showingResult = false;
        const allQuestions = this.getAllQuestions();
        // Перемешиваем вопросы и варианты ответов в каждом вопросе
        this.questions = this.shuffleArray(allQuestions).slice(0, this.randomQuestionsCount).map(q => this.shuffleOptions(q));
        this.totalQuestions = this.questions.length;
        this.render();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    selectAnswer(index) {
        if (this.showingResult) return;
        this.selectedAnswer = index;
        this.render();
    }

    confirmAnswer() {
        if (this.selectedAnswer === null) return;
        
        this.showingResult = true;
        const isCorrect = this.selectedAnswer === this.questions[this.currentQuestion].correct;
        
        if (isCorrect) {
            this.score++;
        }
        
        this.render();
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    nextQuestion() {
        this.currentQuestion++;
        this.selectedAnswer = null;
        this.showingResult = false;
        
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
        } else {
            this.render();
        }
    }

    showResults() {
        this.render();
    }

    restartQuiz() {
        if (this.mode === 'topic') {
            this.startTopicMode(this.currentTopic);
        } else {
            this.startRandomMode();
        }
    }

    backToMenu() {
        this.renderStartScreen();
    }

    changeTopic(topicIndex) {
        this.currentTopic = parseInt(topicIndex);
        if (this.mode === 'topic') {
            this.startTopicMode(this.currentTopic);
        }
    }

    getProgress() {
        return ((this.currentQuestion + 1) / this.totalQuestions) * 100;
    }

    renderStartScreen() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="start-screen">
                <div class="start-title">🎓 Подготовка к тесту</div>
                <div class="start-description">
                    Выберите режим тестирования
                </div>
                
                <div class="feature-list">
                    <div class="feature-item">
                        <span class="feature-icon">📚</span>
                        <span><strong>360+ вопросов</strong> по 6 лабораторным работам</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">⚡</span>
                        <span>Мгновенная проверка ответов</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📊</span>
                        <span>Подсчёт результатов в процентах</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📱</span>
                        <span>Работает на любом устройстве</span>
                    </div>
                </div>
                
                <div class="mode-buttons" style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                    <button class="btn btn-primary" onclick="app.showTopicSelect()" style="padding: 20px; font-size: 1.1rem;">
                        📖 По темам
                    </button>
                    <button class="btn btn-secondary" onclick="app.startRandomMode()" style="padding: 20px; font-size: 1.1rem; background: linear-gradient(135deg, #667eea, #764ba2);">
                        🎲 Случайные вопросы
                    </button>
                    <button class="btn abbreviations-btn" onclick="app.showAbbreviations()" style="padding: 20px; font-size: 1.1rem;">
                        📖 Аббревиатуры
                    </button>
                </div>
                
                <div id="topicSelectContainer" style="display: none; width: 100%;">
                    <select class="topic-select" onchange="app.startTopicMode(this.value)" style="margin-bottom: 15px;">
                        <option value="" disabled selected>Выберите тему...</option>
                        ${questionsData.map((item, index) => 
                            `<option value="${index}">${item.topic}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
        `;
    }

    showTopicSelect() {
        const container = document.getElementById('topicSelectContainer');
        if (container) {
            container.style.display = 'block';
            const select = container.querySelector('select');
            if (select) select.focus();
        }
    }

    showAbbreviations() {
        this.renderAbbreviations();
    }

    renderAbbreviations() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="abbreviations-container">
                <div class="abbreviations-header">
                    <div class="abbreviations-title">📖 Справочник аббревиатур</div>
                    <button class="btn btn-secondary" onclick="app.backToMenu()" style="padding: 10px 20px;">
                        ← Меню
                    </button>
                </div>
                
                <input type="text" 
                       class="abbreviations-search" 
                       placeholder="Поиск аббревиатуры..." 
                       oninput="app.filterAbbreviations(this.value)"
                       id="abbreviationsSearch" />
                
                <div id="abbreviationsList">
                    ${this.renderAbbreviationsCategories(abbreviationsData)}
                </div>
            </div>
        `;
    }

    renderAbbreviationsCategories(categories) {
        return categories.map(category => `
            <div class="abbreviations-category" data-category="${category.category.toLowerCase()}">
                <div class="abbreviations-category-title">${category.category}</div>
                <div class="abbreviations-grid">
                    ${category.items.map(item => `
                        <div class="abbreviation-card" data-search="${item.abbr.toLowerCase()} ${item.full.toLowerCase()} ${item.translation.toLowerCase()}">
                            <div class="abbreviation-card-header">
                                <div class="abbreviation-card-abbr">${item.abbr}</div>
                            </div>
                            <div class="abbreviation-card-full">${item.full}</div>
                            <div class="abbreviation-card-translation">${item.translation}</div>
                            <div class="abbreviation-card-description">${item.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    filterAbbreviations(searchTerm) {
        const term = searchTerm.toLowerCase();
        const cards = document.querySelectorAll('.abbreviation-card');
        const categories = document.querySelectorAll('.abbreviations-category');
        
        cards.forEach(card => {
            const searchText = card.getAttribute('data-search');
            if (searchText.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        categories.forEach(category => {
            const visibleCards = category.querySelectorAll('.abbreviation-card[style="display: block;"], .abbreviation-card:not([style])');
            const hasVisible = Array.from(visibleCards).some(card => card.style.display !== 'none');
            if (term === '' || hasVisible) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
    }

    render() {
        const app = document.getElementById('app');
        
        if (this.showingResult && this.currentQuestion < this.questions.length) {
            this.renderQuestionWithResult(app);
        } else if (this.currentQuestion >= this.questions.length) {
            this.renderResults(app);
        } else {
            this.renderQuestion(app);
        }
    }

    renderQuestion(container) {
        const question = this.questions[this.currentQuestion];
        const topicName = this.mode === 'topic' 
            ? questionsData[this.currentTopic].topic 
            : question.topic;
        
        container.innerHTML = `
            <div class="quiz-header">
                <div class="mode-indicator">
                    ${this.mode === 'topic' ? '📖 Тема' : '🎲 Случайный режим'}
                </div>
                ${this.mode === 'topic' ? `
                <div class="topic-selector-small">
                    <select class="topic-select-small" onchange="app.changeTopic(this.value)">
                        ${questionsData.map((item, index) => 
                            `<option value="${index}" ${index === this.currentTopic ? 'selected' : ''}">${item.topic.split('.')[0]}. ${item.topic.split('.')[1]}</option>`
                        ).join('')}
                    </select>
                </div>
                ` : ''}
            </div>
            
            <div class="stats">
                <span>Вопрос ${this.currentQuestion + 1} из ${this.totalQuestions}</span>
                <span>Правильно: ${this.score}</span>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${this.getProgress()}%"></div>
            </div>
            
            <div class="question-card">
                <div class="question-topic">${topicName}</div>
                <div class="question-text">${question.question}</div>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option ${this.selectedAnswer === index ? 'selected' : ''}" 
                             onclick="app.selectAnswer(${index})">
                            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="controls">
                    <button class="btn btn-secondary" onclick="app.backToMenu()" style="flex: 0.5;">
                        ← Меню
                    </button>
                    <button class="btn btn-primary" 
                            onclick="app.confirmAnswer()" 
                            ${this.selectedAnswer === null ? 'disabled' : ''}
                            style="flex: 1.5;">
                        ✓ Подтвердить
                    </button>
                </div>
            </div>
        `;
    }

    renderQuestionWithResult(container) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = this.selectedAnswer === question.correct;
        const topicName = this.mode === 'topic' 
            ? questionsData[this.currentTopic].topic 
            : question.topic;
        
        container.innerHTML = `
            <div class="stats">
                <span>Вопрос ${this.currentQuestion + 1} из ${this.totalQuestions}</span>
                <span>Правильно: ${this.score}</span>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${this.getProgress()}%"></div>
            </div>
            
            <div class="question-card">
                <div class="question-topic">${topicName}</div>
                <div class="question-text">${question.question}</div>
                <div class="options">
                    ${question.options.map((option, index) => {
                        let className = 'option';
                        if (index === question.correct) {
                            className += ' correct';
                        } else if (index === this.selectedAnswer && !isCorrect) {
                            className += ' incorrect';
                        }
                        
                        return `
                            <div class="${className}">
                                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                                <div class="option-text">${option}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="feedback ${isCorrect ? 'correct' : 'incorrect'} show">
                    <strong>${isCorrect ? '✓ Правильно!' : '✗ Неправильно'}</strong>
                    <p style="margin-top: 8px; color: #888;">
                        ${isCorrect ? 'Отличная работа!' : `Правильный ответ: ${question.options[question.correct]}`}
                    </p>
                </div>
            </div>
        `;
    }

    renderResults(container) {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const modeName = this.mode === 'topic' 
            ? questionsData[this.currentTopic].topic 
            : 'Случайный режим (все темы)';
        
        let emoji = '😔';
        let message = 'Нужно ещё потренироваться';
        let color = '#f44336';
        
        if (percentage >= 90) {
            emoji = '🏆';
            message = 'Отличный результат!';
            color = '#4caf50';
        } else if (percentage >= 70) {
            emoji = '👍';
            message = 'Хороший результат!';
            color = '#8bc34a';
        } else if (percentage >= 50) {
            emoji = '📚';
            message = 'Неплохо, но можно лучше';
            color = '#ff9800';
        }
        
        container.innerHTML = `
            <div class="result-screen">
                <div class="result-icon">${emoji}</div>
                <div class="result-title">${message}</div>
                <div class="result-score" style="color: ${color}">${percentage}%</div>
                
                <div class="result-details">
                    <div class="result-stat">
                        <span class="result-stat-label">Правильных ответов</span>
                        <span class="result-stat-value">${this.score} из ${this.totalQuestions}</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-stat-label">Неправильных ответов</span>
                        <span class="result-stat-value incorrect">${this.totalQuestions - this.score}</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-stat-label">Режим</span>
                        <span class="result-stat-value" style="font-size: 0.85rem; max-width: 200px; text-align: right;">${modeName}</span>
                    </div>
                </div>
                
                <div class="controls" style="flex-direction: column; gap: 12px;">
                    <button class="btn btn-primary" onclick="app.restartQuiz()">
                        🔄 Пройти заново
                    </button>
                    ${this.mode === 'random' ? `
                    <button class="btn btn-primary" onclick="app.startRandomMode()" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                        🎲 Ещё случайный тест
                    </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="app.backToMenu()">
                        📋 В меню
                    </button>
                </div>
            </div>
        `;
    }

    selectNextTopic() {
        const nextTopic = (this.currentTopic + 1) % questionsData.length;
        this.startTopicMode(nextTopic);
    }
}

// Инициализация приложения
const app = new QuizApp();

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
