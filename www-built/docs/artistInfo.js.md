# ArtistInfo

Module representing a collection of Particle objects along with
convient operations for filtering and accessing the objects.
## ArtistInfo()

Constructor. This takes the raw API response. Users of the SDK
should use a factory method rather than calling this directly.
### Instance Methods 
#### oaArtistId()

Accessor for oa_artist_id

**returns** *Number*
#### name()
Accessor for artist name

**returns** *String*
#### bio()
Accessor for artist bio

**returns** *Particle*
#### coverPhotos()
Accessor for artist cover photos

**returns** *ParticleCollection*
#### factCard()
Accessor for artist fact card

**returns** *Particle*
#### profilePhoto()
Accessor for artist profile photo

**returns** *Particle*
#### styleTags()
Accessor for artist style tags

**returns** *Particle*
#### asObject()
copy the data into an object for convenience

**returns** *Object*
### ArtistInfo.fetchByOaArtistId()

Factory method which constructs an instance for an OpenAura
artist id and passes it to the given callback

+ **param** id OpenAura artist id (int).
+ **param** cb Callback. Is passed an AristInfo for the artist

**returns** *jQuery.Deferred*
returns a jQuery.Deferred
### ArtistInfo.fetchByMbGid()

Factory method which constructs an instance for a given Musicbrainz GID
and passes it to the given callback

+ **param** id Musicbrainz GID.
+ **param** cb Callback. Is passed an AristInfo for the artist

**returns** *jQuery.Deferred*
### ArtistInfo.fetchByAnchorId()

Factory method which constructs an instance for a given OpenAura anchor id
and passes it to the given callback

+ **param** id OpenAura Anchor ID (12-byte hexadecimal).
+ **param** cb Callback. Is passed an AristInfo for the artist

**returns** *jQuery.Deferred*
