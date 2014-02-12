# MediaCollection
Module representing a collection of Media objects along with
convient operations for filtering and accessing the objects.
## MediaCollection()

Constructor. This takes the raw API response. Users of the SDK
should use a factory method rather than calling this directly.
### Instance methods
#### smallerThan()

+ **param** w width in pixels
+ **param** h height in pixels

**returns** *MediaCollection* with all Media objects which are smaller than
given dimensions.
#### largerThan()

+ **param** w width in pixels
+ **param** h height in pixels

**returns** *MediaCollection* with all Media objects which are larger than
given dimensions.
#### within()

+ **param** minW minimum width in pixels
+ **param** minH minimum height in pixels
+ **param** maxW maximum width in pixels
+ **param** maxH maximum height in pixels

**returns** *MediaCollection* with all Media objects within min and max dimensions
#### length()

**returns** *Number* the number of media objects in this
MediaCollection.
#### toArray()

**returns** *Array* an array of Media objects in this
MediaCollection.
#### each()

Iterate through the MediaCollection and call fn on each Media.

+ **param** fn A callback which operates on a Media object.
#### filter()

Filter the MediaCollection using a function that takes a Media
object and returns a boolean. This will create a new
MediaCollection containing only Media objects for which this
function returned a truthy value.

+ **param** fn function that takes a Media object and returns a boolean.

**returns** *MediaCollection* new MediaCollection containing all
Media objects for which fn returned true.
#### map()

Iterate through all Media objects in this MediaCollection and
return an array containing the results of calling fn on each.

+ **param** fn function that operates on a Media Object.

**returns** *Array* array containing the results of performing fn
on each Media object in this MediaCollection.
#### first()

**returns** *Media* the first media object
#### last()

**returns** *Media* the last media object
#### tail()

**returns** *MediaCollection* a new MediaCollection containing all
the Media in this MediaCollection, excuding the first.
