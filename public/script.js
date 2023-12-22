function downloadSong() {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput.trim() === '') {
    alert('Masukkan URL lagu Spotify terlebih dahulu.');
    return;
  }

// Munculkan loading ketika dipencet
loading.classList.add("loader");
// Menghindari spam fetchAPI, button disabled ketika proses fetch
downloadBtn.setAttribute('disabled','');

  fetch(`https://api.wizzteam.my.id/api/downloader?endpoint=spotify&text=${encodeURIComponent(urlInput)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Terjadi kesalahan dalam mengunduh lagu.');
      }
      return response.json();
    })
    .then(data => {
      displayResult(data);
        //hilangkan loading dan kembalikan button ketika berhasil fetch
  loading.classList.remove("loader");
  downloadBtn.removeAttribute('disabled','');
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
      //hilangkan loading dan kembali button ketika error
      loading.classList.remove("loader");
      downloadBtn.removeAttribute('disabled','');
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
