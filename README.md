//simple version

respond to webhook generate link for placement test
put link in podio item field
respond to webhook grade placement test
update item field to reflect recommended class
respond to webhook generate link to pre-pop sign up form
from sign-up onwards workflow remains unchanged


//cool version

respond to webhook generate link for placement test
use ufhash to generate secure shortcode
express server listens for url w/shortcode and brings up test
respond to webhook grade placement test
respond to webhook generate sign-up link

## How to test

ngrok.io

```
curl -X POST http://dab799d2.ngrok.io/placement -d '92'
```         [current ngrok link]/placement
curl -X POST http://dab799d2.ngrok.io/signup -d '1'

# Development flow

* Edit one focused change at a time
* Test for regression (the stuff that was working is still working)
* git status (consider excluding in .gitignore for files we don't want to commit)
* git diff
* git add . (if new files)
* git commit -m "reasonable explanation of the change"

