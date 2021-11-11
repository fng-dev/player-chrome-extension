let UPDATE_STORAGE_TIME = 20;
let REDIRECT_END_TIME = 20;
let INIT_VIDEO_TIME = 210;

createSession();


const initEpisode = async() => {
    chrome.storage.sync.get((result) => console.log(result))
    const EPISODE = await getEpisodeByUrl()
    let video = null
    let attempts = 0;

    while (video === null && attempts !== 5) {
        video = document.querySelector('video');
        await delay(200)
        attempts++;
    }

    let episodes = []
    if (EPISODE) {
        if (EPISODE.name !== '') {
            episodes = await getEpisodesByAnime(EPISODE.name)
        } else {
            const name = getNameAnimeByUrl();
            episodes = await getEpisodesByAnime(name)
        }
    }

    _createSideMenu(episodes)

    if (video) {
        const STORAGE_EPISODE = await getEpisode(EPISODE.anime, EPISODE.episode)

        if (STORAGE_EPISODE) {
            video.currentTime = STORAGE_EPISODE.currentTime
        } else {
            video.currentTime = INIT_VIDEO_TIME
        }

        if (parseInt(sessionStorage.getItem('fullscreen')) === 1) {
            const wrapper = document.querySelector('.jw-wrapper')
            _setPlayerFullPage(wrapper)
        }

        video.play()

        let updated_at = 0;
        let redirect = false
        video.addEventListener('timeupdate', () => {
            if (updated_at < (video.currentTime - UPDATE_STORAGE_TIME)) {
                const episodio = {
                    anime: EPISODE.anime,
                    duration: video.duration,
                    currentTime: video.currentTime,
                    episode: EPISODE.episode,
                    name: EPISODE.name
                }
                setEpisode(episodio)
                updated_at = video.currentTime
            }

            if ((video.duration - video.currentTime) < REDIRECT_END_TIME && !redirect) {
                redirect = true
                const nextEpi = parseInt(EPISODE.episode) + 1;
                window.location.href = `https://yayanimes.net/${EPISODE.anime}-${nextEpi}`
            }
        })
    } else {
        const elements = document.querySelectorAll('.nome-thumb');
        if (episodes) {
            elements.forEach((el) => {
                const thumbEpi = el.querySelector('.thumb');
                const epiNumber = el.querySelector('.num-episodio');
                epiNumber.style.bottom = '20px'
                const number = epiNumber.textContent.split(' ')[1];
                const epi = episodes.find((epi) => epi.episode === number)
                if (epi) {
                    const percentage = epi.currentTime * 100 / epi.duration

                    const barraTempo = document.createElement('div');
                    barraTempo.style.width = '100%'
                    barraTempo.style.height = '10px'
                    barraTempo.style.position = 'absolute'
                    barraTempo.style.backgroundColor = 'white'
                    barraTempo.style.bottom = '0px'

                    const marcador = document.createElement('div')
                    marcador.style.width = parseInt(percentage) + '%'
                    marcador.style.height = '10px'
                    marcador.style.backgroundColor = 'orange'
                    barraTempo.appendChild(marcador)
                    thumbEpi.appendChild(barraTempo)
                }
            })
        }
    }


}

initEpisode();