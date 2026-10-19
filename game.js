// ==========================================
// 1. DIVERSE FOOD DATABASE (100% SCALABLE)
// ==========================================
const FOOD_DATABASE = [
  { name: "Italian Carbonara", emoji: "🍝", real: ["Spaghetti", "Egg Yolks", "Pecorino Cheese"], imposter: "Heavy Cream" },
  { name: "Strawberry Shortcake", emoji: "🎂", real: ["Flour", "Fresh Cream", "Strawberries"], imposter: "Garlic" },
  { name: "Stone-baked Pizza", emoji: "🍕", real: ["Dough", "Tomato Sauce", "Mozzarella"], imposter: "Chocolate" },
  { name: "Kerala Parotta", emoji: "🫓", real: ["Maida Flour", "Coconut Oil", "Egg Batter"], imposter: "Basmati Rice" },
  { name: "Tokyo Ramen", emoji: "🍜", real: ["Wheat Noodles", "Pork Broth", "Soft Boiled Egg"], imposter: "Maple Syrup" },
  { name: "Brown Sugar Boba", emoji: "🧋", real: ["Black Tea", "Tapioca Pearls", "Fresh Milk"], imposter: "Chilli Sauce" },
  { name: "Mexican Guacamole", emoji: "🥑", real: ["Fresh Avocado", "Lime Juice", "Cilantro"], imposter: "Mayonnaise" },
  { name: "American Cheeseburger", emoji: "🍔", real: ["Beef Patty", "Cheddar Cheese", "Burger Bun"], imposter: "Strawberry Jam" },
  { name: "French Croissant", emoji: "🥐", real: ["Puff Pastry", "Butter", "Yeast"], imposter: "Mustard" },
  { name: "South Indian Sambar", emoji: "🍲", real: ["Toor Dal", "Tamarind", "Curry Leaves"], imposter: "Heavy Cream" },
  { name: "Crispy Fish & Chips", emoji: "🍟", real: ["Fried Cod", "Potato Fries", "Tartar Sauce"], imposter: "Custard" },
  { name: "Tacos Al Pastor", emoji: "🌮", real: ["Corn Tortilla", "Spiced Pork", "Pineapple"], imposter: "Marshmallows" },
  { name: "Hot Chocolate", emoji: "☕", real: ["Whole Milk", "Cocoa Powder", "Cane Sugar"], imposter: "Soy Sauce" },
  { name: "Apple Pie", emoji: "🥧", real: ["Flaky Crust", "Spiced Apples", "Brown Butter"], imposter: "Fish Sauce" },
  { name: "Japanese Sushi Roll", emoji: "🍣", real: ["Sushi Rice", "Fresh Salmon", "Nori Seaweed"], imposter: "Cinnamon" },
  { name: "Caesar Salad", emoji: "🥗", real: ["Romaine Lettuce", "Parmesan", "Croutons"], imposter: "Wasabi" },
  { name: "Fluffy Pancakes", emoji: "🥞", real: ["Flour Batter", "Maple Syrup", "Melted Butter"], imposter: "Ketchup" },
  { name: "Palada Payasam", emoji: "🥣", real: ["Milk", "Rice Ada", "Cardamom"], imposter: "Vinegar" },
  { name: "Chicken Biryani", emoji: "🍗", real: ["Basmati Rice", "Whole Spices", "Fried Onions"], imposter: "Peanut Butter" },
  { name: "French Onion Soup", emoji: "🍲", real: ["Caramelized Onions", "Beef Broth", "Gruyere Cheese"], imposter: "Gummy Bears" }
];

// ==========================================
// 2. RETRO SOUND FX (WEB AUDIO)
// ==========================================
class SoundFX {
  constructor() { this.ctx = null; }
  init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
  playWin() {
    this.init();
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t + i * 0.07);
      gain.gain.setValueAtTime(0.2, t + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.07 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.07);
      osc.stop(t + i * 0.07 + 0.3);
    });
  }
  playWrong() {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.3);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  }
}
const sfx = new SoundFX();

// ==========================================
// 3. GAME STATE & 1-100 SYSTEM
// ==========================================
let level = Number(localStorage.getItem("chefLevel")) || 1;
let gold = Number(localStorage.getItem("chefGold")) || 0;
let lives = 3;
let timer = null;
let timeLeft = 15;
let currentFood = null;
let isTransitioning = false;

function saveState() {
  localStorage.setItem("chefLevel", level);
  localStorage.setItem("chefGold", gold);
}

function scrambleWord(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

// ==========================================
// 4. LOAD LEVEL (PROCEDURAL 1 - 100)
// ==========================================
function loadLevel() {
  isTransitioning = false;
  document.getElementById("success-overlay").style.display = "none";
  document.getElementById("gameover-overlay").style.display = "none";
  document.getElementById("level-display").textContent = `LEVEL ${level} / 100`;
  document.getElementById("gold-val").textContent = gold;
  document.getElementById("lives-val").textContent = "♥".repeat(Math.max(lives, 0));

  // Challenge Modifier every 5 levels
  const challengeTag = document.getElementById("challenge-badge");
  let timeLimit = Math.max(15 - Math.floor(level / 8), 5);
  let isSteam = false;
  let isScramble = false;

  if (level % 5 === 0) {
    challengeTag.className = "challenge-tag boss";
    challengeTag.textContent = `👑 LEVEL ${level} BOSS BATTLE!`;
    timeLimit = 7;
  } else if (level % 5 === 1) {
    challengeTag.className = "challenge-tag normal";
    challengeTag.textContent = "CLASSIC INVESTIGATION";
  } else if (level % 5 === 2) {
    challengeTag.className = "challenge-tag speed";
    challengeTag.textContent = "⚡ SPEED RUSH (FAST TIMER)";
    timeLimit = 6;
  } else if (level % 5 === 3) {
    challengeTag.className = "challenge-tag steam";
    challengeTag.textContent = "🌫️ KITCHEN STEAM (HOVER TO REVEAL)";
    isSteam = true;
  } else if (level % 5 === 4) {
    challengeTag.className = "challenge-tag scramble";
    challengeTag.textContent = "🌀 ANAGRAM (SCRAMBLED WORDS)";
    isScramble = true;
  }

  // Pick food
  currentFood = FOOD_DATABASE[(level - 1) % FOOD_DATABASE.length];
  document.getElementById("hero-img").textContent = currentFood.emoji;
  document.getElementById("hero-name").textContent = currentFood.name;

  // Mix 3 real + 1 imposter
  const options = [
    ...currentFood.real.map(name => ({ text: name, isImposter: false })),
    { text: currentFood.imposter, isImposter: true }
  ].sort(() => Math.random() - 0.5);

  const container = document.getElementById("slots-container");
  container.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = `ingredient-slot ${isSteam ? "blurred" : ""}`;
    
    let labelText = opt.text;
    if (isScramble) labelText = scrambleWord(opt.text);

    btn.innerHTML = `<span class="slot-label">${labelText}</span>`;
    btn.addEventListener("click", () => handleChoice(opt, btn));
    container.appendChild(btn);
  });

  startCountdown(timeLimit);
}

// ==========================================
// 5. TIMER MANAGEMENT
// ==========================================
function startCountdown(seconds) {
  clearInterval(timer);
  timeLeft = seconds;
  const totalTime = seconds;
  const bar = document.getElementById("timer-bar");
  bar.style.width = "100%";

  timer = setInterval(() => {
    timeLeft -= 0.1;
    const pct = Math.max(0, (timeLeft / totalTime) * 100);
    bar.style.width = `${pct}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 100);
}

// ==========================================
// 6. IN-GAME ACTIONS & GAMEOVER OVERLAY
// ==========================================
function handleChoice(option, element) {
  if (isTransitioning) return;

  if (option.isImposter) {
    // CORRECT PICK
    isTransitioning = true;
    clearInterval(timer);
    sfx.playWin();

    element.classList.add("busted");
    element.innerHTML = `<span class="slot-label">🚫 BUSTED!</span>`;

    gold += 100;
    saveState();

    // In-game victory overlay
    const overlay = document.getElementById("success-overlay");
    document.getElementById("pop-emoji").textContent = currentFood.emoji;
    document.getElementById("pop-sub").textContent = `+100 Coins • Advancing to Level ${level + 1}...`;
    overlay.style.display = "flex";

    // Auto-advance after 0.9s
    setTimeout(() => {
      if (level < 100) {
        level++;
        saveState();
        loadLevel();
      } else {
        showGameOver("🏆 CONGRATULATIONS!", "You completed all 100 levels! You are the ultimate Chef Detective!", true);
      }
    }, 900);

  } else {
    // WRONG PICK: Flash red, lose 1 heart, keep playing!
    sfx.playWrong();
    element.classList.add("wrong-pick");
    element.innerHTML = `<span class="slot-label">❌ FALSE ACCUSATION!</span>`;
    
    document.body.classList.add("damage-flash");
    setTimeout(() => document.body.classList.remove("damage-flash"), 300);

    lives--;
    document.getElementById("lives-val").textContent = "♥".repeat(Math.max(lives, 0));

    if (lives <= 0) {
      clearInterval(timer);
      isTransitioning = true;
      showGameOver("OUT OF CHEF LIVES!", `The saboteur escaped on Level ${level}. Retry this level!`);
    }
  }
}

function handleTimeout() {
  if (isTransitioning) return;
  sfx.playWrong();
  lives--;
  document.getElementById("lives-val").textContent = "♥".repeat(Math.max(lives, 0));

  if (lives <= 0) {
    clearInterval(timer);
    isTransitioning = true;
    showGameOver("TIME'S UP: FIRED!", `Order took too long on Level ${level}!`);
  } else {
    // Still have lives, restart level immediately
    loadLevel();
  }
}

// SHOW IN-GAME GAME OVER SCREEN (NO ALERT!)
function showGameOver(title, message, isVictory = false) {
  const overlay = document.getElementById("gameover-overlay");
  document.getElementById("fail-title").textContent = title;
  document.getElementById("fail-sub").textContent = message;
  document.getElementById("btn-retry-level").textContent = isVictory ? "Play Again 🔄" : "🔄 Retry Level";
  overlay.style.display = "flex";
}

// RETRY BUTTON CLICK
document.getElementById("btn-retry-level").addEventListener("click", () => {
  lives = 3;
  loadLevel();
});

// Initialize on load
loadLevel();