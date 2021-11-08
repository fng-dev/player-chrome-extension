const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2)
        }, ms)
    })
}

const sortByEpisode = (a, b) => {
    if (parseInt(a.episode) < parseInt(b.episode))
        return -1;
    if (parseInt(a.episode) > parseInt(b.episode))
        return 1;
    return 0;
}

const sortByEpisodeDesc = (a, b) => {
    if (parseInt(a.episode) < parseInt(b.episode))
        return 1;
    if (parseInt(a.episode) > parseInt(b.episode))
        return -1;
    return 0;
}

const _removePlayer = () => {

    const PLAYER = [
        '.jw-controls',
        '.jw-controls-backdrop',
        '.jw-captions',
        '.jw-title',
    ]

    PLAYER.forEach((target) => {
        const el = document.querySelector(target);
        if (el) {
            el.style.display = 'none'
        }
    })
}


const _setPlayerFullPage = (video) => {
    video.classList.toggle('fullscreen-player')
    video.classList.toggle('jw-video')
    video.classList.toggle('jw-reset')
}