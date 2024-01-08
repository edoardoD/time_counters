document.addEventListener('DOMContentLoaded', function () {
  const postsContainer = document.getElementById('posts-container');

  renderPosts();

  postsContainer.addEventListener('click', function (event) {
      const likeButton = event.target.closest('.like-button');

      if (likeButton && likeButton.classList.contains('like-button')) {
          likeButton.classList.toggle('liked');
      }
  });
});

function createPostMarkup(post) {
  return `
      <div class="post">
          <img src="https://via.placeholder.com/50" alt="${post.username}" class="profile-image">
          <div class="post-content">
              <h4 class="mb-3">${post.username}</h4>
              <p>${post.text}</p>
              <div class="actions">
                  <div class="action-icons">
                      <span class="like-button"><i class="fas fa-heart"></i></span>
                      <span><i class="far fa-comment"></i></span>
                      <span><i class="far fa-bookmark"></i></span>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function openNewPostForm() {
  const thoughts = prompt('Condividi i tuoi pensieri:');
  if (thoughts !== null && thoughts.trim() !== '') {
      const newPost = { username: 'Utente Nuovo', text: thoughts };
      posts.push(newPost);
      renderPosts();
  }
}

function renderPosts() {
  const postsContainer = document.getElementById('posts-container');
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
      const postElement = document.createRange().createContextualFragment(createPostMarkup(post));
      fragment.appendChild(postElement);
  });

  postsContainer.innerHTML = ''; // Pulisce il contenuto del container
  postsContainer.appendChild(fragment); // Aggiunge il fragment al container
}

const posts = [
  { username: 'utente1', text: 'Questo è un post di utente1' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente2' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente3' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  { username: 'utente2', text: 'Ecco cosa ha pubblicato utente4' },
  // Aggiungi altri post secondo necessità
];
