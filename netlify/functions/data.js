const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const sheetID = "GANTI_DENGAN_ID_SHEET_MU";
  const sheetName = "Sheet1";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const rows = json.table.rows.map(row => ({
      judul: row.c[0]?.v || "",
      link: row.c[1]?.v || "",
      kategori: row.c[2]?.v || "",
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal ambil data" }),
    };
  }
};
