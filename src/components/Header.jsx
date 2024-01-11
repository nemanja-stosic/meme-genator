
import trollFaceImg from "/images/troll-face.png";

export default function Header() {
  return (
    <header className="header-container">
        <div className="logo-container">
            <img src={trollFaceImg} alt="" className="troll-img"/>
            <h2 className="header-title">Meme Generator</h2>
            <h4 className="header-project">React - Project 3</h4>
        </div>
    </header>
  );
}
