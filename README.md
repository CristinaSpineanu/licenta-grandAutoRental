Tehnologii folosite:

<p align="center">
<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="100px" height="100px" margin-right="15px">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="100px" height="100px" margin-right="15px">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="100px" height="100px" margin-right="15px">
<img src="https://camo.githubusercontent.com/4df4cf6995f81a77c935c858564a894f16b8e242ef5bbe01d1ca2f40d5991d85/68747470733a2f2f7777772e616e6b69747765626c6f6769632e636f6d2f6a6176617363726970742f6a735f696d672f6a6176617363726970742e706e67" width="170px" height="100px" margin-right="15px">
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="100px" height="100px" margin-right="15px">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="100px" height="100px" margin-right="15px">
</p>

Pentru a rula aplicația este necesar să se descarce ambele fișiere: grandautorental_Fe și grandautorental_Be. 
După descărcare se va deschide fiecare folder într-un IDE și se vor rula următoarele comenzi:

-> Pentru folderul grandautorental_fe

Instalare:  npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare:  npm run ng:serve


-> Pentru folderul grandautorental_be

Instalare: npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare: npm run start:dev

Portul va fi: http://localhost:4200/


-> Pentru baza de date


HELPFUL:
În cazul în care se întampină probleme la compilarea pe partea de FE, se vor rula următoare comenzi:
npm cache clean --force
npm rm -rf node_modules package-lock.json --force
npm install --force
npm run ng:serve
