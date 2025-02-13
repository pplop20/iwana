document.addEventListener("DOMContentLoaded", () => {
    function updateGifsHeight() {
        const mainDiv = document.querySelector(".main");
        const gifsDiv = mainDiv.querySelector(".gifs");
        // Update the .gifs container height to match the fully loaded .main height
        gifsDiv.style.height = `${mainDiv.scrollHeight}px`;
    }

    function placeGifsRandomly() {
        const mainDiv = document.querySelector(".main");
        const gifsDiv = mainDiv.querySelector(".gifs");
        const gifs = gifsDiv.querySelectorAll(".gif");

        const zonesCount = 3; // top, middle, bottom
        const containerHeight = gifsDiv.clientHeight;
        const zoneHeight = containerHeight / zonesCount;

        gifs.forEach((gif, i) => {
            const gifWidth = gif.offsetWidth;
            const gifHeight = gif.offsetHeight;

            // Random X anywhere within the container's width
            const randomX = Math.random() * (gifsDiv.clientWidth - gifWidth);

            // Divide vertical space into zones and assign one based on the gif's index
            const zone = i % zonesCount;
            const minY = zone * zoneHeight;
            const maxY = (zone + 1) * zoneHeight - gifHeight;
            // Ensure we have a valid range before computing a random position
            const randomY = (maxY > minY)
                ? minY + Math.random() * (maxY - minY)
                : minY;

            gif.style.left = `${randomX}px`;
            gif.style.top = `${randomY}px`;
        });
    }

    // Wait for the window load event (ensuring all images are loaded)
    window.addEventListener("load", () => {
        updateGifsHeight();
        placeGifsRandomly();
    });

    // Also recalc on window resize
    window.addEventListener("resize", () => {
        updateGifsHeight();
        placeGifsRandomly();
    });
});
