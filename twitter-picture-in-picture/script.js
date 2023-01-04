// HTMLCollection - live collection of elements (i.e. updates when the DOM changes)
const videos = document.getElementsByTagName("video");

setInterval(() => {
    for (const video of videos) {
        video.disablePictureInPicture = false;
    }
}, 3000)