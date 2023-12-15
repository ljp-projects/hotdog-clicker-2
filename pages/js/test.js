"use strict";
const stats = {
    money: 0,
    totalEarned: 0,
    totalClicks: 0,
    updates: 0,
    power: 1
};
var Elements;
(function (Elements) {
    Elements[Elements["Money"] = 0] = "Money";
    Elements[Elements["TotalEarned"] = 1] = "TotalEarned";
    Elements[Elements["TotalClicks"] = 2] = "TotalClicks";
    Elements[Elements["Power"] = 3] = "Power";
    Elements[Elements["Button"] = 0] = "Button";
})(Elements || (Elements = {}));
const getStat = (index) => {
    return document.querySelectorAll("#stats p span")[index];
};
const getGame = (index) => {
    return document.querySelectorAll("#game *")[index];
};
const update = () => {
    const moneyElement = getStat(Elements.Money), totalEarnedElement = getStat(Elements.TotalEarned), totalClicksElement = getStat(Elements.TotalClicks), buttonElement = getGame(Elements.Button), powerElement = getStat(Elements.Power);
    if (moneyElement && totalEarnedElement && totalClicksElement && buttonElement && powerElement) {
        moneyElement.textContent = stats.money.toFixed(2);
        totalEarnedElement.textContent = stats.totalEarned.toFixed(2);
        totalClicksElement.textContent = stats.totalClicks.toString();
        powerElement.textContent = stats.power.toString();
        buttonElement.onclick = function () {
            stats.money += stats.power;
            stats.totalClicks++;
            stats.totalEarned += stats.power;
        };
        return true;
    }
    return false;
};
function check(interval) {
    stats.updates++;
    return update() ? setInterval(update, interval) : 0;
}
window.onload = function () {
    check(100);
};