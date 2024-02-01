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
                // Aggiorna la vista generale
                //updateView(data);

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

function updateView(data) {
    // Aggiorna il numero di post
    $(".counter-posts").text(data.posts.length);

    // Aggiorna il numero di follower
    $(".counter-followers").text(data.num_followers);

    // Aggiorna il numero di persone seguite
    $(".counter-following").text(data.num_following);

    // Aggiorna la griglia di immagini
    const imagesContainer = $(".row-images");
    imagesContainer.empty();
    data.posts.forEach(post => {
        const imageElement = $("<div class='col-md-4 mb-3'><img class='img-fluid rounded' src='" + post.image + "' alt='User Image'></div>");
        imagesContainer.append(imageElement);
    });
}

function updateDashboard(data) {
    // Aggiorna il numero dei post, follower e seguiti
    $("#num_posts").text(data.num_posts);
    $("#num_followers").text(data.num_followers);
    $("#num_following").text(data.num_following);

    // Aggiorna la griglia di immagini
    const imagesContainer = $("#user_images");
    imagesContainer.empty();
    data.posts.forEach(post => {
        const postMarkup = createPostMarkup(post);
        imagesContainer.append(postMarkup);
    });
}

function createPostMarkup(post) {
    return `
        <div class="post">
            <img src="${post.profileImage}" alt="${post.nome}" class="profile-image">
            <div class="post-content">
                <h4 class="mb-3">${post.nome}</h4>
                <p>${post.descrizione}</p>
                <div class="actions">
                    <div class="action-icons">
                        <span class="like-button"><i class="fas fa-heart"></i></span>
                        <span><i class="far fa-comment"></i> ${post.comments}</span>
                        <span><i class="far fa-bookmark"></i> ${post.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
