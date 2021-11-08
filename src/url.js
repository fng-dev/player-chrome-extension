const getEpisodeByUrl = () => {
    const { pathname } = window.location
    if (pathname !== '/') {
        const clearString = pathname.replace(/\//g, '')
        const episodeData = clearString.split('-');
        const EPISODE = episodeData[episodeData.length - 1]
        episodeData.splice(episodeData.length - 1, 1);
        const ANIME = episodeData.join('-')
        episodeData.splice(episodeData.length - 1, 1);
        const NAME = episodeData.join('-')
        return { anime: ANIME, episode: EPISODE, name: NAME }
    }

    return false
}

const getNameAnimeByUrl = () => {
    const page = window.location.pathname.split('/');
    switch (page.length) {
        case 2:
            if (page[1] !== '') {
                return page[1]
            }
            return false
        default:
            return page[1]
    }
}