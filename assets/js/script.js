import areas_initial from '../../checks.json' assert { type: 'json' };

const settings = {
    owls: false,
}

var areas = null;

/**
 * Render the contents to the page.
 */
function drawPage() {
    const areas = getChecks();
    const pageOverworld = document.querySelector('.overworld');
    const pageDungeons = document.querySelector('.dungeons');
    // Clear pages.
    pageOverworld.replaceChildren();
    pageDungeons.replaceChildren();
    const sortedAreas = areas.sort((a, b) => (b.checks.length > a.checks.length) ? -1 : 1);
    areas.forEach(area => {
        // Create area box.
        const areaBox = document.createElement('div');
        areaBox.classList.add('area');

        // Add to page.
        if(area.type == "overworld") {
            pageOverworld.appendChild(areaBox);
        } else {
            pageDungeons.appendChild(areaBox);
        }

        // Add area title.
        const areaTitle = document.createElement('b');
        areaTitle.classList.add('area-title');
        areaTitle.innerHTML = area.area;
        areaBox.appendChild(areaTitle);

        // Add area checks list.
        const areaChecksList = document.createElement('ul');
        areaChecksList.classList.add('area-checks');
        areaBox.appendChild(areaChecksList);

        // Add individual checks to list.
        const sortedChecks = area.checks.sort((a, b) => (b.name > a.name) ? -1 : 1);
        area.checks.forEach(check => {
            // Remove powders.
            if(check.type == "powder") {
                return false;
            }
            
            // Check owls first.
            if(check.type == "owl" && !settings.owls) {
                return false;
            }
            const checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            checkBox.name = check.name.trim().replace(" ", "");
            checkBox.id = check.name.trim().replace(" ", "");
            if (check.done) {
                checkBox.checked = true;
            }
            checkBox.addEventListener('change',  () => {
                let ar = getChecks();
                for (let a = 0; a < ar.length; a++) {
                    for (let c = 0; c < ar[a].checks.length; c++) {
                        if (ar[a].checks[c].name.trim().replace(" ", "") == checkBox.name) {
                            ar[a].checks[c].done = true;
                        }
                    }
                }
                console.log(ar);
                setChecks(ar);
            });
            const checkBoxLabel = document.createElement('label');
            checkBoxLabel.for = checkBox.name;
            checkBoxLabel.innerHTML = check.name;
            const checkItem = document.createElement('li');
            checkItem.appendChild(checkBox);
            checkItem.appendChild(checkBoxLabel);
            // Add owl icon.
            if(check.type == "owl") {
                checkItem.innerHTML += ' 🦉';
            }
            areaChecksList.appendChild(checkItem);
        })
    })
}

function setChecks(areas) {
    for (let a = 0; a < areas.length; a++) {
        for (let c = 0; c < areas[a].checks.length; c++) {
            if (!areas[a].checks[c].done)
                areas[a].checks[c].done = false;
        }
    }
    
    localStorage.setItem('areas', JSON.stringify(areas));
}

function getChecks() {
    return JSON.parse(localStorage.getItem('areas'));
}

function init() {
    if (getChecks() == null)
        setChecks(areas_initial);
    drawPage();
}

init();

/**
 * Init UI functionality.
 */
function ui() {
    // Clear!
    const buttonClear = document.querySelector("#buttonClear");
    buttonClear.addEventListener('click', () => {
        setChecks(areas_initial);
    });
    // Owls toggle.
    const inputOwls = document.querySelector('#inputOwls');
    inputOwls.addEventListener('click', () => {
        settings.owls = inputOwls.checked;
        drawPage();
    });
}
ui();