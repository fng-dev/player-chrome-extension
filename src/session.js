const SESSION_NAME = 'netAnimes';

const createSession = () => {
    const INITIAL_VALUE = JSON.stringify({
        episodes: [],
        created_at: moment(),
    })
    localStorage.setItem(SESSION_NAME, INITIAL_VALUE)
}

const setSession = (payload) => {
    const STORAGE = JSON.parse(localStorage.getItem(SESSION_NAME));
    const SESSION = {...STORAGE, payload }
    localStorage.setItem(SESSION_NAME, JSON.stringify(SESSION))
}

const setEpisode = (payload) => {
    const STORAGE = JSON.parse(localStorage.getItem(SESSION_NAME))
    const { episodes } = STORAGE;
    const EPISODE_INDEX = episodes.findIndex((episode) => episode.anime === payload.anime && episode.episode === payload.episode)
    if (EPISODE_INDEX === -1) {
        episodes.push(payload)
    } else {
        episodes[EPISODE_INDEX] = payload
    }

    const SESSION = {...STORAGE, episodes }

    localStorage.setItem(SESSION_NAME, JSON.stringify(SESSION))
}

const getEpisode = (anime, episodeNumber) => {
    const STORAGE = JSON.parse(localStorage.getItem(SESSION_NAME))
    const { episodes } = STORAGE
    const episode = episodes.find((ep) => ep.anime === anime && ep.episode === episodeNumber)
    if (episode) {
        return episode
    }

    return false
}

const getEpisodesByAnime = (name) => {
    const STORAGE = JSON.parse(localStorage.getItem(SESSION_NAME))
    const { episodes } = STORAGE
    const episode = episodes.filter((ep) => ep.name === name)
    if (episode.length) {
        return episode
    }

    return false
}

const getLastEpisode = (anime) => {
    const STORAGE = JSON.parse(localStorage.getItem(SESSION_NAME))
    const { episodes } = STORAGE
    const animeEpisodes = episodes.filter((ep) => ep.anime === anime)
    if (animeEpisodes.length > 0) {
        animeEpisodes.sort(sortByEpisode)
        return animeEpisodes[animeEpisodes.length - 1]
    }

    return false
}

const isSessionSeted = () => {
    if (localStorage.getItem(SESSION_NAME)) {
        return true
    }

    return false
}