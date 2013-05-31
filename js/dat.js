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
      console.log(evalLine(line));
   }); 
}

function evalLine(line) {
   var lineTokens = lex(line);
   return lineTokens;
}

var lex = function (input) {
   var tokens = [], c, i = 0;
   var advance = function() { return c = input[i + 1] };
   var addToken = function (type, value) {
      tokens.push({
         type: type,
         value: value
      });
   };
   while (i < input.length) {
      c = input[i];
      if (isWhiteSpace(c)) { advance(); };
      else if (isOperator(c)) {
         addToken('operator', c);
         advance();
      }
      else if (isDigit(c)) {
         var num = c;
         while(isDigit(advance())) num += c;
         if (c===".") {
            num += c;
            while(isDigit(advance())) num += c;
         }
         num = parseFloat(num);
         if (!isFinite(num)) throw "Number to large or small";
         addToken('number', num);
      }
      else if (isIdentifier(c)) {
         var idn = c;
         while (isIdentifier(advance())) idn += c;
         addToken('identifier', idn);
      }
      else throw 'unrecognized token.';
   }

   return tokens;
};

var isOperator = function (c) {
   return /[+\-*\/\^%=(),]/.test(c);
};

var isWhiteSpace = function (c) {
   return /\s/.test(c);
};

var isIdentifier = function (c) {
   return typeof c === "string" && !isOperator(c) 
      && !isDigit(c) && !isDigit(c);
};