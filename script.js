// === KONFIGURASI ===
const sheetURL = "https://opensheet.elk.sh/11S6QacPmz_w92u4U-ZdpKwHjZF6z8-JcqZkWGHrVoCI/Sheet1";
let data = [];

// === AMBIL DATA DARI GOOGLE SHEET (JSON via OpenSheet) ===
async function fetchData() {
  try {
    const response = await fetch(sheetURL);
    const json = await response.json();

    // Simpan data
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
  return data.filter(entry =>
    entry.judul.toLowerCase().includes(query.toLowerCase())
  );
}

// === EVENT LISTENER ===
document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();

  const form = document.getElementById("searchForm");
  const input = document.getElementById("kodeInput");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    const results = searchKode(query);
    resultDiv.innerHTML = "";

    if (results.length > 0) {
      results.forEach(item => {
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.judul;
        link.target = "_blank";
        resultDiv.appendChild(link);
        resultDiv.appendChild(document.createElement("br"));
      });
    } else {
      resultDiv.textContent = "❌ Tidak ditemukan. Rekomendasi:";
    }
  });
});
