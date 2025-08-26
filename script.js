const jsonUrl = "https://opensheet.elk.sh/11S6QacPmz_w92u4U-ZdpKwHjZF6z8-JcqZkWGHrVoCI/Sheet1";

let data = [];

async function fetchData() {
  const response = await fetch(jsonUrl);
  const json = await response.json();
  data = json.map(item => ({
    kode: item.JUDUL?.trim(),
    link: item.LINK?.trim()
  }));
}

function searchKode(kodeInput) {
  return data.filter(entry =>
    entry.kode.toLowerCase().includes(kodeInput.toLowerCase())
  );
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
