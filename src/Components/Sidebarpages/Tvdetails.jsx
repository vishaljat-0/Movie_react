// src/pages/Tvdetails/Tvdetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removetv } from "../../store/reducers/tvSlice";
import { fetchTv } from "../../store/actions/tvaction";   // ✅ use fetchTv
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../images/Loader";
import Noimage from "../../images/Noimage.png";

function Tvdetails() {
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTv(id));   // ✅ fetch full TV data from API
    return () => {
      dispatch(removetv());  // ✅ clear data when unmount
    };
  }, [dispatch, id]);

  if (!info || !info.detail) return <Loader />;

  return (
    <div className="w-screen min-h-screen px-4 overflow-y-scroll md:px-[10%] bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white">
      {/* Top Navigation */}
      <nav className="w-full flex items-center justify-between py-4">
        <i
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full ri-arrow-left-line text-xl text-white cursor-pointer hover:bg-[#6556cd]"
        ></i>

        <div className="flex gap-4 text-2xl">
          {info?.externalId?.wikidata_id && (
            <a
              href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6556cd]"
              title="Wikipedia"
            >
              <i className="ri-global-fill"></i>
            </a>
          )}
          {info?.externalId?.id && (
            <a
              href={`https://www.themoviedb.org/tv/${info.externalId.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6556cd]"
              title="TMDb"
            >
              <i className="ri-links-fill"></i>
            </a>
          )}
          {info?.externalId?.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#6556cd]"
              title="IMDb"
            >
              <i className="ri-film-fill"></i>
              <span className="hidden sm:inline text-sm">IMDb</span>
            </a>
          )}
        </div>
      </nav>

      {/* Backdrop Section */}
      {info.detail?.backdrop_path && (
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden my-7 rounded-lg shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`}
            alt={info.detail.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-[#000000aa] to-transparent z-10"></div>
          <div className="absolute z-20 bottom-6 md:bottom-12 left-6 md:left-12">
            <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
              {info.detail.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-lg line-clamp-3 drop-shadow">
              {info.detail.overview}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm md:text-base">
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                ⭐ {info.detail.vote_average?.toFixed(1) || "N/A"} / 10
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                🔥 Popularity: {Math.floor(info.detail.popularity) || "N/A"}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                📺 Seasons: {info.detail.number_of_seasons}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                🎬 Episodes: {info.detail.number_of_episodes}
              </span>
              {info.detail.episode_run_time?.length > 0 && (
                <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  ⏱ Avg Runtime: {info.detail.episode_run_time[0]} min
                </span>
              )}
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                🌍 Language: {info.detail.original_language?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Genres */}
      <div className="mt-6 flex flex-wrap gap-2">
        {info.detail.genres?.map((genre) => (
          <span
            key={genre.id}
            className="px-3 py-1 rounded-full bg-[#6556cd]/30 text-xs md:text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      {/* Cast Section */}
      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Top Cast</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {info.credits?.cast?.slice(0, 12).map((actor) => (
            <Link
              to={`/person/details/${actor.id}`}
              key={actor.id}
              className="flex flex-col items-center text-center bg-white/10 p-3 rounded-xl shadow hover:scale-105 transition"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : Noimage
                }
                alt={actor.name}
                className="w-full h-[200px] object-cover rounded-md mb-2"
              />
              <p className="text-sm font-medium line-clamp-1">{actor.name}</p>
              <p className="text-xs text-zinc-400 line-clamp-1">
                {actor.character}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Trailer Section */}
      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Trailer</h2>
        <div className="w-full bg-white/10 border border-white/10 rounded-xl shadow-lg overflow-hidden">
          {info.videos?.key ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${info.videos.key}?rel=0`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-zinc-400 py-6 italic">
              No trailer available
            </p>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Recommendations</h2>
        {(info.recommendations?.length > 0 || info.similar?.length > 0) ? (
          <div
            className="flex gap-5 overflow-x-auto pb-2 custom-scroll"
            onWheel={(e) => {
              const el = e.currentTarget;
              if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollBy({ left: e.deltaY + 20, behavior: "smooth" });
              }
            }}
          >
            {(info.recommendations?.length > 0
              ? info.recommendations
              : info.similar
            )
              .slice(0, 12)
              .map((show, index) => (
                <Link
                  to={`/tv/details/${show.id}`}
                  key={index}
                  className="min-w-[150px] max-w-[150px] flex-shrink-0 bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-[220px] overflow-hidden relative">
                    <img
                      src={
                        show.poster_path
                          ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                          : Noimage
                      }
                      alt={show.name}
                      className="w-full h-full object-cover hover:opacity-80 transition"
                    />
                    <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-2 text-white text-xs font-semibold text-center line-clamp-2">
                    {show.name}
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 italic">
            No recommendations available
          </p>
        )}
      </div>
    </div>
  );
}

export default Tvdetails;
