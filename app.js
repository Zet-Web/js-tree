const container = document.querySelector('.container');
function getPost(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
}

let res = [];
getPost('http://164.90.161.80:3000/api/content').then((post) => {
  const posts = post.children;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < posts.length; i++) {
    const item = document.createElement('div');
    item.classList.add('top-item');
    item.textContent = posts[i].title;
    item.setAttribute('id', posts[i].id);
    fragment.appendChild(item);
    container.appendChild(fragment);
  }
});

container.addEventListener('click', (e) => {
  if (e.target.className === 'top-item' && e.target.children.length === 0) {
    const id = e.target.getAttribute('id');
    console.log(id);
    getPost(`http://164.90.161.80:3000/api/content?dirId=${id}`).then(
      (data) => {
        const divInsideContainer = document.createElement('div');
        divInsideContainer.classList.add('inside-wrapper');
        e.target.appendChild(divInsideContainer);
        for (let i = 0; i < data.children.length; i++) {
          const divInside = document.createElement('div');
          divInside.classList.add('top-item');

          divInside.textContent = data.children[i].title;
          divInside.setAttribute('id', data.children[i].id);
          divInsideContainer.appendChild(divInside);
        }
      }
    );
  } else {
    e.target.classList.toggle('hidden');
  }
});
