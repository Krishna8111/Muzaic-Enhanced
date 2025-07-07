const API_KEY = "AIzaSyAY9kHD1xecO-tZ-vEZF9FYPlnir__28h0";  
const videoContainer = document.getElementById("video-container");
const categoryTitle = document.getElementById("category-title");

// Fetch videos from YouTube API based on category
async function fetchVideos(category) {
    const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${category}&regionCode=IN&videoDuration=long&maxResults=50&key=${API_KEY}`;
    
    try {
        console.log(`Fetching ${category} videos...`);
        categoryTitle.innerText = category;
        let response = await fetch(API_URL);
        let data = await response.json();
        
        if (data.error) {
            throw new Error(`API Error: ${data.error.message}`);
        }

        videoContainer.innerHTML = ""; // Clear previous results

        data.items.forEach(video => {
            const videoElement = document.createElement("div");
            videoElement.classList.add("video-card");
            videoElement.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                <h3>${video.snippet.title}</h3>
                <p>${video.snippet.channelTitle}</p>
            `;
            videoElement.addEventListener("click", () => {
                window.location.href = `player.html?videoId=${video.id.videoId}`;
            });

            videoContainer.appendChild(videoElement);
        });

        autoScroll();
    } catch (error) {
        console.error("Error loading videos:", error);
        videoContainer.innerHTML = `<p class="error">Error loading videos. Please try again later. 🚨</p>`;
    }
}

// Auto-scroll effect
function autoScroll() {
    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 50;

    function scroll() {
        if (scrollAmount < videoContainer.scrollHeight) {
            videoContainer.scrollBy(0, scrollStep);
            scrollAmount += scrollStep;
            setTimeout(scroll, scrollInterval);
        } else {
            scrollAmount = 0;
            videoContainer.scrollTo(0, 0);
            setTimeout(scroll, 2000);
        }
    }
    scroll();
}

// Load default videos when the page loads
document.addEventListener("DOMContentLoaded", () => fetchVideos("Bollywood Music"));
document.getElementById("back-to-home").addEventListener("click", function () {
    window.location.href = "index.html";  // Change "home.html" to your actual home page
});
