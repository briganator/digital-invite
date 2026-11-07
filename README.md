# Digital Invite
Run locally: `python3 -m http.server 8765` here, open http://localhost:8765
Live: https://briganator.github.io/digital-invite/

## config.json
names, monogram (shown on card footer; seal art has "AO" baked in), tagline, dateDisplay, startISO/endISO (calendar + countdown), venue{name,address,mapUrl}, schedule[], rsvp{email,deadline}
- theme: blush | sage | navy | ivory
- sealColor: burgundy | blush | gold | sage | navy | black
- particles: gold | petals | none
- countdown: true/false
- music: URL to an mp3 you have rights to (blank hides the button); musicAutoOnOpen: fades in when the seal is opened

## URL params
- `?to=Guest%20Name` personalizes envelope ("For …"), greeting, and pre-fills RSVP name
- `?theme=sage&seal=gold` preview overrides
