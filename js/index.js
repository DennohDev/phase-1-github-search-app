// Endpoints
const mainEndpoint = 'https://api.github.com/users';
const userSearchEndpoint = 'https://api.github.com/search/users?q=';
const userReposEndpoint = 'https://api.github.com/users/octocat/repos';

const input = document.querySelector('#github-form')
const userList = document.querySelector('#user-list')
const reposList = document.querySelector('#repos-list')

// const reposLink = document.querySelector('<a href=""></a>')
// h3Element.textContent = 'Users List';
// userList.appendChild(h3Element);

input.addEventListener('submit', e => {
    e.preventDefault();
    const searchItem = input.elements['search'].value;
    fetch(`${userSearchEndpoint}${searchItem}`)
        .then(r => r.json())
        .then(items => displayItems(items, searchItem))
})

function displayItems(jsonData, searchItem) {
    userList.innerHTML = '';
    const searchResultTitle = document.createElement('h3')
    searchResultTitle.textContent = `"${searchItem}" search results`;
    userList.append(searchResultTitle)
    jsonData.items.forEach(item => {
        const userName = item.login;
        const avatarURL = item.avatar_url;
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');
        const imgElement = document.createElement('img')

        linkElement.textContent = userName;
        linkElement.href = '#';
        imgElement.src = avatarURL;
        imgElement.alt = `${userName}\`s Avatar`
        imgElement.width = 50;
        imgElement.height = 50;
        linkElement.addEventListener('click', () => {
            fetch(`${mainEndpoint}/${userName}/repos`)
                .then(r => r.json())
                .then(repositories => {
                    reposList.innerHTML = '';
                    const reposTitle = document.createElement('h3')
                    reposTitle.textContent = `${userName} repositories`;
                    reposList.append(reposTitle)
                    repositories.forEach(repo => {
                        const repoLi = document.createElement('li');
                        repoLi.textContent = repo.name;
                        reposList.appendChild(repoLi);
                    });
                });
        });
        liElement.appendChild(imgElement);
        liElement.appendChild(linkElement);
        userList.appendChild(liElement);
    });
}