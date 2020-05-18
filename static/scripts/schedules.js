const scheduleContainer = document.querySelector('#schedule-container');
let schedule = 0;

async function getSchedule(scheduleFile) {
    const scheduleReq = await fetch(scheduleFile);
    schedule = await scheduleReq.json();
    constructSchedule();
};
function constructSchedule() {
    scheduleContainer.innerHTML = `
    <h1>${schedule.name}</h1>
    `;

    // Create "hours"-tab 
    /*
    for (let hour = 0; hour <= 16; hour++) {
        scheduleContainer.innerHTML += `
            <div class="hours"></div>
        `;
        const hoursContainer = scheduleContainer.querySelector('div.hours');
        hoursContainer.innerHTML += `
            <div class="day" id="hr-${hour}"> ${hour} </div>
        `
    } */

    // Render days and lessons
    for (let i = 0; i < schedule.days.length; i++) {
        let day = schedule.days[i]
        scheduleContainer.innerHTML += `
            <div class="day" id="${day.name}"></div>
        `;
        const dayContainer = scheduleContainer.querySelector('#' + day.name);
        console.log(dayContainer)
        dayContainer.innerHTML = `<h2>${day.name}</h2>`;

        day.lessons.forEach(lesson => {
            dayContainer.innerHTML += `
                <div class="hr-${lesson.hour}" style="background: ${lesson.color};">
                    <h3>${lesson.subject}</h3>
                    <p>${lesson.teacher}</p>
                    <i id="time">${lesson.hour}:00 - ${lesson.hour + 1}:00</i>
                    <i id="location">${lesson.location}</i>
                </div>
            `
        });
    }
};

getSchedule('/timetable.json')