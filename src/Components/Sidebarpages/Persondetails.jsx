// src/pages/PersonDetails/PersonDetails.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPerson } from "../../store/actions/personAction";
import { removeperson } from "../../store/reducers/personSlice";
import Loader from "../../images/Loader";
import Noimage from "../../images/Noimage.png";

function PersonDetails() {
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    dispatch(fetchPerson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (!info || !info.detail) return <Loader />;

  const person = info.detail;

  return (
    <div className="w-screen min-h-screen px-4 overflow-y-scroll md:px-[10%] bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white">
      {/* Top Navigation */}
      <nav className="w-full flex items-center justify-between py-4">
        <i
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full ri-arrow-left-line text-xl text-white cursor-pointer hover:bg-[#6556cd]"
        ></i>

        <div className="flex gap-4 text-2xl">
          {info?.externalId?.imdb_id && (
            <a
              href={`https://www.imdb.com/name/${info.externalId.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f5c518]"
              title="IMDb"
            >
              <i className="ri-film-fill"></i>
            </a>
          )}
          {person.homepage && (
            <a
              href={person.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6556cd]"
              title="Homepage"
            >
              <i className="ri-external-link-fill"></i>
            </a>
          )}
        </div>
      </nav>

      {/* Main Profile */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : Noimage
          }
          alt={person.name}
          className="w-[250px] h-[350px] object-cover rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{person.name}</h1>
          <p className="text-zinc-400 mt-2">{person.known_for_department}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {person.gender && (
              <p>
                <b>Gender:</b> {person.gender === 2 ? "Male" : "Female"}
              </p>
            )}
            {person.birthday && (
              <p>
                <b>Born:</b> {person.birthday}
              </p>
            )}
            {person.place_of_birth && (
              <p>
                <b>Place of Birth:</b> {person.place_of_birth}
              </p>
            )}
            {person.deathday && (
              <p>
                <b>Died:</b> {person.deathday}
              </p>
            )}
            <p>
              <b>Popularity:</b> {Math.floor(person.popularity)}
            </p>
          </div>
        </div>
      </div>

      {/* Biography */}
      {person.biography && (
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Biography</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {showFullBio
              ? person.biography
              : person.biography.slice(0, 400) + "..."}
          </p>
          {person.biography.length > 400 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="mt-2 text-[#6556cd] hover:underline text-sm"
            >
              {showFullBio ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      {/* Photo Gallery */}
      {info.images?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Photos</h2>
          <div className="flex gap-4 overflow-x-auto pb-3 custom-scroll">
            {info.images.slice(0, 10).map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt="Person"
                className="h-[250px] rounded-lg object-cover flex-shrink-0 hover:scale-105 transition"
                onError={(e)=>(e.target.src = {Noimage})}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filmography */}
      {info.combinedCredits?.cast?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Filmography
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {info.combinedCredits.cast.slice(0, 12).map((credit) => (
              <Link
                to={
                  credit.media_type === "movie"
                    ? `/movie/details/${credit.id}`
                    : `/tv/details/${credit.id}`
                }
                key={credit.credit_id}
                className="flex flex-col bg-white/10 rounded-lg shadow-md overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={
                    credit.poster_path
                      ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                      : Noimage
                  }
                  alt={credit.title || credit.name}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-2 text-center">
                  <p className="text-sm font-semibold line-clamp-1">
                    {credit.title || credit.name}
                  </p>
                  {credit.character && (
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      as {credit.character}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonDetails;
