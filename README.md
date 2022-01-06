# babel-plugin-rewire-proxy

This started as a fork of [babel-plugin-rewire-exports](asapach/babel-plugin-rewire-exports) but is now trending towards being a re-implementation of [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) that uses ES6 proxies instead of rewriting all identifier lookups.  We'll see how it goes.

Why not just use `rewire-exports`?  If you can, you should use `rewire-exports` it's great.  However, it can't do some things that `babel-plugin-rewire` can do, and it has a quite different API.  If you're looking for a drop-in replacement for `babel-plugin-rewire`, that mangles your code less and is perhaps a bit lighter weight, this might be it, eventually. 

Honestly though, you may wish to rethink using either of these.  I tend to agree with [@thekashey](https://dev.to/thekashey/please-stop-playing-with-proxyquire-11j4) that these sorts of tools are fun toys to play with, but not fit for responsible use.


*TOTALLY EXPERIMENTAL AND NOT FIT FOR USE AT THIS POINT*

