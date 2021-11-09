const _createLastEpisodeInfo = (anime) => {
    const divStyles = {
        width: 'auto',
        padding: '10px 20px',
        position: 'fixed',
        right: '100px',
        top: '100px',
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        fontWeight: 'bold',
        borderRadius: '10px',
        border: "3px solid orange",
        transition: '.3s ease'
    }

    const lastEpisode = getLastEpisode(anime)

    if (lastEpisode) {
        const epiInfo = document.createElement('div')
        const link = document.createElement('a')
        link.style.color = 'orange'
        link.style.fontWeight = 'bold'
        link.innerText = `O ultimo episodio assistido foi: ${lastEpisode.anime}-${lastEpisode.episode}`
        link.href = `https://yayanimes.net/${lastEpisode.anime}-${lastEpisode.episode}`
        epiInfo.appendChild(link)
        Object.keys(divStyles).forEach((key) => {
            epiInfo.style[key] = divStyles[key];
        })

        document.body.appendChild(epiInfo)

        setTimeout(() => {
            epiInfo.style.opacity = 0;
        }, 5000)

        return { el: epiInfo, lastEpisode };
    }

    return false
}

const _createSideMenu = (episodes) => {

    const menu = document.createElement('div');
    menu.classList.add('netanime-side-menu');

    const outMenu = document.createElement('div')
    outMenu.classList.add('netanime-side-menu-item')

    outMenu.addEventListener('click', () => {
        menu.classList.toggle('open')
    })

    const image = document.createElement('img')
    image.src = MENU_IMG

    outMenu.appendChild(image)

    const menuitem = document.createElement('div')
    menuitem.classList.add('container')
    const fullscreenButton = document.createElement('button')
    const fullscreenTextButton = document.createTextNode('Fullscreen');
    fullscreenButton.appendChild(fullscreenTextButton)
    fullscreenButton.addEventListener('click', () => {
        const wrapper = document.querySelector('.jw-wrapper')
        if (wrapper) {
            _setPlayerFullPage(wrapper)
            const fullscreen = parseInt(sessionStorage.getItem('fullscreen'));
            sessionStorage.setItem('fullscreen', fullscreen === 0 || fullscreen === null ? 1 : 0)
        } else {
            console.log('Call Toast')
            new Toast({
                message: 'A funcao fullscreen so esta disponivel para paginas com episodios',
                type: 'danger'
            });
        }
    })

    menuitem.appendChild(fullscreenButton)

    if (episodes) {
        episodes.sort(sortByEpisodeDesc)

        episodes.forEach((epi) => {
            const button = document.createElement('button')
            button.style.textTransform = 'capitalize'
            const animeName = epi.name.split('-').join(' ');
            const textButton = document.createTextNode(animeName + ' ' + epi.episode);
            button.appendChild(textButton)
            button.addEventListener('click', () => {
                window.location.href = `https://yayanimes.net/${epi.anime}-${epi.episode}`
            })
            menuitem.appendChild(button)
        })
    }
    menu.appendChild(menuitem)
    menu.appendChild(outMenu)

    document.body.appendChild(menu)
}