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
const getBuilds = (index, s1, s2) => {
    return document.querySelectorAll(`#builds ${s1} ${s2}`)[index];
};
const round = (n, max) => {
    if (n >= 1e3 && n < 1e6) {
        return `${(n / 1e3).toFixed(max != null ? max : 5)}K`;
    }
    else if (n >= 1e6 && n < 1e9) {
        return `${(n / 1e6).toFixed(max != null ? max : 5)}M`;
    }
    else if (n >= 1e9 && n < 1e12) {
        return `${(n / 1e9).toFixed(max != null ? max : 5)}B`;
    }
    else if (n >= 1e12 && n < 1e15) {
        return `${(n / 1e12).toFixed(max != null ? max : 5)}T`;
    }
    else if (n >= 1e15 && n < 1e18) {
        return `${(n / 1e15).toFixed(max != null ? max : 5)}Qa`;
    }
    else if (n >= 1e18 && n < 1e21) {
        return `${(n / 1e18).toFixed(max != null ? max : 5)}Qi`;
    }
    else if (n >= 1e21 && n < 1e24) {
        return `${(n / 1e21).toFixed(max != null ? max : 5)}Sx`;
    }
    else if (n >= 1e24 && n < 1e27) {
        return `${(n / 1e24).toFixed(max != null ? max : 5)}Sp`;
    }
    else if (n >= 1e27 && n < 1e30) {
        return `${(n / 1e27).toFixed(max != null ? max : 5)}Oc`;
    }
    else if (n >= 1e30 && n < 1e33) {
        return `${(n / 1e30).toFixed(max != null ? max : 5)}No`;
    }
    else if (n >= 1e33 && n < 1e36) {
        return `${(n / 1e33).toFixed(max != null ? max : 5)}Dc`;
    }
    else if (n >= 1e36 && n < 1e39) {
        return `${(n / 1e36).toFixed(max != null ? max : 5)}Udc`;
    }
    else if (n >= 1e39 && n < 1e42) {
        return `${(n / 1e39).toFixed(max != null ? max : 5)}Ddc`;
    }
    else if (n >= 1e42 && n < 1e45) {
        return `${(n / 1e42).toFixed(max != null ? max : 5)}Tdc`;
    }
    else if (n >= 1e45 && n < 1e48) {
        return `${(n / 1e45).toFixed(max != null ? max : 5)}Qt`;
    }
    else if (n >= 1e48 && n < 1e51) {
        return `${(n / 1e48).toFixed(max != null ? max : 5)}Qd`;
    }
    else if (n >= 1e51 && n < 1e54) {
        return `${(n / 1e51).toFixed(max != null ? max : 5)}Sd`;
    }
    return n.toFixed(max != null ? max : 5);
};
const update = () => {
    const moneyElement = getStat(Elements.Money), totalEarnedElement = getStat(Elements.TotalEarned), totalClicksElement = getStat(Elements.TotalClicks), buttonElement = getGame(Elements.Button), powerElement = getStat(Elements.Power), stallBuyElement = getBuilds(0, "section", "button");
    if (moneyElement && totalEarnedElement && totalClicksElement && buttonElement && powerElement && stallBuyElement) {
        moneyElement.textContent = round(stats.money, 2);
        totalEarnedElement.textContent = round(stats.totalEarned, 2);
        totalClicksElement.textContent = round(stats.totalClicks, 2);
        powerElement.textContent = round(stats.power, 2);
        buttonElement.onclick = function () {
            stats.money += stats.power;
            stats.totalClicks++;
            stats.totalEarned += stats.power;
        };
        console.log(stallBuyElement.textContent);
        return true;
    }
    return false;
};
function check(interval) {
    stats.updates++;
    return update() ? setInterval(update, interval) : 0;
}
if (document.readyState !== 'complete') {
    window.onload = () => {
        const r = check(100);
        console.log(r != 0 ? r : "Failed to loop.");
    };
}
else
    (() => {
        const r = check(100);
        console.log(r != 0 ? r : "Failed to loop.");
    })();