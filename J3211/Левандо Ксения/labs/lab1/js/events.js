// create list of events by merging a list of default ones 
// with ones created by organizers
const defaultEvents = [

{
id: 1,
name: "Bayern Munich vs Borussia Dortmund",
type: "Sport",
city: "Munich",
venue: "Allianz Arena",
date: "2026-10-12",
image: "https://i.pinimg.com/736x/07/07/8a/07078a26e5fc3d7b03a5691fd527dc68.jpg",
description: "Bundesliga top match at Allianz Arena.",
organizer: "cool_company@gmail.com",
seatmap: "assets/seatmap1.jpg",
categories: [
        { name: "VIP", price: 150 },
        { name: "Premium", price: 100 },
        { name: "Standard", price: 50 }
    ]
},

{
id: 2,
name: "Italian Grand Prix",
type: "Sport",
city: "Monza",
venue: "Autodromo Nazionale Monza",
date: "2026-09-05",
image: "https://i.pinimg.com/1200x/50/2c/b0/502cb0c1ff3c96ad1992fb289f9ae3c1.jpg",
description: "High speed Formula 1 race at Monza circuit.",
organizer: "cool_company@gmail.com",
seatmap: "assets/seatmap2.jpg",
categories: [
        { name: "Grandstand", price: 120 },
        { name: "Pit Lane", price: 200 }
    ]
},

{
id: 3,
name: "Coldplay – Music of the Spheres Tour",
type: "Concert",
city: "Paris",
venue: "Stade de France",
date: "2026-07-18",
image: "https://i.pinimg.com/1200x/b4/c8/d0/b4c8d0c9b1c458052281bb189708dabc.jpg",
description: "Live stadium show with Coldplay.",
organizer: "cool_company@gmail.com",
seatmap: "assets/seatmap3.webp",
categories: [
        { name: "VIP", price: 250 },
        { name: "Premium", price: 150 },
        { name: "General", price: 80 }
    ]
}

];

// get from  localStorage
let savedEvents = JSON.parse(localStorage.getItem("events")) || [];

// using map to avoid duplicates
const eventsMap = new Map();

// default ones first
defaultEvents.forEach(ev => eventsMap.set(ev.id, ev));

// add created ones
savedEvents.forEach(ev => eventsMap.set(ev.id, ev));

// get joint array
let events = Array.from(eventsMap.values());

// this array back to local storage
localStorage.setItem("events", JSON.stringify(events));

document.getElementById("typeFilter").addEventListener("change", renderEvents);
document.getElementById("cityFilter").addEventListener("input", renderEvents);
document.getElementById("dateFilter").addEventListener("change", renderEvents);

function renderEvents() {
        const type = document.getElementById("typeFilter").value;
        const city = document.getElementById("cityFilter").value.toLowerCase();
        const date = document.getElementById("dateFilter").value;

        const container = document.getElementById("eventsContainer");

        container.innerHTML = "";

        const filteredEvents = events.filter(event => {
            const typeMatch = (type === "All" || !type) || event.type === type;
            const cityMatch = !city || event.city.toLowerCase().includes(city);
            const dateMatch = !date || event.date === date;
            return typeMatch && cityMatch && dateMatch;
            });

        if (filteredEvents.length === 0) {
        container.innerHTML = `<p class="fw-bold">No matching events found</p>`;
        return;
    }

        filteredEvents.forEach((event) => {
            container.innerHTML += `
            <div class="col-md-4">
            <div class="card h-100 shadow-sm">
            <img src="${event.image}" class="card-img-top">
            <div class="card-body">
            <span class="badge bg-secondary mb-2">${event.type}</span>
            <h5 class="card-title">${event.name}</h5>

            <p class="text-muted">
            ${event.city} · ${event.venue}
            </p>

            <p class="text-muted">
            ${new Date(event.date).toLocaleDateString()}
            </p>

            <button class="btn btn-outline-primary me-2"
            onclick="openEvent(${event.id})">
            View
            </button>

            </div>
            </div>

            </div>

`;
        });
}


function openEvent(id) {
    const event = events.find(e => e.id === id);
    localStorage.setItem("selectedEvent", JSON.stringify(event));
    window.location.href = "event.html";
}

renderEvents();
