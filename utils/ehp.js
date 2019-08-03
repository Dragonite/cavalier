// EHP last updated March 10th, 2019 https://crystalmathlabs.com/tracker/suppliescalc.php
// Please help improve the EHP, currently it does not take into account bonus hours or Magic/Combat conditional calcs.
// If you have an update, please create a Pull Request or GitHub issue.

function calc_eff_hours(exp) {
  let val = cum_exp.length - 1
  for (let i = 1; i < cum_exp.length; ++i) {
    if (exp < cum_exp[i]) {
      val = i - 1;
      break;
    }
  }
  let rv = cum_hours[val] + (exp - cum_exp[val]) / rates[val]
  return rv;
}

let calc = function (skill, xp) {
  const xpCap = 200000000;
  let ehp = 0;
  switch (skill) {
    case 'Strength':
    case 'Attack':
      cum_exp = [0, 37224, 100000, 1000000, 1986068, 3000000, 5346332, 13034431]
      rates = [15000, 38000, 55000, 65000, 82000, 95000, 115000, 320000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Defence':
      ehp = Math.round(xp / 350000 * 100) / 100;
      break;
    case 'Ranged':
      cum_exp = [0, 6517253, 13034431]
      rates = [250000, 330000, 925000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }

      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Prayer':
      cum_exp = [0, 737627]
      rates = [850000, 1600000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Cooking':
      cum_exp = [0, 13363, 61512, 273742, 1210421, 5346332]
      rates = [45000, 132660, 198990, 298485, 447801, 528797]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Woodcutting':
      cum_exp = [0, 2411, 13363, 41171, 302288, 737627, 1986068, 5902831, 13034431]
      rates = [7000, 16000, 35000, 49000, 146939, 159506, 173469, 188829, 200000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Fletching':
      cum_exp = [0, 969, 33648, 50339, 150872, 302288, 13034431]
      rates = [30000, 45000, 150000, 250000, 500000, 700000, 4000000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Fishing':
      cum_exp = [0, 4470, 13363, 273742, 737627, 2421087, 5902831, 10692629, 13034431]
      rates = [14000, 30000, 40000, 65000, 87000, 96403, 103105, 106619, 110000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Firemaking':
      cum_exp = [0, 7842, 37224, 737627, 1986068]
      rates = [40000, 130000, 175000, 490000, 950000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Crafting':
      cum_exp = [0, 300000, 362000, 496254, 2951373]
      rates = [57000, 170000, 285000, 336875, 440000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Smithing':
      cum_exp = [0, 37224, 13034431]
      rates = [40000, 380000, 400000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Mining':
      cum_exp = [0, 14833, 41171, 302288, 547953, 1986068, 5902831, 13034431]
      rates = [8000, 20000, 44000, 78150, 88861, 100830, 110151, 123000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Herblore':
      cum_exp = [0, 27473, 2192818]
      rates = [60000, 200000, 450000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Agility':
      cum_exp = [0, 13363, 41171, 449428, 2192818, 6000000, 11000000, 13034431]
      rates = [6000, 15000, 44000, 50000, 55000, 59000, 62300, 70000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Thieving':
      cum_exp = [0, 61512, 166636, 449428, 5902831, 13034431]
      rates = [15000, 60000, 100000, 220000, 255000, 275000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Slayer':
      cum_exp = [0, 37224, 100000, 1000000, 1986068, 3000000, 7195629, 13034431]
      rates = [5000, 12000, 17000, 25000, 50000, 55000, 60000, 90000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Farming':
      cum_exp = [0, 2411, 13363, 61512, 273742, 1210421]
      rates = [10000, 50000, 80000, 150000, 350000, 1900000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Runecrafting':
      cum_exp = [0, 2106, 101333, 1210421, 13034431]
      rates = [8000, 20000, 45000, 68500, 100000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Hunter':
      cum_exp = [0, 2107, 7028, 20224, 55649, 91721, 247886, 1096278, 4842295, 13034431]
      rates = [55000, 82000, 110000, 138000, 161000, 189000, 201000, 224000, 236000, 240000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Construction':
      cum_exp = [0, 18247, 123660]
      rates = [20000, 100000, 900000]
      cum_hours = [0.0]
      for (let i = 1; i < cum_exp.length; ++i) {
        cum_hours.push(cum_hours[i - 1] + (cum_exp[i] - cum_exp[i - 1]) / rates[i - 1]);
      }
      ehp = Math.round(calc_eff_hours(xp) * 100) / 100;
      break;
    case 'Magic':
      if (xp === xpCap) {
        ehp = Math.round(xp / 250000 * 100) / 100;
      } else {
        ehp = 0;
      }
      break;
    case 'Hitpoints':
    default:
      ehp = 0;
  }
  return ehp;
}

let total = function (player) {
  let totalEHP = 0;
  const skills = Object.keys(player.Skills).filter(function (item) {
    return item !== 'Overall'
  })
  skills.forEach(skill => {
    totalEHP += calc(skill, player.Skills[skill].xp);
  })
  return new Promise((resolve, reject) => {
    resolve(Math.round(totalEHP * 100) / 100)
  })
}


module.exports = {
  calc: calc,
  total: total
};
