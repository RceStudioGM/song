document.getElementById('playBtn').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value.trim();
    const playerContainer = document.getElementById('playerContainer');

    // Validasi jika input kosong
    if (!url) {
        alert("Harap masukkan link terlebih dahulu!");
        return;
    }

    // Bersihkan kontainer sebelum menambahkan player baru
    playerContainer.innerHTML = '';

    // Regex untuk mendeteksi berbagai format link YouTube (youtube.com atau youtu.be)
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const ytMatch = url.match(ytRegex);

    // Regex untuk mendeteksi link Spotify (track, playlist, atau album)
    const spotifyRegex = /spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/i;
    const spotifyMatch = url.match(spotifyRegex);

    if (ytMatch && ytMatch[1]) {
        // Jika link adalah YouTube
        const videoId = ytMatch[1];
        const iframe = document.createElement('iframe');
        
        // Buat link embed YouTube
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        playerContainer.appendChild(iframe);

    } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
        // Jika link adalah Spotify
        const type = spotifyMatch[1]; // track / playlist / album
        const id = spotifyMatch[2];   // ID unik lagunya
        const iframe = document.createElement('iframe');
        
        // Buat link embed Spotify
        iframe.src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
        iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        iframe.loading = "lazy";
        
        playerContainer.appendChild(iframe);

    } else {
        // Jika link tidak dikenali
        playerContainer.innerHTML = '<p style="color: #ff4d4d; padding: 20px;">Link tidak valid atau tidak didukung.<br>Pastikan itu adalah link YouTube atau Spotify.</p>';
    }
});
