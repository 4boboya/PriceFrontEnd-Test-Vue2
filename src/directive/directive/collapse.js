export function CollapseDirective(vue) {
    vue.directive('collapse', {
        inserted: (el, bind) => {
            const colContent = document.getElementById(`col_${bind.value}`)
            const colIcon = document.getElementById(`icon_${bind.value}`)

            if (bind.arg == "check") {
                if (bind.value.includes('_0')) {
                    setTimeout(() => {
                        colContent.style.height = `${colContent.scrollHeight+6}px`
                    }, 100)
                } else {
                    colContent.style.height = '0px'
                }
            }
            el.addEventListener('click', () => {
                if (colContent != undefined) {
                    if (colContent.style.height == '0px' || colContent.style.height == '') {
                        colContent.style.height = `${colContent.scrollHeight+6}px`
                        if (colIcon != undefined) {
                            colIcon.setAttribute('active', true)
                        }
                    } else {
                        colContent.style.height = '0px'
                        if (colIcon != undefined) {
                            colIcon.setAttribute('active', false)
                        }
                    }
                }
            })

            if (bind.value == "HA" || bind.value == "OU") {
                setTimeout(() => {
                    el.click()
                }, 100)
            }
        }
    })
}
