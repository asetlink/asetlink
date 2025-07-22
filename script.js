
async function cariKode() {
  const kode = document.getElementById('kodeInput').value.trim().toUpperCase();
  const hasil = document.getElementById('hasil');

  const res = await fetch('data.json');
  const data = await res.json();

  const cocok = data.find(item => item.kode === kode);

  if (cocok) {
    hasil.innerHTML = `<p><b>${cocok.kode}</b>: <a href="${cocok.link}" target="_blank">${cocok.link}</a></p>`;
  } else {
    hasil.innerHTML = '<p style="color:red;">Kode tidak ditemukan</p>';
  }
}
