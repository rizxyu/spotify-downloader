function downloadSong() {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput.trim() === '') {
    alert('Enter the URL or Title of the Spotify song first.');
    return;
  }

  // Munculkan loading ketika dipencet
  loading.classList.add("loader");
  // Menghindari spam fetchAPI, button disabled ketika proses fetch
  downloadBtn.setAttribute('disabled', '');

  fetch(`https://api-id.wzblueline.xyz/api/dl/spotify?url=${encodeURIComponent(urlInput)}`, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json; charset=utf-8",
      'X-Vercel-Id': "sin1::iad1::rjv8w-1726316792675-dc5c79ca5b6b",
      'X-Api-Key': "useno",
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'// Tambahkan header JSON
    }
  })
    .then(response => response.json())
    .then(data => {
      displayResult(data);

      // Hilangkan loading dan kembalikan button ketika berhasil fetch
      loading.classList.remove("loader");
      downloadBtn.removeAttribute('disabled', '');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred in searching the song.');
    });
}

function displayResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = `
    <p><strong>Title:</strong> ${result.result.title}</p>
    <img src="${result.result.thumbnail}" alt="Thumbnail" style="max-width: 100%; height: auto;">
    <button onclick="dosabesar('${result.result.downloadLink}', '${result.result.title}')">Download</button>`;

  // Tampilkan hasil section setelah mendapatkan hasil.
  const resultSection = document.querySelector('.result-section');
  resultSection.style.display = 'block';
}

function dosabesar(audioUrl, judul) {
  fetch(audioUrl)
    .then(response => response.blob())
    .then(blob => {
      // Buat objek Blob dan URL untuk file audio
      const blobUrl = URL.createObjectURL(blob);

      // Buat elemen anchor untuk menginisiasi unduhan
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = `${judul}.mp3`;

      // Appending elemen ke dalam dokumen untuk memicu unduhan
      document.body.appendChild(downloadLink);

      // Simulasikan klik pada elemen anchor untuk memulai unduhan
      downloadLink.click();

      // Hapus elemen setelah unduhan dimulai
      document.body.removeChild(downloadLink);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan dalam mengunduh lagu.');
    });
    }
