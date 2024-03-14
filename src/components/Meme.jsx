import { useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  /*
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  useEffect(() => {
    async function getMemesAPI() {
      const result =  await fetch("https://api.imgflip.com/get_memes");
      const data = await result.json();
      setAllMemes(data.data.memes);
    }

    getMemesAPI();
  }, []);

  function handleGetMemeImage() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  console.log(meme);

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Shut up"
          value={meme.topText}
          onChange={handleChange}
          name="topText"
        />
        <input
          type="text"
          placeholder="and take my money"
          value={meme.bottomText}
          onChange={handleChange}
          name="bottomText"
        />

        <button className="form-button" onClick={handleGetMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
