const stations = [
  {
    id: 1,
    name: 'Rinse FM',
    frequency: '88.5 FM',
    cover:
      'https://www.radio.es/300/rinsefm.png?version=8268dbe7483856e14935784819b08265',
    url: 'https://admin.stream.rinse.fm/proxy/rinse_uk/stream',
    description:
      'Una estación de radio icónica con lo mejor de la música electrónica y urbana.',
  },
  {
    id: 3,
    name: 'Nova Dance',
    frequency: '95.7 FM',
    cover:
      'https://www.nova.fr/wp-content/thumbnails/uploads/sites/2/2024/05/NOVA-nova-400x496-1-t-1260x1260.png',
    url: 'https://nova-dance.ice.infomaniak.ch/nova-dance-128.mp3',
    description:
      'La mejor selección de música dance para mantenerte en movimiento.',
  },
  {
    id: 4,
    name: 'DropFm.com',
    frequency: 'Online',
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/f6/84/e9/f684e970-3f93-a24c-3edc-2cd7b6200585/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/230x0w.webp',
    url: 'https://s2.radio.co/s7649837db/listen',
    description: 'Tu dosis diaria de los últimos éxitos y clásicos del género.',
  },
  {
    id: 5,
    name: 'Radio Isla Negra Upbeat',
    frequency: '102.5 FM',
    cover:
      'https://cdn-profiles.tunein.com/s329780/images/logod.png?t=638589574450000000',
    url: 'https://radioislanegra.org/listen/up/stream',
    description: 'Ritmos alegres y vibrantes para energizar tu día.',
  },
  {
    id: 6,
    name: 'NTS Radio',
    frequency: '103.3 FM',
    cover: 'https://cdn-profiles.tunein.com/s150238/images/bannerx.jpg',
    url: 'https://stream-relay-geo.ntslive.net/stream?client=NTSWebApp&t=1714415043815',
    description:
      'Explora una amplia gama de géneros musicales con DJs de todo el mundo.',
  },
  {
    id: 7,
    name: 'Le Mellotron',
    frequency: '104.7 FM',
    cover:
      'https://www.radio.es/300/lemellotron.png?version=bb3e52fc5599ee6edb27d8615f4db685',
    url: 'https://listen.radioking.com/radio/477719/stream/534044',
    description: 'Desde París, una mezcla ecléctica de soul, jazz, funk y más.',
  },
  {
    id: 8,
    name: 'RINSE FM FRANCE',
    frequency: '101.30 FM',
    cover:
      'https://www.radio.es/300/rinsefm.png?version=8268dbe7483856e14935784819b08265',
    url: 'https://radio10.pro-fhi.net/flux-trmqtiat/stream',
    description:
      'La versión francesa de Rinse FM, con lo mejor de la escena underground.',
  },
  {
    id: 9,
    name: 'Capital Xtra',
    frequency: '105.1 FM',
    cover:
      'https://cdn.instant.audio/images/logos/internetradiouk-com/choice-london.png',
    url: 'https://media-ice.musicradio.com/CapitalXTRALondonMP3',
    description: 'Los éxitos más grandes del hip-hop, R&B y grime.',
  },
  {
    id: 10,
    name: 'Groove Salad Classic',
    frequency: 'Online',
    cover: 'https://api.somafm.com/logos/256/gsclassic256.jpg',
    url: 'https://ice6.somafm.com/gsclassic-128-aac',
    description: 'Relájate con una mezcla suave de downtempo y chillout.',
  },
  {
    id: 11,
    name: 'Underground 80s',
    frequency: 'Online',
    cover: 'https://api.somafm.com/logos/256/u80s256.png',
    url: 'https://ice6.somafm.com/u80s-128-aac',
    description: 'Early 80s UK Synthpop and a bit of New Wave.',
  },
  {
    id: 12,
    name: 'PopTron',
    frequency: 'Online',
    cover: 'https://somafm.com/logos/120/poptron120.jpg',
    url: 'https://ice3.somafm.com/poptron-128-aac',
    description: 'Electropop y indie dance rock con brillo y pop.',
  },
  {
    id: 13,
    name: 'The In-Sound From Way Out',
    frequency: 'Online',
    cover: 'https://api.somafm.com/logos/256/insound-256.jpg',
    url: 'https://ice1.somafm.com/insound-128-aac',
    description:
      'Pop europeo hipster de los años 60 y 70, donde las melodías\npsicodélicas se combinan con vibraciones maravillosas.',
  },
  {
    id: 14,
    name: 'Mouthfull Radio',
    frequency: 'Online',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZgvMIX3RToaZWvw7kfV9Drk7l2kTvoegG8A&s',
    url: 'https://mouthfull-radio.radiocult.fm/stream',
    description:
      'Música espacial y ambiental para una experiencia auditiva fuera de este mundo.',
  },
    {
    id: 15,
    name: 'FluxFM Chillhop',
    frequency: 'Online',
    cover: 'https://www.radio.es/300/fluxfmchillhop.jpeg?version=3058137aaaeedf95e04d0c2ae097520e',
    url: 'https://fluxfm.streamabc.net/flx-chillhop-aacplus-64-8724785?sABC=68pp4p7p%230%236pps2942835o6n7qp247p24o83046042%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1758219388',
    description: 'Relajante música chillhop de FluxFM.'
  },
  {
    id: 16,
    name: 'KoolFm',
    frequency: 'Online',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Kool_FM_London_logo.png/250px-Kool_FM_London_logo.png',
    url: 'https://admin.stream.rinse.fm/proxy/rinse_uk/stream',
    description: 'Una estación de radio icónica con lo mejor de la música electrónica y urbana. en vivo desde London UK.'
  }
];

export default stations;
