const stats = {
    money: 0,
    mps: 0,
    totalEarned: 0,
    totalClicks: 0,
    updates: 0,
    power: 1,

    stall: {
        price: 15,
        owned: 0,
        rate: 0.1
    },

    uchef: {
        price: 100,
        owned: 0,
        rate: 1
    },

    cafe: {
        price: 660,
        owned: 0,
        rate: 5
    }
};

const Elements = {
    Money: 0,
    MPS: 1,
    TotalEarned: 2,
    TotalClicks: 3,
    Power: 4,
    Button: 0,
    Stall: 0,
    UnderpaidChef: 1,
    Cafe: 2
};

const Constants = Object.freeze({
    increase: 1.12
})

const getStat = index => document.querySelectorAll("#stats p span")[index]
const getGame = index => document.querySelectorAll("#game *")[index]
const getBuilds = (index, s1, s2) => document.querySelectorAll(`#builds ${s1} ${s2}`)[index];

const round = (n, max) => {
    if (n >= 1e3 && n < 1e6) {
        return `${(n / 1e3).toFixed(max != null ? max : 5)}K`;
    } else if (n >= 1e6 && n < 1e9) {
        return `${(n / 1e6).toFixed(max != null ? max : 5)}M`;
    } else if (n >= 1e9 && n < 1e12) {
        return `${(n / 1e9).toFixed(max != null ? max : 5)}B`;
    } else if (n >= 1e12 && n < 1e15) {
        return `${(n / 1e12).toFixed(max != null ? max : 5)}T`;
    } else if (n >= 1e15 && n < 1e18) {
        return `${(n / 1e15).toFixed(max != null ? max : 5)}Qa`;
    } else if (n >= 1e18 && n < 1e21) {
        return `${(n / 1e18).toFixed(max != null ? max : 5)}Qi`;
    } else if (n >= 1e21 && n < 1e24) {
        return `${(n / 1e21).toFixed(max != null ? max : 5)}Sx`;
    } else if (n >= 1e24 && n < 1e27) {
        return `${(n / 1e24).toFixed(max != null ? max : 5)}Sp`;
    } else if (n >= 1e27 && n < 1e30) {
        return `${(n / 1e27).toFixed(max != null ? max : 5)}Oc`;
    } else if (n >= 1e30 && n < 1e33) {
        return `${(n / 1e30).toFixed(max != null ? max : 5)}No`;
    } else if (n >= 1e33 && n < 1e36) {
        return `${(n / 1e33).toFixed(max != null ? max : 5)}Dc`;
    } else if (n >= 1e36 && n < 1e39) {
        return `${(n / 1e36).toFixed(max != null ? max : 5)}Udc`;
    } else if (n >= 1e39 && n < 1e42) {
        return `${(n / 1e39).toFixed(max != null ? max : 5)}Ddc`;
    } else if (n >= 1e42 && n < 1e45) {
        return `${(n / 1e42).toFixed(max != null ? max : 5)}Tdc`;
    } else if (n >= 1e45 && n < 1e48) {
        return `${(n / 1e45).toFixed(max != null ? max : 5)}Qt`;
    } else if (n >= 1e48 && n < 1e51) {
        return `${(n / 1e48).toFixed(max != null ? max : 5)}Qd`;
    } else if (n >= 1e51 && n < 1e54) {
        return `${(n / 1e51).toFixed(max != null ? max : 5)}Sd`;
    }

    return n.toFixed(max != null ? max : 5);
}

const update = () => {
    const moneyElement = getStat(Elements.Money),
        totalEarnedElement = getStat(Elements.TotalEarned),
        totalClicksElement = getStat(Elements.TotalClicks),
        buttonElement = getGame(Elements.Button),
        powerElement = getStat(Elements.Power),
        mpsElement = getStat(Elements.MPS),
        stallBuyElement = getBuilds(Elements.Stall, "section", "button"),
        stallPriceElement = getBuilds(Elements.Stall, "section", "em span"),
        stallOwnedElement = getBuilds(Elements.Stall, "section", "p span"),
        stallRateElement = getBuilds(Elements.Stall, "section", "sub strong span"),
        uchefBuyElement = getBuilds(Elements.UnderpaidChef, "section", "button"),
        uchefPriceElement = getBuilds(Elements.UnderpaidChef, "section", "em span"),
        uchefOwnedElement = getBuilds(Elements.UnderpaidChef, "section", "p span"),
        uchefRateElement = getBuilds(Elements.UnderpaidChef, "section", "sub strong span"),
        cafeBuyElement = getBuilds(Elements.Cafe, "section", "button"),
        cafePriceElement = getBuilds(Elements.Cafe, "section", "em span"),
        cafeOwnedElement = getBuilds(Elements.Cafe, "section", "p span"),
        cafeRateElement = getBuilds(Elements.Cafe, "section", "sub strong span");

    if (
        moneyElement &&
        totalEarnedElement &&
        totalClicksElement &&
        buttonElement &&
        powerElement &&
        stallBuyElement &&
        stallPriceElement &&
        stallOwnedElement &&
        uchefBuyElement &&
        uchefPriceElement &&
        uchefOwnedElement &&
        uchefRateElement &&
        cafeBuyElement &&
        cafeOwnedElement &&
        cafePriceElement &&
        cafeRateElement
    ) {

        buttonElement.onclick = function () {
            stats.money += stats.power;
            stats.totalClicks++;
            stats.totalEarned += stats.power;
        }

        if (stats.money >= stats.stall.price) {
            stallBuyElement.onclick = function () {
                stats.money -= stats.stall.price;
                stats.stall.price *= Constants.increase;
                stats.stall.owned++;
                stats.mps += stats.stall.rate;

                this.onclick = () => { }
            };
        } else
            stallBuyElement.onclick = () => { };

        if (stats.money >= stats.uchef.price) {
            uchefBuyElement.onclick = function () {
                stats.money -= stats.uchef.price;
                stats.uchef.price *= Constants.increase;
                stats.uchef.owned++;
                stats.mps += stats.uchef.rate;

                this.onclick = () => { }
            };
        } else
            uchefBuyElement.onclick = () => { };

        if (stats.money >= stats.cafe.price) {
            cafeBuyElement.onclick = function () {
                stats.money -= stats.cafe.price;
                stats.cafe.price *= Constants.increase;
                stats.cafe.owned++;
                stats.mps += stats.cafe.rate;

                this.onclick = () => { }
            };
        } else
            cafeBuyElement.onclick = () => { };

        moneyElement.textContent = round(stats.money, 2);
        mpsElement.textContent = round(stats.mps, 2);
        totalEarnedElement.textContent = round(stats.totalEarned, 2);
        totalClicksElement.textContent = round(stats.totalClicks, 0);
        powerElement.textContent = round(stats.power, 2);

        stallOwnedElement.textContent = round(stats.stall.owned, 0);
        stallPriceElement.textContent = round(stats.stall.price, 2);
        stallRateElement.textContent = round(stats.stall.rate, 2);

        uchefOwnedElement.textContent = round(stats.uchef.owned, 0);
        uchefPriceElement.textContent = round(stats.uchef.price, 2);
        uchefRateElement.textContent = round(stats.uchef.rate, 2);

        cafeOwnedElement.textContent = round(stats.cafe.owned, 0);
        cafePriceElement.textContent = round(stats.cafe.price, 2);
        cafeRateElement.textContent = round(stats.cafe.rate, 2);

        return true;
    }

    return false;
};

function check(interval) {
    stats.updates++;
    return update() ? setInterval(() => {
        const amt = stats.mps / (1000 / interval);
        stats.money += amt;
        stats.totalEarned += amt;
        update();
    }, interval) : 0;
}

if (document.readyState !== 'complete') {
    window.onload = () => check(100);
} else
    check(100);