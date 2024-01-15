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
  let fileArray = [];
  Swal.fire({
    title: 'Carica immagine e testo',
    html: `
      <div class="button_outer">
        <div class="btn_upload">
          <input type="file" id="upload_file" accept="image/*"  name="" multiple>
          Upload Image
        </div>
        <div class="processing_bar"></div>
        <div class="success_box"></div>
      </div>
      <div class="error_msg"></div>
      <div class="uploaded_file_view" id="uploaded_view">
        <span class="file_remove">X</span>
      </div>
      <textarea id="textUpload" placeholder="Inserisci il tuo testo qui..."></textarea>
    `,
    confirmButtonText: 'Conferma',
    focusConfirm: false,
    didOpen: () => {
      let btnUpload = $("#upload_file"),
        btnOuter = $(".button_outer");

      btnUpload.on("change", function (e) {
        var ext = btnUpload.val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
          $(".error_msg").text("Not an Image...");
        } else {
          $(".error_msg").text("");
          btnOuter.addClass("file_uploading");
          setTimeout(function () {
            btnOuter.addClass("file_uploaded");
          }, 3000);
          fileArray = Array.from(e.target.files);
          fileArray.forEach(function (file) {
            let uploadedFile = URL.createObjectURL(file);
            setTimeout(function () {
              $("#uploaded_view").append('<img src="' + uploadedFile + '" />').addClass("show");
            }, 3500);
          });
        }
      });
      $(".file_remove").on("click", function () {
        $("#uploaded_view").removeClass("show");
        $("#uploaded_view").find("img").remove();
        btnOuter.removeClass("file_uploading");
        btnOuter.removeClass("file_uploaded");
      });
    },
    preConfirm: () => {
      let formData = new FormData();
      let text = $("#textUpload").val();

      fileArray.forEach(function (file, index) {
        formData.append('file' + index, file);
      });
      return { formData, text };
    }
  }).then((result) => {
    if (result.value) {
      console.log(result.value);
    }
  });

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
      document.querySelector('.swall-alert-postInfo').style.marginBottom = bottomPosition + 'px';
    },
    customClass: {
      popup: '.swall-alert-postInfo'
    }
  });

});

