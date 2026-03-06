// scripts/main.js

// --- Inițializare ---
document.addEventListener("DOMContentLoaded", () => {
    // Încarcă stocul și apoi preia comenzile (funcții din api.js)
    loadInitialStorage();
    showPage('page-dashboard');

    // Listener pentru a închide căutarea dacă se dă click în afara ei
    document.getElementById('app-container').addEventListener('click', (e) => {
        const searchForm = document.getElementById('search-form');
        const resultsContainer = document.getElementById('find-results');

        // Verifică dacă click-ul a fost în afara zonei de search
        if (searchForm && !searchForm.contains(e.target) &&
            resultsContainer && !resultsContainer.contains(e.target)) {
            toggleSearchFocus(false);
        }
    });

    // Event Listeners pentru Căutare
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('focus', () => toggleSearchFocus(true));
    }

    // Setează starea inițială a footer-ului
    setupPickingPageFooter(false);
});

// --- Logică Settings / Test Print ---

function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function testPrint() {
    const testUrl = "https://easysales1.fra1.digitaloceanspaces.com/trendyol/shipments/11888/4497757301.pdf";
    showToast("Descărcare și printare test...", false);
    try {
        const zplString = await window.downloadAndConvertAwb(testUrl);
        await window.NativePrinter.print(zplString);
        showToast("✓ Print test trimis cu succes!", false);
    } catch (e) {
        console.error("Eroare Test Print:", e);
        showToast("Eroare la printare: " + (e.message || "Unknown error"), true);
    }
}

// Expunem funcțiile global
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.testPrint = testPrint;
