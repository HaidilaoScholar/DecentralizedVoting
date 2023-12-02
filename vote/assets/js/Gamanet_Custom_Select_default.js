
const selectWrap = document.querySelectorAll(".select-default-wrap")

const body = document.querySelector("body")
const allSelect = document.querySelectorAll(".select")



function closeSelectList(){
    body.addEventListener("click", function(){
        allSelect.forEach(el => {
            if(el.classList.contains("active")){
                el.classList.remove("active")
                console.log(el.id);
            }
        })
    }, true)
}

closeSelectList()


selectWrap.forEach(el => {


    const select = el.querySelector(".select")
    const input = el.querySelector(".select-input")
    const selectListItems = el.querySelectorAll(".select-item")

    el.addEventListener("click", function(){
    
        select.classList.add("active")

        selectListItems.forEach( el => {

            if(el.innerText != input.value ){
                el.classList.remove("active")
            }

            el.addEventListener("click", function e(){
                selectedItem(el)
            })
        })     
        
    })

    selectListItems.forEach(el => {
        if(el.classList.contains("active")){
            selectedItem(el)
        }


        el.addEventListener("click", e => {
            e.stopPropagation()
            select.classList.remove("active")
        })
    })

    function selectedItem(el){
        const valueText = el.innerText
        input.value = valueText
        el.classList.add("active")
    }
        
})



