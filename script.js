document.getElementById('playBtn').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value.trim();
    const playerContainer = document.getElementById('playerContainer');

    if (!url) {
        alert("Jangan lupa masukkan link lagunya!");
        return;
    }

    // Reset kontainer dan hapus kelas animasi sebelum memuat yang baru
    playerContainer.innerHTML = '';
    playerContainer.classList.remove('player-muncul');
    playerContainer.classList.remove('border-white/5'); // Hapus border default Tailwind

    setTimeout(() => {
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const ytMatch = url.match(ytRegex);

        const spotifyRegex = /spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/i;
        const spotifyMatch = url.match(spotifyRegex);

        let iframe = document.createElement('iframe');
        // Class Tailwind untuk iframe agar pas dengan kontainer
        iframe.className = "w-full h-full rounded-2xl border-none";

        if (ytMatch && ytMatch[1]) {
            const videoId = ytMatch[1];
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else if (spotifyMatch && spotifyMatch[1] && spotifyMatch[2]) {
            const type = spotifyMatch[1];
            const id = spotifyMatch[2];
            iframe.src = `https://open.spotify.com/embed/$${type}/${id}?utm_source=generator&theme=0`;
            iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            iframe.loading = "lazy";
            
            playerContainer.appendChild(iframe);
            playerContainer.classList.add('player-muncul');

        } else {
            // Tampilan error dengan Tailwind
            playerContainer.innerHTML = `
                <div class="text-center p-6">
                    <i class="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-3"></i>
                    <p class="text-red-400 font-semibold">Opps! Link tidak dikenali.</p>
                    <p class="text-sm text-slate-400 mt-1">Pastikan itu link valid dari YouTube atau Spotify.</p>
                </div>
            `;
            playerContainer.classList.add('border-white/5');
        }
    }, 50);
});
