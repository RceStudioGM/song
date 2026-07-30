document.getElementById('playBtn').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value.trim();
    const playerContainer = document.getElementById('playerContainer');

    if (!url) {
        alert("Mohon masukkan link musikmu terlebih dahulu, ya!");
        return;
    }

    // Reset kontainer dan hapus kelas animasi sebelum memuat yang baru
    playerContainer.innerHTML = '';
    playerContainer.classList.remove('animate-player');

    // Beri jeda sangat singkat agar browser mereset state animasi, lalu jalankan
    setTimeout(() => {
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const ytMatch = url.match(ytRegex);

        const spotifyRegex = /spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/i;
        const spotifyMatch = url.match(spotifyRegex);

        let iframe = document.createElement('iframe');

        if (ytMatch && ytMatch[1]) {
            const videoId = ytMatch[1];
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('animate-player'); // Picu animasi

        } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
            const type = spotifyMatch[1];
            const id = spotifyMatch[2];
            iframe.src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
            iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.loading = "lazy";
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('animate-player'); // Picu animasi

        } else {
            playerContainer.innerHTML = '<p style="color: #ff6b6b; font-weight: 600;">Opps! Link tidak dikenali.<br>Pastikan itu link valid dari YouTube atau Spotify.</p>';
        }
    }, 50); // Jeda 50ms untuk trik memicu ulang animasi CSS
});
