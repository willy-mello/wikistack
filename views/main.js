const html = require("html-template-tag");
const layout = require("./layout");


module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">  
    <ul>
    ${pages.map(elem=>html`
      <li>
        <a href= localhost:1337/wiki/${elem.slug}>${elem.title} by STEVEN</a>
      </li>`
      )}
    </ul>
  </ul>`);