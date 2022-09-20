// on créé une fonction dans la quelle on va crée deux tableaux. Un qui va lister toutes les lettres avec un accent et un autre qui va lister toutes ces mêmes lettres
// mais sans les accents. Ensuite on va faire une boucle qui va remplacer toutes les lettres avec les accents par leurs équivalents sans accent.

function sansAccent(str){ 
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
           /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
        ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}

// on créé une fonction qui va servir a trier les mots. Si les mots font moins de trois lettres et plus de 15 lettres on les élimine. Ensuite on parcours les mots restant
// et si il y a des caractères plus petit que A ou plus grand que Z cela indique que se sont des mots composés (avec - par exemple) et on les élimine aussi

function valide(str) {
    if(str.length<3 && str.length>15) return false;
    for(var i=0; i<str.length; i++) {
        if(str[i]<"A" || str[i]>"Z") {
            return false;
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Version Ajax natif

//var xhr = null;

//if (window.XMLHttpRequest || window.ActiveXObject) {
    //if (window.ActiveXObject) {
        //try {
           // xhr = new ActiveXObject("Msxml2.XMLHTTP");
            //} catch(e) {
            //xhr = new ActiveXObject("Microsoft.XMLHTTP");
        //}
    //} 
    //else {
        //xhr = new XMLHttpRequest(); 
    //}
//} 
//else {
    //alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");

//}


//xhr.onreadystatechange = function()
//{
     //if (xhr.readyState == 4) // si on arrive au statut 4 c'est que la réponse du serveur est ok
    //{ 
        //if (xhr.status === 200) { 	// si on arrive au statut 200 c'est que le chargement de la page est ok
            //var word=xhr.responseText; // on crée la variable word avec la valeur récupéré par xhr (voir dans xhr.open)
            //word=sansAccent(word); // on lance la fonction sansAccent pour supprimer les accents dans les mots de la chaine de caractères word
            //var tabword = word.split("\n"); // on crée le tableau tabword grace à la fonction split avec un saut de ligne
            //var words; // on initialise la fonction words
             //for(i=0; i<tabword.length; i++) { // on fait une boucle qui va parcourir toutes les lignes du tableau tabword
                //words=tabword[i].toUpperCase(); // on passe tous les mots de tabword les mots en majuscules et on les mets dans la variable words
                //if(valide(words)) { // si la fonction valide retourne true
                    //tabP.push(words); // on ajoute le mot dans le tableau tabP
                //}
            //}
        //start(); // on renvoi alors vers la fonction start
        //} 
    //}
//}


//xhr.open('GET', 'http://mannini.fr/mots.php', true); // on va récupérer une liste de mots sur un serveur externe
//xhr.send("text");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Version jQuery

$.ajax({ // on va chercher la liste de mot sur un serveur distant
    url: "https://alexandrealves.fr/mots.txt",
    cache: true
})
.done(function(word) { // on applique des instructions
    word=sansAccent(word); // on lance la fonction sansAccent pour supprimer les accents dans les mots de la chaine de caractères word
    var tabword = word.split("\n"); // on crée le tableau tabword grace à la fonction split avec un saut de ligne
    var words; // on initialise la fonction words
    for(i=0; i<tabword.length; i++) { // on fait une boucle qui va parcourir toutes les lignes du tableau tabword
        words=tabword[i].toUpperCase(); // on passe tous les mots de tabword les mots en majuscules et on les mets dans la variable words
        if(valide(words)) { // si la fonction valide retourne true
            tabP.push(words); // on ajoute le mot dans le tableau tabP
        }
    }
    start(); // on renvoi alors vers la fonction start une fois la liste crée
});