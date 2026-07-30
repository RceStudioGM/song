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
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const ytMatch = url.match(ytRegex);

        const spotifyRegex = /spotify\.com\/(track|playlist|album|episode)\/([a-zA-Z0-9]+)/i;
        const spotifyMatch = url.match(spotifyRegex);

        let iframe = document.createElement('iframe');
        iframe.className = "w-full rounded-2xl border-none";

        if (ytMatch && ytMatch[1]) {
            const videoId = ytMatch[1];
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.style.height = "352px"; // Tinggi standar YT
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
            const type = spotifyMatch[1];
            const id = spotifyMatch[2];
            
            // Link resmi embed Spotify terkini
            iframe.src = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
            
            // Atur tinggi dinamis: Jika track (satu lagu) lebih pendek, jika playlist lebih tinggi
            iframe.style.height = (type === 'track') ? "152px" : "352px";
            
            iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.loading = "lazy";
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else {
            playerContainer.innerHTML = `
                <div class="text-center p-6 py-10">
                    <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-4xl mb-3"></i>
                    <p class="text-yellow-400 font-semibold text-lg">Opps! Link tidak dikenali.</p>
                    <p class="text-sm text-gray-300 mt-1">Pastikan itu link valid dari aplikasi YouTube atau Spotify.</p>
                </div>
            `;
        }
        
        document.getElementById('linkInput').value = '';
    }, 50);
});
