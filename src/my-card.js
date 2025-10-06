import { LitElement, html, css } from 'lit';
import "@haxtheweb/meme-maker/meme-maker.js";

export class MemeCard extends LitElement {
  static get tag() { return 'meme-card'; }

  static get properties() {
    return {
      image: { type: String },
      top: { type: String },
      bottom: { type: String },
    };
  }

  constructor() {
    super();
    this.image = "https://imgs.xkcd.com/comics/dependency.png";
    this.top = "Importing memes";
    this.bottom = "Like a modern dev";
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 2px 18px #0002;
      }
      .wrap {
        padding: 10px;
        width: 360px;
      }
      h3 {
        font: 700 1.1rem/1.2 system-ui, Arial, sans-serif;
        margin: 6px 0 0 0;
        color: #0b1c5b;
      }
      p {
        margin: 6px 0 0;
        color: #334155;
      }
      meme-maker { display: block; }
    `;
  }

  render() {
    return html`
      <div class="wrap">
        <meme-maker
          image-url="${this.image}"
          top-text="${this.top}"
          bottom-text="${this.bottom}"
        ></meme-maker>
        <h3>${this.top}</h3>
        <p>${this.bottom}</p>
      </div>
    `;
  }
}

customElements.define(MemeCard.tag, MemeCard);
