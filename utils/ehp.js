module.exports = {
  // EHP last updated March 10th, 2019 https://crystalmathlabs.com/tracker/suppliescalc.php
  // If this is not updated, please create a Pull Request or issue.
  calc: function (skill, xp) {
    const xpCap = 200000000;
    let ehp;
    switch(skill){
      case 'Magic':
        if(xp===xpCap){
          ehp = Math.round(xp/250000 * 100) / 100;
        }else{
          ehp = 0;
        }
      break;
      case 'Hitpoints':
      default:
        ehp = 69;
    }
    return ehp;
  }
};
