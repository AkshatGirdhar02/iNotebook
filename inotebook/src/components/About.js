import React from "react";

export const About = () => {
  // const a = useContext(noteContext);
  // useEffect(() =>{
  //   a.update();
  //   // eslint-disable-next-line
  // },[])
  return (
    <div className="container">
      <div className="my-4">
        <h1>Welcome to iNotebook</h1>
        <p className="lead">
          <i>Your Personal Note-Taking Companion</i>
        </p>
        <p>
          At iNotebook, we're dedicated to help you organize your thoughts,
          ideas, and important notes with ease. Whether you're a student,
          professional, or creative thinker, our user-friendly platform is here
          to simplify your note-taking experience.
        </p>
        <p>
          <strong>Key Features:</strong>
        </p>
        <ul>
          <li>Effortlessly create, edit, and delete notes.</li>
          <li>Organize your notes with tags.</li>
          <li>Sync your notes across devices for easy access.</li>
          <li>Enjoy a distraction-free writing environment.</li>
          <li>Keep your notes secure with our built-in encryption.</li>
        </ul>
        <p>
          We're passionate about helping you stay organized, focused, and
          creative. Let iNotebook be your trusted companion for all your
          note-taking needs.
        </p>
        <p>
          <strong>
            Join our community of note-takers today and discover the joy of
            organizing your ideas with iNotebook!
          </strong>
        </p>
      </div>
    </div>
  );
};
