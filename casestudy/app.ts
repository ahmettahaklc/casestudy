interface Post {
  id: number;
  title: string;
  content: string;
}

let posts: Post[] = [];

const postForm = document.getElementById("postForm") as HTMLFormElement;
const postList = document.getElementById("postList") as HTMLUListElement;

postForm.addEventListener("submit", function(event: Event) {
  event.preventDefault();

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const contentInput = document.getElementById("content") as HTMLInputElement;

  const title = titleInput.value;
  const content = contentInput.value;

  const newPost: Post = {
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

postList.addEventListener("click", function(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.classList.contains("deleteButton")) {
    const postId = target.getAttribute("data-id");
    if (postId) {
      deletePost(parseInt(postId));
    }
  }
});

function deletePost(postId: number) {
  posts = posts.filter(post => post.id !== postId);
  const listItem = (event!.target as HTMLElement).parentNode as HTMLElement;
  if (listItem.parentNode) {
    listItem.parentNode.removeChild(listItem);
  }
}
