# Particle

Module represnting a particle, which is the fundamental unit of
content in the OpenAura system.
## Particle()

Constructor. This takes the raw API response. Users of the SDK
should use a factory method rather than calling this directly.  
### Instance methods
#### id()
Accessor for particle id.

**returns** *String* a 12-byte hexidecimal id.
#### text()
Accessor for particle text. Can contain a caption, or in some
cases, the actual text.

**returns** *String* particle text.
#### tags()
Accessor for tags.

**returns** *Array* string tags associated with this Particle.
#### provider()
Name of the particle's provider (the service from which this
Particle was sourced).

**returns** *String* name of content provider, eg, Facebook,
Twitter, etc.
#### source()
JSON object containing information about the source of this
Particle. A source represents not just the provider of the
particle, but the specific user account, as well.

**returns** *Object* javascript object containing information
about this Particle's source.
#### artistIds()
OpenAura id for related artist.

**returns** *Number* integer artist id.
#### profane()

**returns** *boolean* true if this particle was flagged by
OpenAura's profanity filter.
#### date()
Accessor for particle date.

**returns** *String* datetime associated with this Particle.
#### media()
Accessor for this particle's MediaCollection. Multiple Media
objects here are representations of the same media. Ie, this
will contain the same image in multiple sizes, or Media which
represents a video along with an image thumb for that same
video.

**returns** *MediaCollection*
#### asObject()

**returns** *Object* a plain JS Object with a copy of the data
contained in this Particle object.
