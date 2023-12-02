
const multiSelectComponentWrapFlag = document.querySelectorAll(".select-multi-component-wrap-flag")

multiSelectComponentWrapFlag.forEach(el => {

    const multiSelect = el.querySelector(".select")
    const badgeWrap = el.querySelector(".badge-wrap")
    const multiSelectListItems = el.querySelectorAll(".select-multi-item")
    const multiSelectInput = el.querySelector(".select-input")
    const selectedQuantity= el.querySelector("[data-selected-quantity]")


    el.addEventListener("click", () => {
        const badges = el.querySelectorAll(".multi-selected")

        multiSelect.classList.toggle("active")
        
        if (badges.length > 0) {

            badges.forEach(el => {
    
                el.lastElementChild.addEventListener("click", () => {
                    const atr = el.dataset.badges

                    multiSelectListItems.forEach(el => {
                        if (atr === el.id) {
                            el.classList.remove("active")
                        }
                    })

                    badgeWrap.removeChild(el)
                })
            })
        } 

        selctedCounter()

        placeholder()
 
    })

    multiSelectListItems.forEach(el => {
        if(el.classList.contains("active")){
            createBadge(el)
        }

        addFlag(el)

    })

    multiSelectListItems.forEach(el => {
        el.addEventListener("click", () => {
            createBadge(el)
            el.classList.add("active")
        })
    })

    multiSelectInput.addEventListener('input', autoresize);
    
    function createBadge(el){
        const badge = document.createElement("div");
        const country = el.getAttribute('data-country')
        const urlFlag = "/" + country + ".svg"
        badge.setAttribute("data-badges", el.id)
        badge.classList.add("multi-selected")
        badge.innerHTML = `<img class="img-flag" src="${urlFlag}" alt=""/> <span>${el.innerText}</span> <button class="badge-btn"><img src="icon_x.svg"/></button>`
        badgeWrap.appendChild(badge)
    }

    function autoresize() {
        let size = multiSelectInput.scrollWidth
        multiSelectInput.style.width = size + 'px';
    }

    function placeholder(){
        if(badgeWrap.children.length != 0){
            multiSelectInput.classList.remove("placeholder")
            badgeWrap.classList.remove("d-none")
            multiSelect.classList.remove("search")
            
        } else{
            multiSelectInput.classList.add("placeholder")
            badgeWrap.classList.add("d-none")
            multiSelect.classList.add("search")
        }
    }

    function addFlag(el){
        const country = el.getAttribute('data-country')
        const flagImg = document.createElement("img")
        const urlFlag = "/" + country + ".svg"

        flagImg.setAttribute("src", urlFlag)
        flagImg.classList.add("img-flag")
        el.insertBefore(flagImg, el.firstChild)

    }

    function selctedCounter(){
        
        if(badgeWrap.children.length > 0){
            selectedQuantity.parentElement.classList.remove("d-none")
        selectedQuantity.innerText = `${badgeWrap.children.length}`

        } else {
            selectedQuantity.parentElement.classList.add("d-none")

        }

    }

    placeholder()

    selctedCounter()


})






