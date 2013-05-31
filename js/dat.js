$(function() {
   $("#input").keyup(function(event) {
      if (event.keyCode == 13) {
         evalInput();
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
   var advance = function() { return c = input[++i]; };
   var addToken = function (type, value) {
      console.log("added : " + value);
      tokens.push({
         type: type,
         value: value
      });
   };
   while (i < input.length) {
      console.log("observing : " + i);
      c = input[i];
      console.log(c);
      if (isWhiteSpace(c)) { /*ignore*/ }
      else if (isOperator(c)) {
         addToken('operator', c);
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
      advance();
   }

   return tokens;
};

var isOperator = function (c) {
   return /[+\-*\/\^%=(),]/.test(c);
};

var isDigit = function (c) {
   return /[0-9]/.test(c);
}

var isWhiteSpace = function (c) {
   return /\s/.test(c);
};

var isIdentifier = function (c) {
   return typeof c === "string" && !isOperator(c) 
      && !isDigit(c) && !isDigit(c);
};
