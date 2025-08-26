<script>
// === KONFIGURASI ===
const sheetURL = "https://opensheet.elk.sh/11S6QacPmz_w92u4U-ZdpKwHjZF6z8-JcqZkWGHrVoCI/Sheet1";
let data = [];

// === AMBIL DATA DARI GOOGLE SHEET (JSON via OpenSheet) ===
async function fetchData() {
  try {
    const response = await fetch(sheetURL);
    const json = await response.json();

    // Simpan data dengan kolom JUDUL & LINK
    data = json.map(item => ({
      judul: item.JUDUL?.trim() || "",
      link: item.LINK?.trim() || ""
    }));

    console.log("✅ Data berhasil dimuat:", data);
  } catch (err) {
    console.error("❌ Gagal memuat data:", err);
    document.getElementById("result").innerText = "Gagal memuat data.";
  }
}

// === FUNGSI PENCARIAN ===
function searchKode(query) {
  if (!query) return [];
  return data.filter(entry =>
    entry.judul.toLowerCase().includes(query.toLowerCase())
  );
}

// === TAMPILKAN HASIL ===
function renderResults(results, resultDiv) {
  resultDiv.innerHTML = "";

  if (results.length > 0) {
    results.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<strong>${item.judul}</strong><br>
                       <a href="${item.link}" target="_blank">${item.link}</a>`;
      resultDiv.appendChild(div);
    });
  } else {
    resultDiv.innerHTML = "<i>❌ Tidak ditemukan. Rekomendasi:</i><br>";

    // tampilkan 5 rekomendasi teratas
    const rekomendasi = data.slice(0, 5);
    rekomendasi.forEach(item => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<strong>${item.judul}</strong><br>
                       <a href="${item.link}" target="_blank">${item.link}</a>`;
      resultDiv.appendChild(div);
    });
  }
}

// === EVENT LISTENER ===
document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();

  const form = document.getElementById("searchForm");
  const input = document.getElementById("kodeInput");
  const resultDiv = document.getElementById("result");

  // Pencarian via submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    const results = searchKode(query);
    renderResults(results, resultDiv);
  });

  // Pencarian realtime (langsung saat mengetik)
  input.addEventListener("input", () => {
    const query = input.value.trim();
    const results = searchKode(query);
    renderResults(results, resultDiv);
  });
});
</script>
