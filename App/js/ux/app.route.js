const tabs = ["tickets", "explore", "profile"]
window.addEventListener("hashchange", () => {

    // Animação da navbar
    const hash = location.hash.split("#")[1]
    const all_a = document.querySelectorAll('nav > a');
    for(a of all_a) {
        a.classList.remove("active")

        if(a.getAttribute("href").split("#")[1] === hash) {
            a.classList.add("active")
        }
    }


    // Mudança das Tabs
    const position = tabs.indexOf(hash)
    document.querySelector("main").style.left = `-${position * 100}%`
})

window.addEventListener("load", () => {
    // Animação da navbar
    const hash = location.hash.split("#")[1]
    const all_a = document.querySelectorAll('nav > a');
    for(a of all_a) {
        a.classList.remove("active")

        if(a.getAttribute("href").split("#")[1] === hash) {
            a.classList.add("active")
        }
    }


    // Mudança das Tabs
    const position = tabs.indexOf(hash)
    document.querySelector("main").style.left = `-${position * 100}%`
});