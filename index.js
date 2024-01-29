document.cookie = `id=${Math.random().toString(36).substring(2, 12)}`

document.getElementById("store-open").addEventListener('click', function() {
    const el = document.getElementById("store")
  
    el.dataset.state = "open"
})
  
document.getElementById("close-store").addEventListener('click', function() {
    const el = document.getElementById("store")
  
    el.dataset.state = "closed"
})
  
document.getElementById("upgrades-open").addEventListener('click', function() {
    const el = document.getElementById("upgrades")
  
    el.dataset.state = "open"
})
  
document.getElementById("close-upgrades").addEventListener('click', function() {
    const el = document.getElementById("upgrades")
  
    el.dataset.state = "closed"
})

document.getElementById("options-open").addEventListener('click', function() {
    const el = document.getElementById("options")
  
    el.dataset.state = "open"
})
  
document.getElementById("close-options").addEventListener('click', function() {
    const el = document.getElementById("options")
  
    el.dataset.state = "closed"
})

function generateSave() {
    let json = "{data:{"

    for (const statement of document.cookie.split(";")) {
        const key = statement.split("=")[0]
        const value = statement.split("=")[1]

        json += `${key}:${value},`
    }

    return json + '},filename:"htcv2s.json"}'
}

async function save() {
        fetch("https://ljp-projects-save.000webhostapp.com/upload.php", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: generateSave()
        })
}

console.log(generateSave())