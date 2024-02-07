import areas from './checks.json' assert { type: 'json' };

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
        area.checks.forEach(check => {
            // if(!check.includes('Owl')) {
                const checkItem = document.createElement('li');
                checkItem.innerHTML = check;
                areaChecksList.appendChild(checkItem);
            // }
        })
    })
}
drawPage();