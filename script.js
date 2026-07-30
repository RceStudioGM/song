document.getElementById('playBtn').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value.trim();
    const playerContainer = document.getElementById('playerContainer');

    if (!url) {
        alert("Jangan lupa masukkan link lagunya!");
        return;
    }

    // Reset kontainer
    playerContainer.innerHTML = '';
    playerContainer.classList.remove('player-muncul', 'border-white/5');

    setTimeout(() => {
        // Cek apakah ini link dari YouTube atau YouTube Music
        const isYouTube = url.toLowerCase().includes('youtube.com') || url.toLowerCase().includes('youtu.be');
        
        // Regex pintar untuk mengambil ID Video dan ID Playlist
        const ytVideoMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/i);
        const ytPlaylistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/i);

        // Regex Spotify (tetap sama)
        const spotifyRegex = /spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/i;
        const spotifyMatch = url.match(spotifyRegex);

        let iframe = document.createElement('iframe');
        iframe.className = "w-full rounded-2xl border-none";

        if (isYouTube && (ytVideoMatch || ytPlaylistMatch)) {
            // JIKA LINK ADALAH PLAYLIST MURNI
            if (ytPlaylistMatch && (!ytVideoMatch || url.includes('/playlist?'))) {
                const listId = ytPlaylistMatch[1];
                // Format embed khusus untuk Playlist YouTube
                iframe.src = `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1`;
            } 
            // JIKA LINK ADALAH VIDEO/LAGU SATUAN
            else if (ytVideoMatch) {
                const videoId = ytVideoMatch[1];
                let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                // Kalau lagunya ada di dalam playlist, muat juga daftar playlistnya
                if (ytPlaylistMatch) {
                    embedUrl += `&list=${ytPlaylistMatch[1]}`;
                }
                iframe.src = embedUrl;
            }
            
            iframe.style.height = "352px"; 
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
            // LOGIKA SPOTIFY
            const type = spotifyMatch[1];
            const id = spotifyMatch[2];
            
            iframe.src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
            iframe.style.height = (type === 'track') ? "152px" : "352px";
            iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.loading = "lazy";
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else {
            // ERROR HANDLING
            playerContainer.innerHTML = `
                <div class="text-center p-6 py-10">
                    <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-4xl mb-3"></i>
                    <p class="text-yellow-400 font-semibold text-lg">Opps! Link tidak dikenali.</p>
                    <p class="text-sm text-gray-300 mt-1">Pastikan itu link valid dari YouTube, YT Music, atau Spotify.</p>
                </div>
            `;
        }
        
        // Bersihkan kolom input otomatis
        document.getElementById('linkInput').value = '';
        
    }, 50);
});
