COWL.enable();

var form = document.getElementById('password-form');
var checker = document.getElementById('checker');

form.addEventListener('submit', onSubmit, false);
function onSubmit(e) {
  e.preventDefault();

  var passwordEl = document.getElementById('password');
  var password = passwordEl.value;

  var freshPriv = new FreshPrivilege();
  COWL.privilege = COWL.privilege.combine(freshPriv);

  var labeledPassword = new LabeledObject({ password: password }, { confidentiality: freshPriv.asLabel });

  checker.contentWindow.postMessage(labeledPassword, '*'); // todo set to untrusted...
}

window.addEventListener('message', onMessage, false);
function onMessage(ev) {
  // from untrusted
  var passwordRank = ev.data;
  displayStrength(passwordRank);
  console.log('Rank', passwordRank);
}

function displayStrength(score) {
  var meter = document.createElement('meter');
  meter.setAttribute('max', 40);
  meter.setAttribute('optimum', 40);
  meter.setAttribute('low', 20);
  meter.setAttribute('high', 30);
  meter.value = score;

  form.appendChild(meter);
}
