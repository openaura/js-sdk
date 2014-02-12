# Aura
Module representing an Aura. An Aura is a wrapper around a
collection of particles which are grouped by their relationship
with an Anchor (basically a noun in our system, eg, Coldplay, Dark
Side of the Moon, etc.)
## Aura()

Constructor for an Aura. Takes raw JSON returned by the API. In
general, you should use one of the provided factory methods
instead of accessing the constructor directly.
### Instance methods
#### particleCount()

Accessor for the number of particles returned.

**returns** *Number*
#### anchor()

Accessor for an associated anchor.

**returns** *String*
#### nexParticleSet()

Accessor for the URI of the Aura containing the next set of
particles.

**returns** *String*
#### particles()

Accessor for the ParticleCollection containing the result set
for this Aura.

**returns** *ParticleCollection*
### Aura.fetchByOaArtistId()

Factory method for an Aura found by OpenAura artist id.

+ **param** id OpenAura artist id (int).
+ **param** cb Callback. Is passed an Aura for the artist.

**returns** *jQuery.Deffered*
### Aura.fetchAuraByMbGid

Factory method for an Aura found by Musicbrainz GID.

+ **param** id Musicbrainz GID.
+ **param** cb Callback. Is passed an Aura for the artist.

**returns** *jQuery.Deferred*
### Aura.fetchAuraByAnchorId()
Factory method for an Aura found by OpenAura anchor id.

+ **param** id OpenAura Anchor ID (12-byte hexadecimal).
+ **param** cb Callback. Is passed an Aura for the artist.

**returns** *jQuery.Deferred*
