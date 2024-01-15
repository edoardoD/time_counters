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
  // const thoughts = prompt('Condividi i tuoi pensieri:');
  // if (thoughts !== null && thoughts.trim() !== '') {
  //   const newPost = { username: 'Utente Nuovo', text: thoughts };
  //   posts.push(newPost);
  //   renderPosts();
  // }

  Swal.fire({
    title: 'Carica immagine e testo',
    html: `
      <input id="imageUpload" class="swal2-inputimage" type="file" accept="image/*" multiple aria-label="Carica la tua immagine del profilo">
      <textarea id="textUpload" class="swal2-textarea" placeholder="Inserisci il tuo testo qui..."></textarea>
    `,
    confirmButtonText: 'Conferma',
    focusConfirm: false,
    preConfirm: () => {
      const image = document.getElementById('imageUpload').files[0];
      const text = document.getElementById('textUpload').value;
      return { image, text };
    }
  }).then((result) => {
    if (result.value) {
      // Qui puoi gestire l'immagine e il testo caricati
      // Ad esempio, puoi inviarli al server tramite una richiesta AJAX
    }
  });
  
  
  
}

$("#imageUpload").change(function() {
  var ext = btnUpload.val().split('.').pop().toLowerCase();
	if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
		$(".error_msg").text("Not an Image...");
	} else {
		$(".error_msg").text("");
		btnOuter.addClass("file_uploading");
		setTimeout(function(){
			btnOuter.addClass("file_uploaded");
		},3000);
		Array.from(e.target.files).forEach(function(file){
			var uploadedFile = URL.createObjectURL(file);
			setTimeout(function(){
				$("#uploaded_view").append('<img src="'+uploadedFile+'" />').addClass("show");
			},3500);
		});
	}
}); //quando si carica un immagine



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


$(function () {
  footerHeigt = document.querySelector('footer').offsetHeight;
  var bottomPosition = footerHeigt + 10;
  
  //allert più figo per quando si faranno i post
  postAlert = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'Posted successfully',
    animation: false,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      document.querySelector('.swall-alert-postInfo').style.marginBottom  = bottomPosition + 'px';
    },
    customClass: {
      popup: '.swall-alert-postInfo'
    }
  });

});

