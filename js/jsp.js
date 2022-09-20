let dejaSaisie = ''; // variable vide ou on va inscrire les lettres déjà saisies
let affichable = '';
let mot = "";
let erreurs = 0; // on affecte à la variable erreurs la valeur 0 au départ du jeu
let txtNbrErreur = "Nombre d'erreur : ";
const azerty = "AZERTYUIOPQSDFGHJKLMWXCVBN" // constante qui contient les lettres de l'alphabet dans l'ordre Azerty
const tabP = []; // on initialise la constante tabP qui va contenir la liste des mots possible construite avec le fichier word.js

function motAleatoire() {
    return Math.floor(Math.random() * tabP.length); // fonction qui retourne un chiffre dont la valeur est situé entre 0 et 1 (math.random) multiplié par l'index du mot dans le tableau et arrondi à l'entier inférieur grace à math.floor
}

function start() { // fonction de départ du jeu du pendu
    boutonAlphabet(); // on appelle la fonction qui affiche le clavier azerty
    affimage(); // on appelle la fonction qui va inserer les images du pendu
    mot = tabP[motAleatoire()]; // on affecte à la variable mot, le mot qui correspond à l'index du tableau choisi par la fonction motAleatoire
    let nombreLettre = mot.length; // non affecte à la variable nombreLettre le nombre de lettre du mot
    let carVide = "_"; // On affecte à la variable carVide le caractère _
    affichable = carVide.repeat(nombreLettre); // On remplace tout les caractères du mot par _ et on affecte cela à la variable affichable
    document.getElementById("motAffichable").innerText = affichable; // On modifie le DOM pour afficher la valeur de la variable affichable
    colorError(); // on appelle la fonction colorError
    document.getElementById("nombrelettre").innerText="Le mot à deviner contient "+nombreLettre+" lettres"; // on modifie le DOM pour afficher le nombre d'erreurs
}

function essai(lettre) { // C'est cette fonction qui sera appelée quand l'utilisateur va taper sur une touche
    document.getElementById(lettre).disabled=true; // on désactive le bouton correspondant a la lettre saisie par l'utilisateur pour qu'il ne puisse plus la taper
    if (!reussi(lettre)) { // si on ne peut pas appeler la fonction reussi(lettre)
        ajouterLettre(lettre); // on lance la fonction ajouterLettre avec la lettre saisie par l'utilisateur
        alert("Oups, la lettre " + lettre + " ne se trouve pas dans le mot"); // on affiche une alerte pour informer de l'erreur
    } 
}

function reussi(lettre) {
    let x = mot.indexOf(lettre); // On teste si la lettre se trouve dans le mot et on met l'index dans la variable x
    if (x > -1) { // Si x est plus grand que -1, ca veut dire que la lettre est dans le mot
        let affichable2 = ""; // initialisation d'une variable temporaire pour faire les modifs de caractères
        for (let i = 0; i < mot.length; i++) { // on fait une boucle qui va tester la lettre saisie par l'utilisateur avec chaque lettre du mot à deviner
            if (lettre == mot[i]) { // si la lettre est égale à une ou plusieurs lettres du mot
                affichable2 = affichable2 + lettre; // on modifie la variable affichable 2 en placant la lettre à la place de _
            } 
            else { // sinon
                affichable2 = affichable2 + affichable[i]; // on garde ce qui s'y trouvait avant (lettre ou _)
            }
        }
        affichable = affichable2; // on affecte le résultat de la variable temporaire à la variable affichable
        document.getElementById("motAffichable").innerText = affichable; // on modifie le DOM pour afficher le contenu de la varible affichable
        if (affichable == mot) { // si le contenu de la variable affichable est égal au contenu de la varible mot cela veux dire que l'utilisateur à trouvé le mot
        document.getElementById("motAffichable").innerText="Bravo vous avez gagné!!! Le mot à trouver était bien le mot "+mot; // on modifie le DOM pour afficher une phrase de félicitations
        finpendu()// on appelle la fonction finpendu
        }
    }
    return (x > -1); // on sort de la fonction en indiquant que x est plus grand que -1
}

function ajouterLettre(lettre) {
    if(dejaSaisie.indexOf(lettre) == -1) { // si la lettre a un index de -1 cela veut dire qu'elle n'a pas encore état saisie donc il faut la rajouter
        dejaSaisie += lettre + " "; // on affecte à la variable dejaSaisie la valeur de dejaSaisie + la lettre saisie par l'utlisateur + une virgule pour séparé les mots
        erreurs++; // on incrémente le nombre d'erreur
        if (erreurs>1) { // si le nombre d'erreur est supérieur à 1
            txtNbrErreur = "Nombre d'erreurs : "; // on ajoute un s à la valeur de la variable txtNbrErreur
        }
        document.getElementById("nombreerreur").innerText=""; // on vide le texte précédent de l'élément 
        document.getElementById("imgPendu").src="./img/pendu"+erreurs+".png"; // on modifie le DOM pour afficher l'image du pendu correspondant au nombre d'erreur
        if (erreurs == 10) { // si le nombre d'erreur est égale à 10 c'est perdu
            document.getElementById("motAffichable").innerText="C'est perdu... le mot à trouver était le mot "+mot; // on modifie le DOM pour afficher une phrase de game over
            finpendu() // on appelle la fonction finpendu
        }
    }
    colorError(); // on appelle la fonction colorError
    document.getElementById("lettresDejaSaisies").innerText="Lettres que vous avez déjà saisies et qui ne sont pas dans le mot : "+dejaSaisie; // Enfin on modifie le DOM pour afficher les lettres fausses déjà saisies
}

function finpendu() {
    let buttonletter = document.getElementsByClassName("buttonLetter"); // on place dans la variable buttonletter les éléments ayant pour classe buttonLetter
        for (let i = 0; i < buttonletter.length; i++) { // on fait une boucle qui passe chaque élement de la varible buttonletter un a un
            buttonletter[i].disabled=true; // on désactive tous les boutons du clavier
        }
    boutonRejouer() // on appelle la fonction boutonRejouer
}

function boutonRejouer() { // Création et affichage du bouton rejouer
    let cButton = document.getElementById("buttonRes"); // on affecte la variable cButton l'élement possedant l'id buttonRes
    let button = document.createElement('BUTTON'); // on affecte à la varible button la création d'un élément button
    let text = document.createTextNode("Rejouer"); // on affecte à la varible text le texte Rejouer
    button.appendChild(text); // on place le texte Rejouer en enfant de la variable button
    cButton.appendChild(button); // on place le button en enfant de la varible cButton
    document.getElementById('buttonRes').setAttribute('onclick','location.reload();'); // on modifie le DOM pour afficher un bouton en lui assignant un evenement on click qui fera recharger la page est donc recommencer une partie
    }

function boutonAlphabet() { // création et affichage du clavier
    let nbrButton=0; // on crée la variable nbrButton et on lui affecte la valeur 0
    let buttonGlob = document.getElementById("buttonGlo"); // on créé la variable buttonGlob et on lui affecte l'élement qui à l'id buttonGlo
    for (let i = 0; i < azerty.length; i++) { // on fait une boucle qui va parcourir un a un tout chaque caractères de la variable azerty
        let buttonlet = document.createElement('BUTTON'); // on crée la variable buttonlet et on lui affecte la création d'un élément de type button
        buttonlet.setAttribute("id", azerty[i]); // on ajoute au buttonlet crée precedemment l'attibut id="A" (B si lettre b etc...)
        buttonlet.className = "buttonLetter"; // on ajoute au buttonlet crée precedemment l'attibut class="buttonLetter"
        buttonlet.setAttribute("onclick","essai('"+ azerty[i] +"');"); // on ajoute au buttonlet crée precedemment l'evenement onclick="essai('A');" (B si lettre b, etc...)
        let textlet = document.createTextNode(azerty[i]); // on crée la varible textlet on lui affecte la création dun string contenant la lettre en cours
        buttonlet.appendChild(textlet); // on modifie le DOM pour placer la lettre de la variable textlet en enfant du buttonlet
        buttonGlob.appendChild(buttonlet); // on modifie le DOM pour placer le buttonlet en enfant du buttonGlob
        nbrButton++;// on incrémente enfin la variable nbrbutton de 1 à chaque étape de la boucle
        if (nbrButton==10) { // si nbrButton est égal à 10
            let sautLigne = document.createElement("br"); // on crée la variable sautLigne et on lui affecte la création d'une balise br pour aller à la ligne
            buttonGlob.appendChild(sautLigne); // on modifie le DOM afin de placer le br après le dixième button du buttonGlob
            nbrButton=0; // et on réinitialise nbrButton à 0
        }
    }
}

function affimage() { // création et affichage de l'image du pendu
    let imgP = document.createElement("img"); // on crée la variable imgP et on lui affecte la création d'un élément de type img
    imgP.setAttribute("id", "imgPendu"); // on ajoute à la variable imgP crée precedemment l'attibut id="imgPendu"
    imgP.src = "./img/pendu0.png"; // on ajoute également à la variable imgP crée precedemment l'attibut src="./img/pendu0.png"
    let cImgP = document.getElementById("imagePendu"); // on créé la variable cImgP et on lui affecte l'élement qui à l'id imagePendu
    cImgP.appendChild(imgP); // on modifie le DOM afin de placer imgP en enfant de l'élément cImgP
}


function colorError() {
    let cPendu = document.getElementById("nombreerreur");
    let pPendu = document.createElement('P');
    pPendu.setAttribute("class", "color"+erreurs);
    let textP = document.createTextNode(txtNbrErreur+erreurs + " / 10");
    pPendu.appendChild(textP);
    cPendu.appendChild(pPendu);
    }
