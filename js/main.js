"use strict"

const allAccordionsIds = []
let pickedAccordionsIds = []

const progressBarElem = document.querySelector(".js-progress-bar")
const continueBtn = document.querySelector(".js-continue-btn")

const accordionsElems = document.querySelectorAll(".js-accordion")
const accordionsContentElems = document.querySelectorAll(".js-accordion-content")
const accordionsWrappersElems = document.querySelectorAll(".js-accordion-wrapper")

function refreshAccordions() {
    accordionsElems.forEach(el => {
        el.classList.remove("active")
        el.parentElement.classList.remove("show")
    })
}

function refreshProgressBar(countPickedAccordions) {
    if (countPickedAccordions > (allAccordionsIds.length / 2)) {
        progressBarElem.style.backgroundColor = "#ffd43f" 
    }
    if (countPickedAccordions === allAccordionsIds.length) {
        progressBarElem.style.backgroundColor = "#73BE43" 
    }
    progressBarElem.style.width = countPickedAccordions * (1000 / allAccordionsIds.length) + "px"
}

function isReadyToContinue() {
    if (pickedAccordionsIds.length == allAccordionsIds.length) {
        continueBtn.classList.add("active")
        continueBtn.removeAttribute("disabled")
    } 
}

function checkPickedAccordionsIds() {
    accordionsElems.forEach((accordion, i) => {
        if (accordion.classList.contains("active")) {
            if (!pickedAccordionsIds.includes(i)) {
                pickedAccordionsIds.push(i)
            } 
        }
    })
}

accordionsElems.forEach(accordion => {
    accordion.addEventListener("click", () => {
        refreshAccordions()
        
        let content = accordion.nextElementSibling
        let wrapper = accordion.parentElement
        
        if (content.style.maxHeight) {
            accordionsContentElems.forEach(content => content.style.maxHeight = null)
            wrapper.classList.remove("show")
            accordion.classList.remove("active")
        } else {
            accordionsContentElems.forEach(content => content.style.maxHeight = null)
            content.style.maxHeight = content.scrollHeight + "px"

            wrapper.classList.add("show")
            accordion.classList.add("active")
            checkPickedAccordionsIds()
            refreshProgressBar(pickedAccordionsIds.length)
            isReadyToContinue()
        }
    })
})

for (let id = 0; id < accordionsElems.length; id++) {
    allAccordionsIds.push(id)
}