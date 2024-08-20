
function downloadSong() {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput.trim() === '') {
    alert('Enter the URL or Title of the Spotify song first.');
    return;
  }

  loading.classList.add("loader");
  downloadBtn.setAttribute('disabled','');

  fetch(`https://blueline-sandy.vercel.app/api/dl/spotify?url=${encodeURIComponent(urlInput)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayResult(data.result);
      loading.classList.remove("loader");
      downloadBtn.removeAttribute('disabled','');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred in searching the song.');
    });
}


function displayResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = `
    <p><strong>Album Name:</strong> ${result.albumName}</p>
    <p><strong>Artist:</strong> ${result.artistName}</p>
    <p><strong>Released:</strong> ${result.releaseDate}</p>
    <a href="${result.externalUrl}" target="_blank">Open in Spotify</a>
    <button onclick="dosabesar('${result.token}', '${result.albumName}')">Download</button>`;

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
