$(function() {
   $("#input").keyup(function(event) {
      if (event.keyCode == 13) {
         evalInput()
      }
   });
});

function evalInput() {
   var lines = $("#input").val().split('\n');
   $('#output').val('');
   $.each(lines, function(i, line) {
      $('#output').val($('#output').val() + line.toUpperCase() + '\n');
      console.log('hould be output');
   }); 
}

function getLine(lineNum) {
   var lines = $('#input').val().split('\n');
   console.log(lines);
}