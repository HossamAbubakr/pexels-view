import { Location, useLocation, useParams } from "react-router";
import { Photo } from "../../types/types";
import { useEffect, useState } from "react";
import fetchPhotoById from "../../services/fetchPhotoById";
import { useNavigate } from "react-router";
import "./PhotoDetails.scss";

const PhotoDetails = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<boolean>(false);
  const location: Location<Photo> = useLocation();
  const { photoId } = useParams();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      const fetchPhoto = async (photoId: number) => {
        const resultPhoto = await fetchPhotoById(photoId);
        if (resultPhoto) {
          setPhoto(resultPhoto);
        } else {
          setError(true);
        }
      };
      if (photoId) {
        fetchPhoto(Number(photoId));
      }
    } else {
      setPhoto(state);
    }
  }, [state, photoId]);

  function handleNavigate() {
    if (state) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>404 - Photo Not Found</h1>
        <p>The requested photo could not be found.</p>
        <button className="backButton" onClick={handleNavigate}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {photo ? (
        <section className={"section"}>
          <button className={"backButton"} onClick={handleNavigate}>
            {state ? "Back" : "Go Home"}
          </button>
          <h1 className={"title"}>{photo.photographer}</h1>
          <ul className={"infoList"}>
            <li>ID: {photo.id}</li>
            <li>Width: {photo.width}</li>
            <li>Height: {photo.height}</li>
            <li>
              URL:
              <a href={photo.url} target="_blank" rel="noopener noreferrer">
                {photo.url}
              </a>
            </li>
          </ul>
          <img className={"photo"} src={photo.src.large} alt={photo.alt} />
        </section>
      ) : (
        <section>Loading...</section>
      )}
    </div>
  );
};

export default PhotoDetails;
