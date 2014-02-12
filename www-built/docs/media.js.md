# Media()
Module representing Media returned with a Particle. Media can
represent text, JSON data, or, most commonly, a URI for an image or
other consumable media.
## Media()

Constructor. This takes the raw API response. Users of the SDK
should use a factory method rather than calling this directly.
### Instance methods
#### id()
Accessor for media id.

**returns** *Strings* a 12-byte hexidecimal id.
#### mediaType()
Accessor for media type.

**returns** *String* image, video, embed, audio, json, text
#### url()
Accessor for media URL.

**returns** *String* URI for media.
#### width()
Accessor for width.
**returns** *Number* width of media in pixels.
#### height()
Accessor for height.

**returns** *Number* height of media in pixels.
#### mimeType()
Accessor for mime type.

**returns** *String* mime type of associated media.
#### data()
Accessor for JSON data.

**returns** *Object* a JSON object with data represented as key
value pairs.
#### asObject()

**returns** *Object* a plain JS Object with a copy of the data
contained in this Media object.
