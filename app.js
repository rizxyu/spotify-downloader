function downloadSong() {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput.trim() === '') {
    alert('Masukkan URL lagu Spotify terlebih dahulu.');
    return;
  }
  /*
  */
  fetch(`http://api.wizzteam.my.id/api/downloader?endpoint=spotify&text=${encodeURIComponent(urlInput)}`)
    .then(response => response.json())
    .then(data => {
      displayResult(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan dalam mengunduh lagu.');
    });
}

function displayResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = `
    <p><strong>Judul:</strong> ${result.judul}</p>
    <p><strong>Artis:</strong> ${result.artis}</p>
    <p><strong>Album:</strong> ${result.album}</p>
    <p><strong>Rilis:</strong> ${result.rilis}</p>
    <img src="${result.thumb}" alt="Thumbnail" style="max-width: 100%; height: auto;">
    <audio controls>
      <source src="${result.audio}" type="audio/mpeg">
      Browser Anda tidak mendukung tag audio.
    </audio>
  `;

  // Tampilkan hasil section setelah mendapatkan hasil.
  const resultSection = document.querySelector('.result-section');
  resultSection.style.display = 'block';
}
