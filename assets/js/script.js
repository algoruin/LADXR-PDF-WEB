import areas from '../../checks.json' assert { type: 'json' };

const settings = {
    owls: false,
}

/**
 * Render the contents to the page.
 */
function drawPage() {
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
            const checkItem = document.createElement('li');
            checkItem.innerHTML = check.name;
            // Add owl icon.
            if(check.type == "owl") {
                checkItem.innerHTML += ' 🦉';
            }
            areaChecksList.appendChild(checkItem);
        })
    })
}
drawPage();

/**
 * Init UI functionality.
 */
function ui() {
    // Print!
    const buttonPrint = document.querySelector('#buttonPrint');
    buttonPrint.addEventListener('click', () => {
        window.print();
    })
    // Owls toggle.
    const inputOwls = document.querySelector('#inputOwls');
    inputOwls.addEventListener('click', () => {
        settings.owls = inputOwls.checked;
        drawPage();
    });
}
ui();