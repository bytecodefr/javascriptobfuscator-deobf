// Deobfuscated by Avian!
// Variables look decent now.


function NewObject(var_2) {
    var var_3 = 0;
    this.SayHello = function(var_4) {
        var_3++;
        alert(var_2 + var_4)
    };
    this.GetCount = function() {
        return var_3
    }
}
var obj = new NewObject("Message : ");
obj.SayHello("You are welcome.")