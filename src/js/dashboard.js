document.addEventListener("DOMContentLoaded", function () {

  const postsContainer = document.getElementById('posts-container');
  
  postsContainer.addEventListener('click', function (event) {
    const likeButton = event.target.closest('.like-button');

    if (likeButton && likeButton.classList.contains('like-button')) {
      likeButton.classList.toggle('liked');
    }
  });

  $.ajax({
    url: "php/router.php", // Usa un solo percorso
    type: 'GET',
    data: {
      request: 'dashboard'
    },
    dataType: "json",
    success: function (data) {
      if (data.result) {
        // Aggiorna la dashboard specifica
        updateDashboard(data);
      } else {
        console.error(data.error);
      }
    },
    error: function (error) {
      console.error("Errore nella richiesta al server:", error.statusText);
    }
  });

  $.get('php/router.php', {
    request: 'userPost'
  })
    .done(function (data) {
      console.log(data);
      if (data.result) {
        renderPosts(data.posts);
      } else {
        window.generalToast.fire({
          animation: true,
          icon: 'error',
          title: data.error,
          didOpen: (toast) => {
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight + 20) + 'px';
          }
        });
      }
    })
    .fail(function () {
      console.log('Error occurred during the AJAX request');
    });
 
});

function updateDashboard(data) {
  // Aggiorna il numero dei post, follower e seguiti
  $("#num_posts").text(data.num_posts);
  $("#num_followers").text(data.num_followers);
  $("#num_following").text(data.num_following);
  // Aggiorna l'immagine del profilo
  $("#profileImage").attr("src", data.profileImage);
  // Aggiungi nome e cognome
  $("#nomeCognome").text(`${data.nome} ${data.cognome}`);
}


function renderPosts(posts) {
  const postsContainer = document.getElementById('post-section');
  const fragment = document.createDocumentFragment();

  posts.forEach(post => {
    const postElement = document.createRange().createContextualFragment(createPostMarkup(post));
    fragment.appendChild(postElement);
    
    const myCollapsible = fragment.getElementById(post.username + "comment" + post.id)
      myCollapsible.addEventListener('show.bs.collapse', event => {
        requestComments(post.username, post.id, myCollapsible.id);
    })
  });

  postsContainer.innerHTML = ''; // Pulisce il contenuto del container
  postsContainer.appendChild(fragment); // Aggiunge il fragment al container
}


function createPostMarkup(post) {
  let postKey = post.username + "post" + post.id;
  let collapseComment = post.username + "comment" + post.id;
  let likeKey = post.username + "like" + post.id;
  return `
    <div class="post">
    <img src="${post.profileImage}" alt="${post.nome}" class="profile-image rounded float-start">
      <div class="text-center">
        <img src="${post.path_img}" alt="Post Image" class="post-image img-fluid rounded max-width-100">
        </div>
        <div class="post-content">
              <h4 class="mb-3">${post.nome}</h4>
              <p>${post.descrizione}</p>
              <div class="actions">
                  <div class="action-icons">
                  <p>${post.likes}</p><span class="like-button" onclick="incrementLike(this)" id="${likeKey}"><i class="fas fa-heart"></i></span>
                  <p>${post.comments}</p>
                      <a
                        id="faceCollapse"
                        class=" collapsed"
                        data-bs-toggle="collapse"
                        href="#${collapseComment}"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      ><span><i class="fa-regular fa-comment"></i></span></a>
                      <span><i class="far fa-bookmark"></i> </span>
                  </div>
              </div>
          </div>
          <div id="${postKey}" class="input-group">
            <input type="text" name="textComment" class="form-control" placeholder="inserisci un commento" aria-label="Input group example" aria-describedby="basic-addon1">
                  <span class="input-group-text" onclick="uploadComments(this.parentElement.id)" id="basic-addon1" style="cursor:pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                  </span>
          </div>
          <div id="${collapseComment}" class="collapse mt-3 scrollable">
          </div>
        </div>
    `;
}

function uploadComments(divId) {
  let user_id = divId.split("post");

  /*per il testo del commento prendo l'elemento con id passato e 
  poi prendo l'input e il suo valore */
  console.log(divId);
  div = document.getElementById(divId);
  input = div.querySelector('input');

  $.get('php/router.php', {
    request: 'uploadComments',
    textMessage: input.value,
    postId: user_id[1]
  })
    .done(function (data) {
      console.log(data);
      if (data.result) {

        window.generalToast.fire({
          animation: true,
          title: data.message,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight + 20) + 'px';
          },
          didClose: (toast) => { location.reload(); }
        });
      } else {
        window.generalToast.fire({
          animation: true,
          icon: 'error',
          title: data.error,
          didOpen: (toast) => {
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight + 20) + 'px';
          }
        });
      }
    })
    .fail(function () {
      console.log('Error occurred during the AJAX request');
    });
};

function requestComments(user, postId, divid) {
  $.get('php/router.php', {
    request: 'loadComments',
    postId: postId
  })
    .done(function (data) {
      console.log(data);
      if (data.result) {
        renderComments(data.comments, divid);
      } else {
        window.generalToast.fire({
          animation: true,
          title: data.error,
          didOpen: (toast) => {
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight + 20) + 'px';
          }
        });
      }
    })
    .fail(function () {
      console.log('Error occurred during the AJAX request');
    });
}

function createCommentMarkup(comment) {
  let html = `
<div class="bg-red">
        <div class="d-flex flex-column bg-opacity-10 bg-dark mx-2 px-3 " style="border-radius: 18px;">
          <div class="d-flex flex-column m-1">
            <span class="m-0 p-0 text-dark fw-bold fs-7" type="button">${comment.author}</span>
            <span class="m-0 p-0 text-dark ">${comment.text}</span>
          </div>
        </div>
        <div class="mx-2 p-0 d-flex justify-content-start fs-7 text-muted ">
          <div class="mx-2 fw-bold" type="button">Like</div>
          <div class="mx-2 fw-bold" type="button">Reply</div>
          <div class="mx-2 fw-bold" type="button">Share</div>
          <div class="mx-2" type="button">1d</div>
        </div>
      </div>
</div>`;
  return html;
}

function renderComments(comments, commentsContainerId) {
  const commentsContainer = document.getElementById(commentsContainerId);
  const fragment = document.createDocumentFragment();

  comments.forEach(comment => {
    const commentElement = document.createRange().createContextualFragment(createCommentMarkup(comment));
    fragment.appendChild(commentElement);
  });

  commentsContainer.innerHTML = ''; // Pulisce il contenuto del container
  commentsContainer.appendChild(fragment); // Aggiunge il fragment al container

}

function incrementLike(likeButton) {
  let user_id = likeButton.id.split("like");
  console.log(likeButton.id);

  // Aggiungi la chiamata AJAX per incrementare il numero di like
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: "php/router.php",
    data: {
      request: 'incrementLike',
      postId: user_id[1],
    },
    success: function (data) {
      if (data.result) {
        // Aggiorna l'UI con il nuovo numero di like
        const likeCountElement = likeButton.parentElement.querySelector('.actions p');
        likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
      } else {
        popUpFunction(data.error);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function popUpFunction(msg) {
  Swal.fire({
    title: 'ATTENZIONE',
    text: '' + msg,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'registrati o esegui il login',
    cancelButtonText: 'continua in anonimato',
  }).then((result) => {
    if (result.isConfirmed) {
      // Azione da eseguire se l'utente clicca su OK
      window.location.href = "index.php?page=register";
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Azione da eseguire se l'utente clicca su Annulla
      window.location.href = "index.php?page=home";
    }
  });
}