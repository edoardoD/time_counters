document.addEventListener("DOMContentLoaded", function () {
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
});

function updateDashboard(data) {
    // Aggiorna il numero dei post, follower e seguiti
    $("#num_posts").text(data.num_posts);
    $("#num_followers").text(data.num_followers);
    $("#num_following").text(data.num_following);

    // Aggiorna l'immagine del profilo
    $("#profileImage").attr("src", data.profileImage);

    // Aggiorna la griglia di immagini
    const imagesContainer = $("#user_images");
    imagesContainer.empty();
    data.posts.forEach(post => {
        const postMarkup = createPostMarkup(post);
        imagesContainer.append(postMarkup);
    });
}

function createPostMarkup(post) {
    let postKey = post.username+"_"+post.id; 
    let commentKey = post.username+""+post.id; 
    console.log(postKey);
    return `
        <div class="post">
          <img src="${post.profileImage}" alt="${post.nome}" class="profile-image">
          <div class="post-content">
              <h4 class="mb-3">${post.nome}</h4>
              <p>${post.descrizione}</p>
              <div class="actions">
                  <div class="action-icons">
                      <p>${post.likes}</p><span class="like-button"><i class="fas fa-heart"></i></span>
                      <p>${post.comments}</p>
                      <a
                        id="faceCollapse"
                        class=" collapsed"
                        data-bs-toggle="collapse"
                        href="#${commentKey}"
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
          <div id="${commentKey}" class="collapse mt-3 scrollable">
          </div>
        </div>
    `;
}

function uploadComments(divId) {
    let user_id = divId.split("_");
  
    /*per il testo del commento prendo l'elemento con id passato e 
    poi prendo l'input e il suo valore */
    console.log(divId);
    div = document.getElementById(divId);
    input = div.querySelector('input'); 
    
    $.get('php/router.php', {
      request: 'uploadComments',
      textMessage: input.value,
      user: user_id[0],
      postId: user_id[1]
    })
    .done(function(data) {
      console.log(data);
      if (data.result) {
        
        window.generalToast.fire({
          animation: true,
          title: data.message,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
          },
          didClose: (toast) => {  location.reload();}
        });
      } else {
        window.generalToast.fire({
          animation: true,
          icon: 'error',
          title: data.error,
          didOpen: (toast) => {
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
          }
        });
      }
    })
    .fail(function() {
      console.log('Error occurred during the AJAX request');
    });
  };
  
  function requestComments(user, postId, divid) {
    $.get('php/router.php', {
      request: 'loadComments',
      user: user,
      postId: postId
    })
    .done(function(data) {
      console.log(data);
      if (data.result) {
        renderComments(data.comments,divid);
      } else {
        window.generalToast.fire({
          animation: true,
          title: data.error,
          didOpen: (toast) => {
            document.querySelector('.swal2-popup-custom').style.marginTop = (window.navbarHeight+20) + 'px';
          }
        });
      }
    })
    .fail(function() {
      console.log('Error occurred during the AJAX request');
    });
  }