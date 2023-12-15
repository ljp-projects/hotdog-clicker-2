"use strict";
const stats = {
    money: 0,
    totalEarned: 0,
    totalClicks: 0,
    updates: 0
};
var Elements;
(function (Elements) {
    Elements[Elements["Money"] = 0] = "Money";
    Elements[Elements["TotalEarned"] = 1] = "TotalEarned";
    Elements[Elements["TotalClicks"] = 2] = "TotalClicks";
    Elements[Elements["Button"] = 0] = "Button";
})(Elements || (Elements = {}));
const getStat = (index) => {
    return document.querySelectorAll("#stats p span")[index];
};
const getGame = (index) => {
    return document.querySelectorAll("#game *")[index];
};
const update = () => {
    const moneyElement = getStat(Elements.Money), totalEarnedElement = getStat(Elements.TotalEarned), totalClicksElement = getStat(Elements.TotalClicks), buttonElement = getGame(Elements.Button);
    if (moneyElement && totalEarnedElement && totalClicksElement && buttonElement) {
        moneyElement.textContent = stats.money.toFixed(2);
        totalEarnedElement.textContent = stats.totalEarned.toFixed(2);
        totalClicksElement.textContent = stats.totalClicks.toFixed(2);
        buttonElement.onclick = function () {
            stats.money++;
            stats.totalClicks++;
            stats.totalEarned++;
        };
        return true;
    }
    return false;
};
function check(v, max) {
    stats.updates++;
    if (v) {
        const r = update();
        r ? requestAnimationFrame(update) : check(r, 100);
    }
    else if (stats.updates < max) {
        check(v, max);
    }
    else {
        console.error(`Not executing script, required dom elements not found after ${max} tries.`);
    }
}
window.onload = function () {
    check(update(), 100);
};