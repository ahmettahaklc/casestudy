let posts = [];

const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

postForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const title = titleInput.value;
  const content = contentInput.value;

  const newPost = {
    id: Date.now(),
    title: title,
    content: content
  };

  posts.push(newPost);

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <h3>${newPost.title}</h3>
    <p class="newpostcontent">${newPost.content}</p>
    <button class="deleteButton" data-id="${newPost.id}">Delete</button>
  `;
  postList.appendChild(listItem);

  titleInput.value = "";
  contentInput.value = "";
});

postList.addEventListener("click", function(event) {
  if (event.target.classList.contains("deleteButton")) {
    const postId = event.target.getAttribute("data-id");
    deletePost(postId);
  }
});

function deletePost(postId) {
  posts = posts.filter(post => post.id !== parseInt(postId));
  const listItem = event.target.parentNode;
  postList.removeChild(listItem);
}
