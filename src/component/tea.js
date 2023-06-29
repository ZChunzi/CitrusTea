var buttons = document.getElementsByTagName('button');
    
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  var clickFunction = button.getAttribute('@click');
  
  if (clickFunction) {
    button.addEventListener('click', function() {
      eval(clickFunction);
    });
  }
}