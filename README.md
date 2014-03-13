# OpenAura JavaScript SDK

The OpenAura JS SDK provides simple access to the OpenAura API via a
simple JavaScript interface.

## Installation

Download the minified JS
[here](https://raw.github.com/openaura/js-sdk/deanh/artist-search/oa-all.min.js) and include
it in your HTML via a script tag.

## Usage

### Setting up your API Key

The SDK will load the OA modules into the OA variable in your global
namespace. You can access the ArtistInfo and Aura modules from within
this namespace.

To start, you'll need to initialize the client libs with your API
key. This can be done by passing your API keys to the initialize
method:

    OA.initialize({
        stream_key: "YOUR_STREAM_KEY",
        info_key: "YOUR_INFO_KEY"
    })

*Note if you have an evaluation API key, it should work for both the
 stream and info APIs.*

### Artist Info API

The Info API is designed to provide you with access to data and assets
which can be used to provide quality artist profile experiences to
your users. Artist info responses typically include the following
information about a given artist:

* Bio

* Artist Profile Image

* Style Tags

* An Artist Fact Card

* Artist "Cover" Photos (large format, landscape images which can be used as a background).

In the JS SDK, you make queries into the Artist Info API with the
ArtistInfo module. The ArtistInfo module provides three "fetch"
methods which allow you to access ArtistInfo objects via: OpenAura
artist id, Musicbrainz GID, or OpenAura anchor ID.

All fetch queries all follow the same general format. Each takes an ID
and a callback function that takes an ArtistInfo object as a
parameter, which is executed once the API returns.

Here's a simple example, using OpenAura artist id 71 (Pearl Jam):

    OA.ArtistInfo.fetchByOaArtistId(71, function (artistInfo) {
        console.log(artistInfo.name());
    });

See the reference for details on working with ArtistInfo objects.

### Stream API

Once the SDK is initialized, you can also make queries into an
artist's aura or stream using the stream API. Here we make a query
against OpenAura artist id 47 (Taylor Swift). In the callback, we grab
the PartcicleCollection from the returned Aura, and call its each()
method, printing the id of each returned particle:

    OA.Aura.fetchByOaArtistId(47, function (aura) {
        aura.particles().each(function(x) {
            console.log(x.id());
        });
    });

    5286c81576f96fcc3100054c
    5286c81576f96fcc31000551
    5293c7a776f96f73ce000301
    52b0e6a0aea68d506c01d1c0
    52b0e6a0aea68d506c01d1cc
    52b0e6a0aea68d506c01d1d0
    52b0e6a1aea68d506c01d1d6
    52cda30aaea68d23720014a1
    52cda30aaea68d23720014a5
    52cf1bc8aea68dca30059505

In this next example, we use make the same query, but in this case, we
use the ParticleCollection's filterByProvider method to only return
those particles which origined from the artist's Twitter account:

    OA.Aura.fetchByOaArtistId(47, function (a) {
        a.particles().filterByProvider("twitter").each(function(x) {
            console.log(x.id());
        });
    });

    52cda30aaea68d23720014a1
    52cda30aaea68d23720014a5
    52cf1bc8aea68dca30059505 

In this last example, we use the ParticleCollection's withMediaWithin
method to only return particle which have media (most likely video or
images) within a certain range of pixel sizes. In this case, we're
filtering for particles that have media objects which are at least 0x0
pixels, and at most 1000x3000 pixels:

    OA.Aura.fetchByOaArtistId(47, function (a) {
        a.particles().withMediaWithin(0, 0, 1000, 3000).each(function(x) {
            console.log(x.id());
        });
    });

    5286c81576f96fcc3100054c
    5286c81576f96fcc31000551
    5293c7a776f96f73ce000301
    52cda30aaea68d23720014a1

## Building

This project has the following setup:

* www/ - the web assets for the project
    * app.js - the top-level config script used by index.html
    * app/ - the directory to store project-specific scripts.
    * lib/ - the directory to hold third party scripts.
* tools/ - the build tools to optimize the project.

To build, run:

    node tools/r.js -o tools/build.js && cp www-built/app/all.js oa-all.min.js

That build command creates minified version of the project in a
**www-built** directory. The app/all.js file will be optimized to
include all of its dependencies, and is copied to the main dir for
distribution.

The example-all.html file in the main directory loads the minified
file, so you can expeiment with it in your browser console.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html
