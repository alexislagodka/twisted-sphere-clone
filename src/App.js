import "./App.css";
import Blobs from "./components/Blobs/Blobs";

function App() {
  
  return (
    <div className="app">
      <main>
        <a className="logo dib" aria-label="Wave logo homepage" href="/">
          ~
        </a>
        <h2 className="page-title line line--vertical">
          <div className="dib" style={{clip:"100%"}}>
            Creative WebGL Blobs
          </div>
        </h2>
        <nav className="demos">
          <div className="dib oh">
            <a href="/index.html" className="frame__demo frame__demo--current">
              demo 1
            </a>
          </div>
          <div className="dib oh">
            <a href="/index2.html" className="frame__demo">
              demo 2
            </a>
          </div>
          <div className="dib oh">
            <a href="/index3.html" className="frame__demo">
              demo 3
            </a>
          </div>
        </nav>
        <nav className="links line line--vertical">
          <div className="dib oh">
            <a
              href="https://tympanus.net/Development/OnScrollLetterAnimations/"
              className="dib"
            >
              Previous demo
            </a>
          </div>
          <div className="dib oh">
            <a href="https://tympanus.net/codrops/?p=52932" className="dib">
              Article
            </a>
          </div>
          <div className="dib oh">
            <a href="https://github.com/codrops/WebGLBlobs" className="dib">
              GitHub
            </a>
          </div>
        </nav>
        <div className="menu line line--vertical">
          <div className="menu__inner">
            <div className="oh">
              <div className="menu__inner-translate">Menu</div>
            </div>
          </div>
        </div>
        <h1 className="title line line--horizontal oh">
          <div>Insomnia</div>
        </h1>
        <div className="subtitle oh">
          <div>made with react</div>
        </div>
        <p className="content line line--horizontal">
          <span className="db" style={{clip:"0%"}}>
            The main reliance, however, in the Emmanuel treatment is on faith,
            reinforced first by hetero-suggestion and then by patient and
            persistent auto-suggestion. The man who would be permanently free
            from insomnia must be an optimist. He must have a philosophy of life
            wholesome enough to keep him buoyant, cheerful, and serene amid all
            the changes and the chances of this mortal life.
          </span>
        </p>
        <span className="play dib" aria-label="Play">
          &#9658;
        </span>
        <a
          className="credits credits--site line line--vertical"
          href="https://twitter.com/codrops"
        >
          <div className="credits--site-inner oh">
            <div>@codrops</div>
          </div>
        </a>
        <span className="credits credits--author line line--horizontal">
          <div className="dib" style={{clip:"100%"}}>
            React clone by <a href="https://github.com/alexislagodka/">Alexis Lagodka</a>
            &#160;of project by <a href="https://twitter.com/marioecg">Mario Carrillo</a>
          </div>
        </span>
        <div className="year oh">
          <div>2022</div>
        </div>
      </main>
      <div className="blobs-canvas">
        <Blobs />
      </div>
    </div>
  );
}

export default App;
