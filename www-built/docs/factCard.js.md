# FactCard

Module representing an artist fact card. This is returned in as
part of an ArtistInfo object.
## FactCard()

Constructor. This takes the raw API response. Users of the SDK
should use a factory method rather than calling this directly.
### Instance methods
#### birthdate()
Accessor for artist birthdate if available.

**returns** *String*
#### birthname()
Accessor for artist birthname if available.

**returns** *String*
#### birthplace()
Accessor for artist birthplace if available.

**returns** *String*
#### locationFormed()
Accessor for the city/state/country where the band was formed
if available.

**returns** *String*
#### members()
Accessor for band members if available. Returned as an array of
objects with member names and information about when they where
in the band, if available.

**returns** *Array*
#### labels()
Accessor for labels for which the artist has released records.

**returns** *Array*
#### associatedActs()
Accessor for related artists.

**returns** *Array*
#### website()
Accessor for artist website.

**returns** *String*
