## Javascript-lcs

String comparison in Javascript. This Javascript library uses longest string subsequence algorithm to do string comparison.

#### Clone with git:

    git clone git://github.com/sp4ce/javascript-lcs
    cd javascript-lcs

#### Code sample:

    <!-- Include the library in your html source -->
    <script type="text/javascript" src="javascript-lcs.js"></script>

    // Call the comparison and get the result matrix.
    var result = lcs.compare(reference, input);

    // Run throught the result and read the result
    lcs.run(result, 0, 0, function(i, j) {
      if (result[i][j].status == lcs.DELETION) {
        console.log('Missing a caracter at index ' + j + '.');
      } else if (result[i][j].status == lcs.INSERTION) {
        console.log('Extra caracter at index ' + j + '.');
      }
    });

#### Example:

Open `example.html` in your browser, enter a string in reference and input fields and press `ok`button. It will display the matrix and highlight in red the path followed by the algorithm and display the detected errors. 

![Example](https://github.com/sp4ce/javascript-lcs/raw/master/example.png)

## License

Apache 2.0
