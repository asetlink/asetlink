const jsonUrl = "https://opensheet.elk.sh/11S6QacPmz_w92u4U-ZdpKwHjZF6z8-JcqZkWGHrVoCI/Sheet1";

let data = [];

async function fetchData() {
  try {
    const response = await fetch(jsonUrl);
    data = await response.json();
  } catch (err) {
    document.getElementById('result').textContent = "Gagal ambil data.";
    console.error(err);
  }
}

function renderResults(results) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  if (results.length === 0) {
    resultDiv.textContent = 'Tidak ditemukan.';
  } else {
    results.forEach(item => {
      const a = document.createElement('a');
      const judul = item.JUDUL || item.judul || item.kode || '';
      const link = item.LINK || item.link || '';
      a.href = link;
      a.textContent = judul;
      a.target = '_blank';
      resultDiv.appendChild(a);
    });
  }
}

function onSearch() {
  const query = document.getElementById('kodeInput').value.trim().toLowerCase();
  const filtered = data.filter(item => {
    const judul = (item.JUDUL || item.judul || item.kode || '').toLowerCase();
    return judul.includes(query);
  });
  renderResults(filtered);
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchData();
  const input = document.getElementById('kodeInput');
  input.addEventListener('input', onSearch);  // Real-time search
});
