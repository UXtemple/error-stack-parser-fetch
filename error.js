var ErrorStackParser = require('error-stack-parser');

console.log('Showing that ErrorStackParser works', ErrorStackParser.parse(Error('boom')));

console.log('about to fetch');
fetch('/doesnt-exist-or-has-bad-json-it-doesnt-matter.json')
  .then(function(res) {
    // throw native error
    return res.json();
  })
  .catch(function(err) {
    console.log('fetch failed, ErrorStackParser fails to parse its error');
    console.log('raw error', err);
    try {
      console.log('ErrorStackParser.parse(err) (fails and doesnt render this)', ErrorStackParser.parse(err));
    } catch(theErr) {
      console.log('ErrorStackParser.parse(err) failed, heres its error', ErrorStackParser.parse(theErr));
    }
    var wrappedErr = Error(err.message);
    console.log('This is the wrappedErr', wrappedErr);
    console.log('ErrorStackParser.parse(Error(err)) works if we wrap the native error in Error', ErrorStackParser.parse(wrappedErr));
  });
