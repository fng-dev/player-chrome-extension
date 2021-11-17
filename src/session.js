const SESSION_NAME = 'netAnimes';

const chromeStorageSyncGet = (key) => {
    const STORAGE = localStorage.getItem(key)
    return JSON.parse(STORAGE)
}

const chromeStorageSyncSet = (object) => {
    localStorage.setItem(SESSION_NAME, JSON.stringify(object))
}

const createSession = async() => {
    const SESSION = chromeStorageSyncGet(SESSION_NAME)
    if (SESSION === null || SESSION === undefined) chromeStorageSyncSet({
        created_at: moment(),
        episodes: []
    })
}

const setSession = async(payload) => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const SESSION = {...STORAGE, payload }
    chromeStorageSyncSet(SESSION)
}

const setEpisode = async(payload) => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const { episodes } = STORAGE;
    const EPISODE_INDEX = episodes.findIndex((episode) => episode.anime === payload.anime && episode.episode === payload.episode)
    if (EPISODE_INDEX === -1) {
        episodes.push(payload)
    } else {
        episodes[EPISODE_INDEX] = payload
    }

    const SESSION = {...STORAGE, episodes }

    chromeStorageSyncSet(SESSION)
}

const getAllEpisodesGrouped = async() => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const { episodes } = STORAGE;
    const grouped = episodes.reduce((acc, current) => {
        if (acc && acc[current.name]) {
            acc[current.name].push(current)
        } else {
            acc[current.name] = [current]
        }

        return acc
    }, {})

    return grouped
}

const getEpisode = async(anime, episodeNumber) => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const { episodes } = STORAGE
    const episode = episodes.find((ep) => ep.anime === anime && ep.episode === episodeNumber)
    if (episode) {
        return episode
    }

    return false
}

const getEpisodesByAnime = async(name) => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const { episodes } = STORAGE
    const episode = episodes.filter((ep) => ep.name === name)
    if (episode.length) {
        return episode
    }

    return false
}

const getLastEpisode = async(anime) => {
    const STORAGE = chromeStorageSyncGet(SESSION_NAME)
    if (!STORAGE) return
    const { episodes } = STORAGE
    const animeEpisodes = episodes.filter((ep) => ep.anime === anime)
    if (animeEpisodes.length > 0) {
        animeEpisodes.sort(sortByEpisode)
        return animeEpisodes[animeEpisodes.length - 1]
    }

    return false
}