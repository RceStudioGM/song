document.getElementById('playBtn').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value.trim();
    const playerContainer = document.getElementById('playerContainer');

    if (!url) {
        alert("Jangan lupa masukkan link lagunya!");
        return;
    }

    // Reset kontainer sebelum memuat player baru
    playerContainer.innerHTML = '';
    playerContainer.classList.remove('player-muncul');
    playerContainer.classList.remove('border-white/5');

    setTimeout(() => {
        // Regex YouTube
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const ytMatch = url.match(ytRegex);

        // Regex Spotify (Support track, playlist, album, episode)
        const spotifyRegex = /spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/i;
        const spotifyMatch = url.match(spotifyRegex);

        let iframe = document.createElement('iframe');
        iframe.className = "w-full h-full rounded-2xl border-none";

        if (ytMatch && ytMatch[1]) {
            // Logika YouTube
            const videoId = ytMatch[1];
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
            // Logika Spotify (SUDAH DIPERBAIKI)
            const type = spotifyMatch[1];
            const id = spotifyMatch[2];
            
            // Menggunakan format embed resmi dari Spotify
            iframe.src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
            iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.loading = "lazy";
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else {
            // Tampilan error jika link salah
            playerContainer.innerHTML = `
                <div class="text-center p-6">
                    <i class="fa-solid fa-triangle-exclamation text-pink-500 text-4xl mb-3"></i>
                    <p class="text-pink-400 font-semibold text-lg">Opps! Link tidak dikenali.</p>
                    <p class="text-sm text-gray-300 mt-1">Pastikan itu link valid dari aplikasi YouTube atau Spotify.</p>
                </div>
            `;
            playerContainer.classList.add('border-white/5');
        }
        
        // (Opsional) Mengosongkan input setelah tombol ditekan
        document.getElementById('linkInput').value = '';
        
    }, 50);
});
