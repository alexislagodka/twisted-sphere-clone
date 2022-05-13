import { useState, useEffect, useRef } from "react";
import "./App.css";
import gsap from "gsap";
import Blobs1 from "./components/Blobs/Blobs1";
import Blobs2 from "./components/Blobs/Blobs2";
import Blobs3 from "./components/Blobs/Blobs3";

function App() {
  const [demo, setdemo] = useState(1);

  const tl = useRef();

  const renderBlobs = (param) => {
    switch (param) {
      case 1:
        return <Blobs1 />;
      case 2:
        return <Blobs2 />;
      case 3:
        return <Blobs3 />;
      default:
        return <Blobs1 />;
    }
  };

  useEffect(() => {
    article();
    let bodyclass = `demo-${demo}`;
    document.body.classList.add(bodyclass);
    return () => {
      document.body.classList.remove(bodyclass);
    };
  }, [demo]);

  const article = () => {
    // kill animation
    if (tl.current) tl.current.kill();

    // timeline
    tl.current = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
    });

    // setup
    gsap.set(".title div", { xPercent: 0 });
    gsap.set(".subtitle div", { xPercent: 0 });
    gsap.set(".menu__inner-translate", { yPercent: 0 });
    gsap.set(".play", { rotate: "0deg", scale: 1 });

    // Content clip
    const content = document.querySelector(".content span");
    const contentClip = { x: 0 };

    tl.current
      .from(".title div, .subtitle div", {
        duration: 2,
        xPercent: -100,
        // stagger: 0.1,
      })
      .from(
        ".menu__inner-translate",
        {
          duration: 1.5,
          yPercent: -100,
        },
        "-=1.5"
      )
      .to(
        contentClip,
        {
          duration: 1.5,
          x: 100,
          onUpdate: () => {
            content.style.setProperty("--clip", `${contentClip.x}%`);
          },
        },
        "-=1.25"
      )
      .from(
        ".play",
        {
          duration: 1,
          scale: 0,
          rotate: "-62deg",
        },
        "-=1.5"
      );
  };

  return (
    <div className="app">
      <main>
        <a className="logo dib" aria-label="Wave logo homepage" href="/">
          ~
        </a>
        <h2 className="page-title line line--vertical">
          <div className="dib" style={{ clip: "100%" }}>
            Creative WebGL Blobs
          </div>
        </h2>
        <nav className="demos">
          <div className="dib oh">
            <button
              className={`frame__demo ${demo === 1 && "frame__demo--current"}`}
              onClick={() => setdemo(1)}
            >
              demo 1
            </button>
          </div>
          <div className="dib oh">
            <button
              className={`frame__demo ${demo === 2 && "frame__demo--current"}`}
              onClick={() => setdemo(2)}
            >
              demo 2
            </button>
          </div>
          <div className="dib oh">
            <button
              className={`frame__demo ${demo === 3 && "frame__demo--current"}`}
              onClick={() => setdemo(3)}
            >
              demo 3
            </button>
          </div>
        </nav>
        <nav className="links line line--vertical">
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
          <div className="dib oh">
            <a
              href="https://github.com/alexislagodka/twisted-sphere-clone"
              className="dib"
            >
              GitHub react version
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
          <div>react</div>
        </div>
        <p className="content line line--horizontal">
          <span className="db" style={{ clip: "0%" }}>
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
          <div className="dib" style={{ clip: "100%" }}>
            React clone by{" "}
            <a href="https://github.com/alexislagodka/">Alexis Lagodka</a>
            &#160;of project by{" "}
            <a href="https://twitter.com/marioecg">Mario Carrillo</a>
          </div>
        </span>
        <div className="year oh">
          <div>2022</div>
        </div>
      </main>
      <div className="blobs-canvas">{renderBlobs(demo)}</div>
    </div>
  );
}

export default App;
