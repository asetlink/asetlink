<script>
  const sheetURL = "https://opensheet.elk.sh/11S6QacPmz_w92u4U-ZdpKwHjZF6z8-JcqZkWGHrVoCI/Sheet1";

  let data = [];

  // Ambil data JSON dari OpenSheet
  fetch(sheetURL)
    .then(res => res.json())
    .then(json => {
      // Sesuaikan dengan nama kolom di Sheet kamu (misal: Judul, Link)
      data = json.map(row => ({
        judul: row.Judul?.trim() || "",
        link: row.Link?.trim() || ""
      }));
    });

  document.getElementById("search").addEventListener("input", function() {
    const keyword = this.value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    if (keyword === '') {
      resultDiv.innerHTML = 'Web akan otomatis menampilkan hasilnya untukmu.';
      return;
    }

    const found = data.filter(item =>
      item.judul.toLowerCase().includes(keyword)
    );

    if (found.length > 0) {
      found.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<strong>${item.judul}</strong><br><a href="${item.link}" target="_blank">${item.link}</a>`;
        resultDiv.appendChild(div);
      });
    } else {
      resultDiv.innerHTML = '<i>Tidak ditemukan. Rekomendasi:</i><br>';
      const rekomendasi = data.slice(0, 5);
      rekomendasi.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<strong>${item.judul}</strong><br><a href="${item.link}" target="_blank">${item.link}</a>`;
        resultDiv.appendChild(div);
      });
    }
  });

  // Popup auto show after 15 seconds
  const popup = document.getElementById("popup");
  const popupClose = document.getElementById("popup-close");

  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
    setTimeout(() => {
      popup.style.display = "flex";
    }, 15000);
  });
</script>
