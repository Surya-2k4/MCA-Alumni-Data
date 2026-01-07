// Main application JavaScript

let alumniData = [];
let filteredData = [];
let lastUpdated = null;
let autoRefreshInterval = null;

// DOM Elements
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const alumniGrid = document.getElementById('alumniGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const batchFilter = document.getElementById('batchFilter');
const companyFilter = document.getElementById('companyFilter');
const resetBtn = document.getElementById('resetBtn');
const refreshBtn = document.getElementById('refreshBtn');
const lastUpdatedElement = document.getElementById('lastUpdated');

// Stats elements
const totalAlumniStat = document.getElementById('totalAlumni');
const totalCompaniesStat = document.getElementById('totalCompanies');
const displayedCountStat = document.getElementById('displayedCount');
const filteredCountStat = document.getElementById('filteredCount');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    try {
        await loadAlumniData();
        setupEventListeners();
        updateStats();
        startAutoRefresh();
    } catch (error) {
        showError();
        console.error('Initialization error:', error);
    }
}

// Auto-refresh data every 5 minutes
function startAutoRefresh() {
    // Refresh every 5 minutes (300000 ms)
    autoRefreshInterval = setInterval(async () => {
        console.log('Auto-refreshing data...');
        await refreshData();
    }, 300000);
}

// Manual refresh function
async function refreshData() {
    try {
        // Show loading indicator on refresh button
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        }
        
        await loadAlumniData();
        applyFilters();
        updateStats();
        
        // Show success message briefly
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed!';
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                refreshBtn.disabled = false;
            }, 2000);
        }
    } catch (error) {
        console.error('Refresh error:', error);
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                refreshBtn.disabled = false;
            }, 2000);
        }
    }
}

// Fetch data from Google Sheets
async function loadAlumniData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.values || data.values.length === 0) {
            throw new Error('No data found in the sheet');
        }
        
        // Parse the data (skip header row)
        alumniData = data.values.slice(1).map((row, index) => ({
            id: index,
            name: row[CONFIG.COLUMNS.NAME] || 'N/A',
            email: '', // No email field in form
            company: row[CONFIG.COLUMNS.COMPANY] || 'N/A',
            batchYear: row[CONFIG.COLUMNS.BATCH_YEAR] || 'N/A',
            linkedin: row[CONFIG.COLUMNS.LINKEDIN] || '',
            timestamp: row[CONFIG.COLUMNS.TIMESTAMP] || ''
        }));
        
        filteredData = [...alumniData];
        
        // Update last updated time
        lastUpdated = new Date();
        updateLastUpdatedDisplay();
        
        populateFilters();
        displayAlumni(filteredData);
        hideLoading();
        
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

// Update last updated display
function updateLastUpdatedDisplay() {
    if (lastUpdatedElement && lastUpdated) {
        const timeString = lastUpdated.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        lastUpdatedElement.textContent = `Last updated: ${timeString}`;
    }
}

// Populate filter dropdowns
function populateFilters() {
    // Clear existing options first (keep the default "All" option)
    batchFilter.innerHTML = '<option value="">All Batches</option>';
    companyFilter.innerHTML = '<option value="">All Companies</option>';
    
    // Get unique batch years
    const batchYears = [...new Set(alumniData.map(a => a.batchYear))]
        .filter(year => year !== 'N/A')
        .sort((a, b) => b - a);
    
    batchYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        batchFilter.appendChild(option);
    });
    
    // Get unique companies (case-insensitive comparison)
    const uniqueCompanies = new Set();
    const companyMap = new Map();
    
    alumniData.forEach(a => {
        const company = a.company;
        const companyLower = company.toLowerCase().trim();
        
        // Skip N/A values
        if (company === 'N/A' || !company) return;
        
        // Store the first occurrence with proper casing
        if (!uniqueCompanies.has(companyLower)) {
            uniqueCompanies.add(companyLower);
            companyMap.set(companyLower, company);
        }
    });
    
    // Sort companies alphabetically
    const sortedCompanies = Array.from(companyMap.values()).sort();
    
    sortedCompanies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
}

// Display alumni cards
function displayAlumni(data) {
    alumniGrid.innerHTML = '';
    
    if (data.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    data.forEach(alumni => {
        const card = createAlumniCard(alumni);
        alumniGrid.appendChild(card);
    });
    
    displayedCountStat.textContent = data.length;
}

// Create individual alumni card
function createAlumniCard(alumni) {
    const card = document.createElement('div');
    card.className = 'alumni-card';
    
    // Get initials for avatar
    const initials = alumni.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    
    // Sanitize LinkedIn URL
    const linkedinUrl = alumni.linkedin.startsWith('http') 
        ? alumni.linkedin 
        : alumni.linkedin 
            ? `https://linkedin.com/in/${alumni.linkedin}` 
            : '';
    
    card.innerHTML = `
        <div class="card-header">
            <div class="avatar">${initials}</div>
            <div class="card-title">
                <h3>${alumni.name}</h3>
                <span class="batch-tag">Batch ${alumni.batchYear}</span>
            </div>
        </div>
        
        <div class="card-body">
            <div class="info-row">
                <i class="fas fa-building"></i>
                <span class="company-name">${alumni.company}</span>
            </div>
        </div>
        
        <div class="card-footer">
            ${linkedinUrl ? `
                <a href="${linkedinUrl}" target="_blank" class="linkedin-btn" style="flex: 1;">
                    <i class="fab fa-linkedin"></i> View LinkedIn Profile
                </a>
            ` : '<span style="color: #94a3b8; text-align: center; width: 100%;">No LinkedIn profile</span>'}
        </div>
    `;
    
    return card;
}

// Filter functionality
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBatch = batchFilter.value;
    const selectedCompany = companyFilter.value;
    
    filteredData = alumniData.filter(alumni => {
        // Search filter (no email field in form)
        const matchesSearch = !searchTerm || 
            alumni.name.toLowerCase().includes(searchTerm) ||
            alumni.company.toLowerCase().includes(searchTerm);
        
        // Batch filter
        const matchesBatch = !selectedBatch || alumni.batchYear === selectedBatch;
        
        // Company filter
        const matchesCompany = !selectedCompany || alumni.company === selectedCompany;
        
        return matchesSearch && matchesBatch && matchesCompany;
    });
    
    displayAlumni(filteredData);
    updateStats();
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    batchFilter.value = '';
    companyFilter.value = '';
    filteredData = [...alumniData];
    displayAlumni(filteredData);
}

// Update statistics
function updateStats() {
    totalAlumniStat.textContent = alumniData.length;
    
    const uniqueCompanies = new Set(
        alumniData
            .map(a => a.company)
            .filter(c => c !== 'N/A')
    );
    totalCompaniesStat.textContent = uniqueCompanies.size;
    
    displayedCountStat.textContent = filteredData.length;
    
    // Update filtered count if element exists
    if (filteredCountStat) {
        const isFiltered = searchInput.value || batchFilter.value || companyFilter.value;
        if (isFiltered) {
            filteredCountStat.style.display = 'block';
            filteredCountStat.textContent = `Showing ${filteredData.length} of ${alumniData.length} alumni`;
        } else {
            filteredCountStat.style.display = 'none';
        }
    }
}

// Event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', applyFilters);
    batchFilter.addEventListener('change', applyFilters);
    companyFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
}

// UI helper functions
function hideLoading() {
    loading.style.display = 'none';
}

function showError() {
    loading.style.display = 'none';
    errorMessage.style.display = 'block';
}
