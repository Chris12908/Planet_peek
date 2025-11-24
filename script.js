/*  script.js  –  Fixed version  */
/*  Works only via http://localhost or https://  */
(() => {
  /* ----------  safety: refuse file://  ---------- */
  if (location.protocol === 'file:') {
    document.body.innerHTML =
      '<h1 style="color:red;text-align:center;margin-top:30vh">' +
      'Open this page through a local server (e.g.  npx serve . )' +
      '</h1>';
    throw new Error('Use a local server');
  }

  /* ----------  DOM hooks  ---------- */
  const searchBtn    = document.getElementById('searchBtn');
  const countryInput = document.getElementById('countryInput');
  const regionFilter = document.getElementById('regionFilter');
  const sortOption   = document.getElementById('sortOption');
  const resultsDiv   = document.getElementById('results');
  const errorDiv     = document.getElementById('error');

  let countriesData = [];          // full cache
  let currentSearchData = [];      // current search results before filtering

  /* ----------  API base  ---------- */
  const BASE = 'https://restcountries.com/v3.1';

  /* ----------  FETCH  ---------- */
  async function fetchCountries(name = '') {
    try {
      errorDiv.textContent = '';
      resultsDiv.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">Loading...</p>';

      // Always use /all if search is empty
      const trimmedName = name.trim();
      let url;
      if (trimmedName.length > 0) {
        url = `${BASE}/name/${encodeURIComponent(trimmedName)}`;
      } else {
        url = `${BASE}/all`;
      }

      console.log('Fetching:', url);
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Country not found');
        }
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      let data = await res.json();
      console.log(`API returned ${data.length} countries`);

      // Store the search results
      currentSearchData = data;
      
      // Apply current region filter if any
      applyFiltersAndSort();
    } catch (err) {
      resultsDiv.innerHTML = '';
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorDiv.textContent = 'Network error: Unable to connect to the API. Please check your internet connection.';
      } else {
        errorDiv.textContent = err.message;
      }
      console.error('Fetch error:', err);
      currentSearchData = [];
      countriesData = [];
    }
  }

  /* ----------  APPLY FILTERS AND SORT  ---------- */
  function applyFiltersAndSort() {
    let filtered = [...currentSearchData];
    
    // Apply region filter
    const region = regionFilter.value;
    if (region) {
      filtered = filtered.filter(c => c.region === region);
    }
    
    // Update countriesData with filtered results
    countriesData = filtered;
    
    // Sort and display
    sortAndDisplay(countriesData);
    
    // Show error if no results
    if (filtered.length === 0 && region) {
      errorDiv.textContent = `No countries found in region "${region}"`;
    }
  }

  /* ----------  DISPLAY  ---------- */
  function displayCountries(list) {
    resultsDiv.innerHTML = '';

    if (list.length === 0) {
      resultsDiv.innerHTML = '<p style="text-align:center;color:#666;padding:20px;">No countries to display</p>';
      return;
    }

    list.forEach(c => {
      const card = document.createElement('div');
      card.className = 'country-card';

      card.innerHTML = `
        <img src="${c.flags?.svg ?? c.flags?.png}" alt="Flag of ${c.name.common}">
        <h3>${c.name.common}</h3>
        <p><strong>Capital:</strong> ${c.capital?.[0] || 'N/A'}</p>
        <p><strong>Population:</strong> ${c.population?.toLocaleString() || 0}</p>
        <p><strong>Area:</strong> ${c.area?.toLocaleString() || 0} km²</p>
        <p><strong>Region:</strong> ${c.region || 'N/A'}</p>
        <p><strong>Sub-region:</strong> ${c.subregion || 'N/A'}</p>
        <p><strong>Languages:</strong> ${
          c.languages ? Object.values(c.languages).join(', ') : 'N/A'
        }</p>
        <p><strong>Currencies:</strong> ${
          c.currencies
            ? Object.values(c.currencies).map(cur => cur.name).join(', ')
            : 'N/A'
        }</p>
        <p><strong>Calling Code:</strong> ${
          c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || '') : 'N/A'
        }</p>
        <p><strong>Time-zones:</strong> ${c.timezones?.join(', ') || 'N/A'}</p>
        <p><strong>Borders:</strong> ${c.borders?.join(', ') || 'None'}</p>
        <a href="${c.maps?.googleMaps}" target="_blank" rel="noopener">View on Google Maps</a>
      `;
      resultsDiv.appendChild(card);
    });
  }

  /* ----------  SORT  ---------- */
  function sortAndDisplay(data) {
    const opt = sortOption.value;
    const sorted = [...data];

    if (opt === 'populationAsc')  sorted.sort((a, b) => (a.population || 0) - (b.population || 0));
    if (opt === 'populationDesc') sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
    if (opt === 'areaAsc')        sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
    if (opt === 'areaDesc')       sorted.sort((a, b) => (b.area || 0) - (a.area || 0));

    displayCountries(sorted);
  }

  /* ----------  EVENTS  ---------- */
  searchBtn.addEventListener('click', () => {
    fetchCountries(countryInput.value);
  });

  regionFilter.addEventListener('change', () => {
    applyFiltersAndSort();
  });

  sortOption.addEventListener('change', () => {
    sortAndDisplay(countriesData);
  });

  /* ----------  INITIAL LOAD – every country  ---------- */
  fetchCountries();
})();