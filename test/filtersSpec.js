var filters = require('../');
var assert = require('assert');

describe('filters', function(){
  it('blacklist', function(done) {
    var foo = filters.blacklist(['bar', 'baz']);
    foo({boom: 'boom', bar: 'bar', baz: 'baz'}, function(doc){
      assert.ok(doc.boom, 'should not remove boom');
      assert.ok(!doc.bar, 'should remove bar');
      assert.ok(!doc.baz, 'should remove baz');
      done();
    });
  });
  it('whitelist', function(done){
    var foo = filters.whitelist(['gold', 'silver']);
    foo({foo: 'bar', gold: true, silver: true}, function(doc){
      assert.ok(doc.gold, 'should leave gold');
      assert.ok(doc.silver, 'should leave silver');
      assert.ok(!doc.foo, 'should remove foo');
      done();
    });
  });
  it('include', function(done){
    var foo = filters.include('docType','foo');
    foo({}, function(doc){
      assert.ok(doc.docType === 'foo', 'should add docType');
      done();
    });
  });
  it('sanitize', function(done){
    var foo = filters.sanitize('comments');
    foo({comments: '<script>foo</script>Bar'}, function(doc) {
      assert.ok(doc.comments === 'foo Bar', 'should be sanitized.');
      done();
    });
  });
});