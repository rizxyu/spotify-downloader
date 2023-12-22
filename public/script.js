function downloadSong() {
  const urlInput = document.getElementById('urlInput').value;
  if (urlInput.trim() === '') {
    alert('Enter the URL or Title of the Spotify song first.');
    return;
  }

// Munculkan loading ketika dipencet
loading.classList.add("loader");
// Menghindari spam fetchAPI, button disabled ketika proses fetch
downloadBtn.setAttribute('disabled','');

  fetch(`https://api.wizzteam.my.id/api/downloader?endpoint=spotify&text=${encodeURIComponent(urlInput)}`)
    .then(response => response.json())
    .then(data => {
      displayResult(data)
    
        //hilangkan loading dan kembalikan button ketika berhasil fetch
  loading.classList.remove("loader");
  downloadBtn.removeAttribute('disabled','');
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred in downloading the song.');
    });
}

function displayResult(result) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = `
    <p><strong>Title:</strong> ${result.judul}</p>
    <p><strong>Artist:</strong> ${result.artis}</p>
    <p><strong>Album:</strong> ${result.album}</p>
    <p><strong>Released:</strong> ${result.rilis}</p>
    <img src="${result.thumb}" alt="Thumbnail" style="max-width: 100%; height: auto;">
    <button onclick="dosabesae('${result.audio}', '${result.judul}')">Download</button>  `;

  // Tampilkan hasil section setelah mendapatkan hasil.
  const resultSection = document.querySelector('.result-section');
  resultSection.style.display = 'block';
}
function dosabesar(audioUrl, judul) {
  // Buat elemen anchor untuk menginisiasi unduhan
  const downloadLink = document.createElement('a');
  downloadLink.href = audioUrl;
  downloadLink.download = `${judul}.mp3`;
  
  // Simulasikan klik pada elemen anchor untuk memulai unduhan
  downloadLink.click();
}
