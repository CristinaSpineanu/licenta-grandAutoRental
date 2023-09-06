<p style="font-size: 20px; text-align: center; font-weight:400">Tehnologii folosite:</p>
<div style="display: flex; justify-content: space-between; gap: 5px; margin-bottom:40px">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="100px" height="100px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="100px" height="100px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="100px" height="100px">
    <img src="https://camo.githubusercontent.com/4df4cf6995f81a77c935c858564a894f16b8e242ef5bbe01d1ca2f40d5991d85/68747470733a2f2f7777772e616e6b69747765626c6f6769632e636f6d2f6a6176617363726970742f6a735f696d672f6a6176617363726970742e706e67" width="140px" height="100px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="100px" height="100px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="100px" height="100px">
</div>


Pentru a rula aplicația este necesar să se descarce ambele fișiere: GrandAutoRental_Fe și GrandAutoRental_Be. 
După descărcare se va deschide fiecare folder într-un IDE și se vor rula următoarele comenzi:


<p ><b>-> Pentru folderul GrandAutoRental_Fe</b> </p>

Instalare:  npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare: ng serve


<p ><b>-> Pentru folderul GrandAutoRental_Be</b> </p>

Instalare: npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare: npm run start:dev


Aplicația va putea fi accesată pe: http://localhost:4200/


HELPFUL:
În cazul în care se întampină probleme la compilarea pe partea de FE, se vor rula următoare comenzi în ordinea afișată:
<ul>
<li> npm cache clean --force </li>
<li>npm rm -rf node_modules package-lock.json --force </li>
<li> npm install --force</li>
<li> În bash terminal se va rula:  ng serve</li>
</ul>

