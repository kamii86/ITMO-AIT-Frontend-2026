document.addEventListener("DOMContentLoaded", function() {
    const catalogContainer = document.getElementById("catalog-container");

    function renderCards(data) {
        if (!catalogContainer) return;
        catalogContainer.innerHTML = "";
        
        if (data.length === 0) {
            catalogContainer.innerHTML = "<p>No matches found.</p>";
            return;
        }

        data.forEach(item => {
            const typeBadge = item.type === 'model' ? 'bg-primary' : 'bg-success';
            const card = `
                <div class="item-card">
                    <div class="d-flex justify-content-between align-items-start">
                        <h3><a href="model.html?id=${item.id}" class="text-decoration-none text-dark">${item.name}</a></h3>
                        <span class="badge ${typeBadge}">${item.type.toUpperCase()}</span>
                    </div>
                    <p class="text-muted small mb-2">Task: ${item.task.toUpperCase()} | License: ${item.license.toUpperCase()} | Size: ${item.size}</p>
                    <p>${item.desc}</p>
                    <div class="d-flex gap-2">
                        <span class="badge bg-secondary">Downloads: ${item.downloads}</span>
                        <span class="badge bg-warning text-dark">Stars: ${item.stars}</span>
                    </div>
                </div>
            `;
            catalogContainer.innerHTML += card;
        });
    }

    // Render initial catalog
    if (catalogContainer && typeof appData !== 'undefined') {
        renderCards(appData);
    }

    // Filtering logic
    const applyBtn = document.getElementById("apply-filters");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
            const typeVal = document.getElementById("filter-type").value;
            const taskVal = document.getElementById("filter-task").value;
            const licVal = document.getElementById("filter-license").value;
            const searchVal = document.getElementById("searchInput").value.toLowerCase();

            const filtered = appData.filter(item => {
                const matchType = typeVal === 'all' || item.type === typeVal;
                const matchTask = taskTask = taskVal === 'all' || item.task === taskVal;
                const matchLic = licVal === 'all' || item.license === licVal;
                const matchSearch = item.name.toLowerCase().includes(searchVal);
                return matchType && matchTask && matchLic && matchSearch;
            });

            renderCards(filtered);
        });
    }

    const detailName = document.getElementById("detail-name");
    
    if (detailName && typeof appData !== 'undefined') {
        // Читаем параметр ?id= из URL
        const params = new URLSearchParams(window.location.search);
        const itemId = parseInt(params.get('id'));
        
        const item = appData.find(x => x.id === itemId);
        
        if (item) {
            document.title = `${item.name} - AI Hub`;
            detailName.textContent = item.name;
            
            const typeBadge = document.getElementById("detail-type");
            typeBadge.textContent = item.type.toUpperCase();
            typeBadge.className = `badge ${item.type === 'model' ? 'bg-primary' : 'bg-success'}`;
            
            document.getElementById("detail-stars").textContent = `Star ${item.stars}`;
            document.getElementById("detail-forks").textContent = `Fork ${item.forks}`;
            
            document.getElementById("detail-desc").textContent = item.desc;
            document.getElementById("detail-usage").textContent = item.usage;
            
            document.getElementById("detail-lic").textContent = item.license.toUpperCase();
            document.getElementById("detail-size").textContent = item.size;
            document.getElementById("detail-task").textContent = item.task.toUpperCase();
            document.getElementById("detail-fw").textContent = item.framework.toUpperCase();
            document.getElementById("detail-metrics").textContent = item.metrics;
            document.getElementById("detail-dl").textContent = item.downloads;
        } else {
            detailName.textContent = "Item not found";
        }
    }
});