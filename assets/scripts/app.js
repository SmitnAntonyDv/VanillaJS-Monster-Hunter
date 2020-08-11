const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_PLAYER_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster.', '100');

//validation
let chosenMaxlife = parseInt(enteredValue);
let battleLog = [];
if (isNaN(chosenMaxlife) || chosenMaxlife <= 0) {
  chosenMaxlife = 100;
}

let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxlife);

//Combat Log
const writeToLog = (event, value, monsterHealth, playerHealth) => {
  let logEntry = {
    event,
    value,
    finalmonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_GAME_OVER:
      logEntry.status = 'N/A - Game Over';
      break;
  }
  battleLog.push(logEntry);
};

const reset = () => {
  currentMonsterHealth = chosenMaxlife;
  currentPlayerHealth = chosenMaxlife;
  resetGame(chosenMaxlife);
};

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageToPlayer;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    damageToPlayer,
    currentMonsterHealth,
    currentPlayerHealth
  );

  //bonus life
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead, the bonus life saved you!');
  }

  //win condition
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
    reset();
    writeToLog(
      LOG_EVENT_PLAYER_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost');
    reset();
    writeToLog(
      LOG_EVENT_PLAYER_GAME_OVER,
      'DEFEATED',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw');
    reset();
    writeToLog(
      LOG_EVENT_PLAYER_GAME_OVER,
      'IT WAS A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }
}

const attackMonster = (mode) => {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
};

const attackHandler = () => {
  attackMonster(MODE_ATTACK);
};
const strongAttackHandler = () => {
  attackMonster(MODE_STRONG_ATTACK);
};
const healPlayerHandler = () => {
  let healValue;
  if (currentPlayerHealth >= chosenMaxlife - HEAL_VALUE) {
    alert("you can't heal to more than your max initial health");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
};
const printLogHandler = () => {
  // for (let i = 0; i < 3; i++) {
  //   console.log(`----------------`);
  // }
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  // for (const logEntry of battleLog) {
  //   console.log(logEntry);
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key} => ${logEntry[key]}`);
    }
    i++;
  }
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
