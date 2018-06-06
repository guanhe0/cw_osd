/*******************
 *Copyright:Skyworth
 *Author:shibei
 *Data:2016-02-03
 *Description: It is js doucument of virtual keyboard.
 **********************/
$(function() {
	var rowLength = 4;
	var col = 0;
	var row = 0;
	var upper = false;
	var numFlag = false;
	var symbolFlag = false;

	var keysValue = [
		["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 0],
		["a", "s", "d", "f", "g", "h", "j", "k", "l", 0],
		[0, "z", "x", "c", "v", "b", "n", "m", "@", ".", 0],
		[0, 0, 0, " ", 0, "_", "-",".com"]
	];

	var numberKeys = [
		["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←"],
		["`", "|", "{", "}", "%", "^", "*", "/", "'", "return"],
		["#+=", "$", "&", "~", "#", "=", "+", "@", "(", ")", "#+="],
		[0, 0, 0, 0, 0, "!", "?", ".com", 0]
	];

	var symbolKeys = [
		["[", "]", "{", "}", "‹", "›", "^", "*", "\"", ",", "←"],
		["|", "/", "<", ">", "'", "£", "¥", "•", "€", "return"],
		[".?123", "$", "&", "~", "#", "=", "+", "@", "(", ")", ".?123"],
		[0, 0, 0, " ", 0, "!", "?", ".com"]
	];

	var keys = [];
	for (var i = 0; i < rowLength; i++) {
		keys[i] = $('#js_row' + i).children('li');
	}
	var keysLength = [];
	for (var i = 0; i < rowLength; i++) {
		keysLength[i] = keys[i].length;
	}

	var $inputBox = $("#js_inputBox");

	// $inputBox.val(keysValue[0][3]).focus();

	isSelected(row, col);

	function isSelected(selectedRow, selectedCol) {
		for (var i = 0; i < rowLength; i++) {
			keys[i].removeClass('is-selected');
		}
		keys[selectedRow].eq(selectedCol).addClass('is-selected');
	}

	// $.fn.extend({
	//        // 将光标move到文本最后
	//        moveEnd : function() {
	//            var obj = $(this)[0];
	//            var len = obj.value.length;
	//            if (document.selection) {
	//                var sel = obj.createTextRange();
	//                sel.moveStart('character', len);
	//                sel.collapse();
	//                sel.select();
	//            } else if (typeof obj.selectionStart == 'number'
	//                    && typeof obj.selectionEnd == 'number') {
	//            	console.log('len == '+len);
	//                obj.selectionStart  = obj.selectionEnd = len;
	//            	console.log("end==="+obj.selectionEnd);
	//            	console.log("start=="+obj.selectionStart);
	//            }
	//        }
	//    });


	var beforeStr = "";
	var afterStr = "";
	$(document).keydown(function(event) {
		var codeKey = event.keyCode;
		event.preventDefault();
		switch (codeKey) {
			case numKey.right:
				if (col >= (keysLength[row] - 1)) {
					col = 0;
				} else {
					col++;
				}
				isSelected(row, col)
				break;
			case numKey.left:
				if (col <= 0) {
					col = keysLength[row] - 1;
				} else {
					col--
				}
				isSelected(row, col);

				break;
			case numKey.down:
				if (row === 0) {
					if (col === (keysLength[0] - 1)) {
						col--;
					}
				} else if (row === 2) {
					if (col > 2 && col < 6) {
						col = 3;
					} else if (col >= 6) {
						col = col - 2;
					}
				} else if (row === 3) {
					if (col > 3) {
						col += 2;
					} else if (col === 3) {
						col++;
					}
				}
				if (row >= (rowLength - 1)) {
					row = 0;
				} else {
					row++;
				}

				isSelected(row, col);
				break;
			case numKey.up:
				if (row === 0) {
					if (col > 2 && col < 6) {
						col = 3;
					} else if (col >= 6) {
						col -= 2;
					}
				} else if (row === 2) {
					if (col === (keysLength[row] - 1)) {
						col--;
					}
				} else if (row === 3) {
					if (col === 3) {
						col++;
					} else if (col > 3) {
						col += 2;
					}
				}
				if (row <= 0) {
					row = (rowLength - 1);
				} else {
					row--;
				}
				isSelected(row, col);
				break;
			case numKey.enter:
				// upper and lower change
				if (((row === 2 && (col === 0 || col === (keysLength[row] - 1))) || (row === 3 && col === 1)) && !numFlag && !symbolFlag) {
					if (!upper) {
						for (var i = 0; i < (rowLength - 1); i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (i === 1 && j === 9) {
									continue;
								} else {
									keys[i].eq(j).text(keys[i].eq(j).text().toUpperCase());
								}
							}
						}
						upper = true;
						keys[3].eq(1).text("EN");
						keys[2].eq(0).addClass('is-upper');
						keys[2].eq(10).addClass('is-upper');

					} else {
						for (var i = 0; i < (rowLength - 1); i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (i === 1 && j === 9) {
									continue;
								} else {
									keys[i].eq(j).text(keys[i].eq(j).text().toLowerCase());

								}
							}
						}
						upper = false;
						keys[3].eq(1).text("en");
						keys[2].eq(0).removeClass('is-upper');
						keys[2].eq(10).removeClass('is-upper');
					}
				}
				//in the number keyboard,will show the symbol keyboard
				if ((row === 2 && (col === 0 || col === (keysLength[row] - 1)))) {
					if (!symbolFlag && numFlag) {
						for (var i = 0; i < (rowLength - 2); i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (symbolKeys[i][j]) {
									keys[i].eq(j).text(symbolKeys[i][j]);
								}
							}
						}
						symbolFlag = true;
						numFlag = false;
						keys[2].eq(0).text(".?123");
						keys[2].eq(10).text(".?123");
					} else if (symbolFlag && !numFlag) {
						for (var i = 0; i < rowLength; i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (numberKeys[i][j]) {
									keys[i].eq(j).text(numberKeys[i][j]);
								}
							}
						}
						symbolFlag = false;
						numFlag = true;

					}
				}
				//show the letter that is pressed
				if (keysValue[row][col]) {
					beforeStr = $inputBox.val();
					if (!numFlag && upper) {
						afterStr = beforeStr + keysValue[row][col].toUpperCase();
					} else if (!numFlag && !upper && !symbolFlag) {
						afterStr = beforeStr + keysValue[row][col];
					} else if (numFlag) {
						afterStr = beforeStr + numberKeys[row][col];
					} else if (symbolFlag) {
						afterStr = beforeStr + symbolKeys[row][col];
					}
					$inputBox.focus().val(afterStr);
				}
				//when delete button is pressed
				else if (row === 0 && col === (keysLength[0] - 1)) {
					beforeStr = $inputBox.val();
					afterStr = beforeStr.substr(0, beforeStr.length - 1);
					$inputBox.val(afterStr).focus();
				}
				//when enter is pressed,the text will print '\n'
				else if (row === 1 && col === 9) {
					$inputBox.val($inputBox.val() + '\n');
				}
				//when the button of ".?123" is pressed,will change to number keyboard
				else if (row === 3 && col === 2) {
					if (!numFlag && !symbolFlag) {
						for (var i = 0; i < rowLength; i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (numberKeys[i][j] || (i === 0 && j === 9)) {
									keys[i].eq(j).text(numberKeys[i][j]);
								}
							}
						}
						if (upper) {
							keys[2].eq(0).removeClass('is-upper');
							keys[2].eq(10).removeClass('is-upper');
						}
						numFlag = true;
						keys[3].eq(2).text("ABC");
					} else {
						for (var i = 0; i < rowLength; i++) {
							for (var j = 0; j < keysLength[i]; j++) {
								if (keysValue[i][j]) {
									if (!upper) {
										keys[i].eq(j).text(keysValue[i][j]);

									} else {
										if (!(i === 3 && j === 7)) {
											keys[i].eq(j).text(keysValue[i][j].toUpperCase());
										} else {
											keys[i].eq(j).text(keysValue[i][j]);
										}
									}
								}
							}
						}
						numFlag = false;
						keys[3].eq(2).text(".?123");
						keys[3].eq(3).text("space");
						keys[2].eq(0).text("↑");
						keys[2].eq(10).text("↑");
						if (symbolFlag) {
							symbolFlag = false;
						}
					}
					if (upper && !numFlag) {
						keys[2].eq(0).addClass('is-upper');
						keys[2].eq(10).addClass('is-upper');
					}

				}
				//it will hidden the virtualKeyboard
				else if(row === 3 && col === 8){
					var $keyboard = $("#js_keyboard");
					$keyboard.animate({bottom: -380}, 1000);
				}
				break;
			default:
				break;
		}
	});


});