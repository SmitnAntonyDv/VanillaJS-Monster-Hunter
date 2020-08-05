const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 15;

let chosenMaxlife = 100;
let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;

adjustHealthBars(chosenMaxlife);

function endRound() {
  const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageToPlayer;
  //win condition
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost');
  } else if (currentMonsterHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw');
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
