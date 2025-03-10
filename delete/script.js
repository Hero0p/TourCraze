document.addEventListener('DOMContentLoaded', () => {
    const minutesCounter = document.getElementById('minutesCounter');
    const topArtist = document.getElementById('topArtist');
    const topSongs = document.getElementById('topSongs');

    // Simulated data (replace with actual data in a real implementation)
    const totalMinutes = 54321;
    const artist = "Taylor Swift";
    const songs = [
        "Anti-Hero",
        "Cruel Summer",
        "Shake It Off",
        "Blank Space",
        "You Belong with Me"
    ];

    // Animate minutes counter
    let currentCount = 0;
    const counterInterval = setInterval(() => {
        currentCount += Math.ceil(totalMinutes / 100);
        if (currentCount >= totalMinutes) {
            currentCount = totalMinutes;
            clearInterval(counterInterval);
        }
        minutesCounter.textContent = currentCount.toLocaleString();
    }, 20);

    // Display top artist
    topArtist.textContent = artist;

    // Display top songs
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song;
        topSongs.appendChild(li);
    });
});
