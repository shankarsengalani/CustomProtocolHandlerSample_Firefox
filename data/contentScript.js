var jsctypeBut = document.getElementById('jsctypesBut');
var a_ = document.getElementById('a_');
var b_ = document.getElementById('b_');
var jsctypesResult = document.getElementById('jsctypesResult');

jsctypeBut.addEventListener('click', function () {
  self.port.emit('jsctypes', {
    name: jsctypeBut.getAttribute('name'),
    a : a_.value,
    b : b_.value
  });
});

self.port.on('jsctypesResult', function(data) {
  jsctypesResult.innerHTML = data;
});