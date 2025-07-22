const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSFl8lDZYVTd3xNTxxdDICGkP7BfRtZqwzxIUp1vmjQM-V4M7OdZmON3bOAFA-rwQW8UsGiHPxPBbqs/pub?output=csv";
let data = [];

async function fetchData() {
  const response = await fetch(csvUrl);
  const text = await response.text();
  const rows = text.split('\n').map(row => row.split(','));
  // Asumsikan header: KODE, LINK
  data = rows.slice(1).map(row => ({
    kode: row[0]?.trim(),
    link: row[1]?.trim()
  }));
}

function searchKode(kodeInput) {
  const results = data.filter(entry => 
    entry.kode.toLowerCase().includes(kodeInput.toLowerCase())
  );
  return results;
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchData();

  const form = document.getElementById('searchForm');
  const input = document.getElementById('kodeInput');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    const results = searchKode(query);
    resultDiv.innerHTML = '';

    if (results.length > 0) {
      results.forEach(item => {
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.kode;
        link.target = '_blank';
        resultDiv.appendChild(link);
        resultDiv.appendChild(document.createElement('br'));
      });
    } else {
      resultDiv.textContent = 'Kode tidak ditemukan.';
    }
  });
});
