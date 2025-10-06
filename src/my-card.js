import { LitElement, html, css } from 'lit';
import "@haxtheweb/meme-maker/meme-maker.js";

export class MyCard extends LitElement {
  static get tag() { return 'my-card'; }
  static get styles() { return css`:host{display:block}`; }
  render() {
    return html`
      <meme-maker
        image-url="https://imgs.xkcd.com/comics/dependency.png"
        top-text="Importing memes"
        bottom-text="Like a modern dev"
      ></meme-maker>
    `;
  }
}
customElements.define(MyCard.tag, MyCard);
