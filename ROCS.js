function bodyOnLoad(){

	encryptButton.onclick=encryptMessage;
	decryptButton.onclick=decryptMessage;

	closeID.onclick = closeModal;

	window.onclick = function(event) {
    
	    if (event.target == TextModal) {
	    	
	        TextModal.style.display = "none";
	    }
	}	
}


function closeModal() {

	TextModal.style.display = "none";
}

function showTextModal(alertMessage,header){

	TextLabel.innerHTML = alertMessage;
	headerLabel.innerHTML = header;
	
	// TextModal.style.zIndex = "2";

	TextModal.style.display = "block";
}


function encryptMessage(){

	var plaintext = encryptedTextInput.value;
	var KEY = keyTextInput.value;
	console.log("PT: " + plaintext + "   Key:" + KEY);



	var temp_plain = plaintext;
        plaintext = plaintext.toUpperCase();
        KEY = KEY.toUpperCase();

        var touse = "";
        for(var i = 0 ; i < plaintext.length; i++){
            var c = plaintext.charAt(i).charCodeAt(0);
            if(c >= 65 && c <=90){
                touse = touse + plaintext.charAt(i);
            }
        }

        var k = KEY.concat(touse);

        k = k.substring(0,touse.length);

         console.log("toUSe: " + touse+ "   K:" + k);
        var traverse ="";

        for(var i = 0 ; i < touse.length; i++){
            var t = touse.charAt(i).charCodeAt(0);
            var c = k.charAt(i).charCodeAt(0);
            var s = ((c + t - (2*65)) %26) + 65;
            var r = String.fromCharCode(s);
            traverse = traverse + r;
        }

         console.log("traverse:" + traverse+ "   temp_plain:" + temp_plain);

        var almost ="";
        for( var i = 0, j = 0; i < temp_plain.length; i++){
            if(isAlpha(temp_plain.charAt(i))){

                if(isLowerCase(temp_plain.charAt(i))){
                    // almost = almost + Character.toLowerCase(traverse.charAt(j));
                    almost = almost + traverse.charAt(j).toLowerCase();
                   console.log("var i:" + i+ "    almost:" + almost);
                }else {
                    almost = almost + traverse.charAt(j);
                    console.log("almost:" + almost);
                }
                j++;
            }
            else almost = almost + temp_plain.charAt(i);
        }

         console.log("almost:" + almost);

         decryptedTextInput.value=almost;

         showTextModal(almost,"Encrypted Text:");

        // alert("Encrypted text: " + almost);
        
	

}



function decryptMessage(){

	var ciphertext = decryptedTextInput.value;
	var key = keyTextInput.value;

	var temp_cipher = ciphertext;
        ciphertext =ciphertext.toUpperCase();

        key = key.toUpperCase();
        var touse = "";
        for(var i = 0 ; i < ciphertext.length; i++){
            var c = ciphertext.charAt(i).charCodeAt(0);
            if(c >= 65 && c <=90){
                touse = touse + ciphertext.charAt(i);
            }
        }
        var k = key;

        for(var i = 0 ; i < touse.length; i++){
            var tu = touse.charAt(i).charCodeAt(0) - 65;
            var kc = k.charAt(i).charCodeAt(0) - 65;
            
            var s = floorMod(tu-kc,26) + 65;
            var r = String.fromCharCode(s);
            k = k + r;

        }

        var almost = "";
        for(var i = 0 ; i < touse.length; i++){
            var tu = touse.charAt(i).charCodeAt(0) - 65;
            var kc = k.charAt(i).charCodeAt(0) - 65;

            var s = floorMod(tu-kc,26) + 65;
            var r = String.fromCharCode(s);
           almost = almost + r;

        }

        var almostplease ="";

        for( var i = 0, j = 0; i < temp_cipher.length; i++){
            if(isAlpha(temp_cipher.charAt(i))){
                if(isLowerCase(temp_cipher.charAt(i))){
                    almostplease = almostplease + almost.charAt(j).toLowerCase();
                }else {
                    almostplease = almostplease + almost.charAt(j);
                }
                j++;
            }
            else almostplease = almostplease + temp_cipher.charAt(i);
        }
        

         showTextModal(almostplease,"Decrypted Text:");

	
}

function floorMod(n, m) {
        return ((n % m) + m) % m;
}



function isLowerCase(character){
		if (character == character.toLowerCase())
	{
	  // The character is lowercase
	  return true;
	}
	else
	{
	  // The character is uppercase
	  return false;
	}

}

function isAlpha(str) {
  return /^[a-zA-Z]$/.test(str);
}

