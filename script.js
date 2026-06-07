const questions = [
  {
    text: '日本の衆議院議員の任期は何年？',
    choices: ['2年', '3年', '4年', '6年'],
    correct: 2,
  },
  {
    text: 'GDPって何の略だっけ？',
    choices: ['General Domestic Policy', 'Gross Domestic Product', 'Global Development Plan', 'Government Deficit Program'],
    correct: 1,
  },
  {
    text: '日本で初めて消費税を導入した内閣総理大臣は誰？',
    choices: ['中曽根康弘', '宮澤喜一', '竹下登', '橋本龍太郎'],
    correct: 2,
  },
  {
    text: '国連（UN）の本部はどこの都市にある？',
    choices: ['ジュネーブ', 'パリ', 'ロンドン', 'ニューヨーク'],
    correct: 3,
  },
  {
    text: '日本銀行の主な役割としてあてはまらないのはどれ？',
    choices: ['紙幣の発行', '金融政策の実施', '税金の徴収', '銀行の銀行としての機能'],
    correct: 2,
  },
  {
    text: 'IMFって何の略？',
    choices: ['国際通貨基金', '国際貿易機関', '国際開発機構', '国際労働機関'],
    correct: 0,
  },
  {
    text: '日本の参議院議員の任期は何年？',
    choices: ['3年', '4年', '5年', '6年'],
    correct: 3,
  },
  {
    text: '日経平均株価の算出に使われる銘柄数はいくつ？',
    choices: ['100銘柄', '225銘柄', '500銘柄', '1000銘柄'],
    correct: 1,
  },
  {
    text: 'WTO（世界貿易機関）の本部がある都市はどこ？',
    choices: ['ブリュッセル', 'ウィーン', 'ジュネーブ', 'チューリッヒ'],
    correct: 2,
  },
  {
    text: '日本の財政で、税収だけでは足りない分を補うために発行するのは？',
    choices: ['社債', '国債', '地方債', '外債'],
    correct: 1,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const screenStart  = document.getElementById('screen-start');
const screenQuiz   = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');

const progressBar   = document.getElementById('progress-bar');
const questionCount = document.getElementById('question-count');
const questionText  = document.getElementById('question-text');
const choicesEl     = document.getElementById('choices');
const feedbackEl    = document.getElementById('feedback');
const btnNext       = document.getElementById('btn-next');
const scoreText     = document.getElementById('score-text');
const scoreComment  = document.getElementById('score-comment');

document.getElementById('btn-start').addEventListener('click', startQuiz);
btnNext.addEventListener('click', nextQuestion);
document.getElementById('btn-retry').addEventListener('click', resetQuiz);

function show(screen) {
  [screenStart, screenQuiz, screenResult].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  show(screenQuiz);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const q = questions[currentIndex];

  const pct = (currentIndex / questions.length) * 100;
  progressBar.style.width = pct + '%';

  questionCount.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionText.textContent = q.text;

  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback hidden';
  btnNext.classList.add('hidden');

  choicesEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectChoice(i));
    choicesEl.appendChild(btn);
  });
}

function selectChoice(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');

  buttons.forEach(btn => btn.disabled = true);

  const isCorrect = selectedIndex === q.correct;

  buttons[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');

  if (!isCorrect) {
    buttons[q.correct].classList.add('correct');
  }

  feedbackEl.classList.remove('hidden');

  if (isCorrect) {
    score++;
    feedbackEl.classList.add('correct');
    feedbackEl.textContent = '正解！さすが！';
  } else {
    feedbackEl.classList.add('incorrect');
    feedbackEl.textContent = `ざんねん！正解は「${q.choices[q.correct]}」だよ。`;
  }

  const isLast = currentIndex === questions.length - 1;
  btnNext.textContent = isLast ? '結果みる！' : 'つぎへ';
  btnNext.classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = '100%';

  scoreText.textContent = `${questions.length}問中 ${score}問 正解`;

  let comment;
  if (score === questions.length) {
    comment = '満点！政治・経済マスターだね！';
  } else if (score >= 8) {
    comment = 'すごい！かなりわかってるじゃん！';
  } else if (score >= 6) {
    comment = 'なかなかいい線いってるよ！';
  } else if (score >= 4) {
    comment = 'もうちょっとで半分以上！また挑戦してみて。';
  } else if (score >= 1) {
    comment = '難しかった？もう1回チャレンジしてみよう！';
  } else {
    comment = 'ゼロか…でも大丈夫、もう1回やってみよう！';
  }
  scoreComment.textContent = comment;

  show(screenResult);
}

function resetQuiz() {
  show(screenStart);
}
