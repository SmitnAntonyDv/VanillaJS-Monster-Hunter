const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;

let chosenMaxlife = 100;
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxlife);

const reset = () => {
  currentMonsterHealth = chosenMaxlife;
  currentPlayerHealth = chosenMaxlife;
  resetGame(chosenMaxlife);
};

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageToPlayer;

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
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost');
    reset();
  } else if (currentMonsterHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw');
    reset();
  }
}

const attackMonster = (mode) => {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
};

const attackHandler = () => {
  attackMonster('ATTACK');
};
const strongAttackHandler = () => {
  attackMonster('STRONG_ATTACK');
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
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
