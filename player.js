const API_KEY = "AIzaSyD3svQLY6NZy8b_0z1mQIemOQwG1mup9dc"; // Replace with your key
const SEARCH_QUERY = 'trending videos';
const videoPlayer = document.getElementById('video-player') || document.createElement('iframe');
const suggestedContentContainer = document.getElementById('suggested-content') || document.createElement('div');

// Fetch and display videos
async function fetchVideos(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${query}&type=video&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    displaySuggestedVideos(data.items);
    setPreviewVideo(data.items[0]); // Set first video as preview
}

// Display suggested videos
function displaySuggestedVideos(videos) {
    suggestedContentContainer.innerHTML = '<h2>Suggested Content</h2>'; // Clear previous

    videos.forEach((video, index) => {
        const thumbnail = video.snippet.thumbnails.medium.url;
        const title = video.snippet.title;

        const contentBox = document.createElement('div');
        contentBox.classList.add('content-box');
        contentBox.innerHTML = `
            <img src="${thumbnail}" alt="${title}" class="thumbnail">
            <p class="video-title">${title}</p>
        `;

        // Set preview video for the first one
        if (index === 0) setPreviewVideo(video);

        // Play video on click
        contentBox.onclick = () => setPreviewVideo(video);
        suggestedContentContainer.appendChild(contentBox);
    });
}

// Update preview video player
function setPreviewVideo(video) {
    if (!video || !video.id.videoId) return;
    const videoId = video.id.videoId;
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

// Search function
document.getElementById('search-btn').onclick = () => {
    const query = document.getElementById('search-bar').value.trim();
    if (query) fetchVideos(query);
};

// Fetch trending videos on load
document.addEventListener('DOMContentLoaded', () => {
    fetchVideos(SEARCH_QUERY);
});document.querySelector(".toggle-description").addEventListener("click", function() {
    document.querySelector(".description").classList.toggle("hidden");
});
