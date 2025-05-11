import React from 'react';

const RadioStationCard = ({ station, isPlaying, onPlay }) => {
  const rinseLogo = "https://www.radio.es/300/rinsefm.png?version=8268dbe7483856e14935784819b08265";
  const junglistLogo = "https://jsradio.ipstream.cl/img/logo.png";
  const dropFmLogo = "https://i1.sndcdn.com/avatars-YBwwjMvFaVyERmaa-YJ7dkg-t1080x1080.jpg";
  const islaNegraLogo = "https://cdn-profiles.tunein.com/s329780/images/logod.png?t=638589574450000000";
  const ntsRadioLogo = "https://cdn-profiles.tunein.com/s150238/images/bannerx.jpg";
  const leMellotronLogo = "https://www.radio.es/300/lemellotron.png?version=bb3e52fc5599ee6edb27d8615f4db685";
  const novaDanceLogo = "https://www.nova.fr/wp-content/thumbnails/uploads/sites/2/2024/05/NOVA-nova-400x496-1-t-1260x1260.png";

  return (
    <div 
      className={`card text-center shadow-sm p-3 h-100 ${isPlaying ? 'border-dark bg-light' : 'border-secondary'}`}
      onClick={() => onPlay(station)}
    >
      {/* Logo de la estación */}
      <div className="d-flex justify-content-center">
        <img 
          src={station.name === "Rinse FM" ? rinseLogo : 
               station.name === "Junglist Sudaka Radio" ? junglistLogo : 
               station.name === "DropFm.com" ? dropFmLogo : 
               station.name === "Radio Isla Negra Upbeat" ? islaNegraLogo : 
               station.name === "NTS Radio" ? ntsRadioLogo : 
               station.name === "Le Mellotron" ? leMellotronLogo : 
               station.name === "Nova Dance" ? novaDanceLogo : 
               station.logo} 
          alt={station.name} 
          className="radio-logo card-img-top" 
        />
      </div>

      {/* Información de la estación */}
      <div className="card-body">
        <h5 className="card-title">{station.name}</h5>
        <p className="card-text text-muted">{station.frequency}</p>

        {/* Botón de reproducción */}
        <button className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'} mt-2`} onClick={() => onPlay(station)}>
          {isPlaying ? 'Pausar' : 'Escuchar'}
        </button>
      </div>
    </div>
  );
};

export default RadioStationCard;