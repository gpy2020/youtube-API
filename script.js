const key = "AIzaSyAiNIHNe06ioSCZZt8z77Ao770oUaXaPNE";
const root = document.getElementsByTagName("body")[0];
root.setAttribute("class", "root");

const container = document.createElement("div");
container.setAttribute("class", "container");

const searchField = document.createElement("input");
searchField.setAttribute("onchange", "handleInput()");
searchField.setAttribute("class", "searchField");

function clearSnippets() {
  const snippet = document.getElementsByClassName("snippetContainer")[0];
  if (snippet) {
    container.removeChild(snippet);
  }
}

function setSnippet(data) {
  const snippetContainer = document.createElement("div");
  snippetContainer.setAttribute("class", "snippetContainer");

  const image = document.createElement("img");
  image.setAttribute("class", "snippetImage");
  image.setAttribute("src", data.snippet.thumbnails.high.url);

  const title = document.createElement("h3");
  const titleText = document.createTextNode(data.snippet.title);
  title.setAttribute("class", "snippetTitle");

  title.appendChild(titleText);

  const description = document.createElement("p");
  const descriptionText = document.createTextNode(data.snippet.description);
  description.setAttribute("class", "snippetDescription");

  description.appendChild(descriptionText);

  snippetContainer.appendChild(image);
  snippetContainer.appendChild(title);
  snippetContainer.appendChild(description);

  container.appendChild(snippetContainer);
}

function handleInput() {
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${
        searchField.value
      }&key=${key}`
    )
    .then(res => {
      for (let i = 0; i < 5; i++) {
        clearSnippets();
      }
      console.log(res.data.items);
      res.data.items.forEach(element => {
        setSnippet(element);
      });
      // setSnippet(res.data.items[0]);
    })
    .catch(err => console.log(err));
}

container.appendChild(searchField);

root.appendChild(container);
