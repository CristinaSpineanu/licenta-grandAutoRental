Tehnologii folosite:


<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="250px" >
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="250px" >
<img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="250px" >
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="250px" >


Pentru a rula aplicația este necesar să se descarce ambele fișiere: grandautorental_Fe și grandautorental_Be. 
După descărcare se va deschide fiecare folder într-un IDE și se vor rula următoarele comenzi:

-> Pentru folderul grandautorental_fe

Instalare:  npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare:  npm run ng:serve


-> Pentru folderul grandautorental_be

Instalare: npm install  (pentru instalarea tuturor pachetelor folosite)

Compilare: npm run start:dev

Portul va fi: http://localhost:4200/



HELPFUL:
În cazul în care se întampină probleme la compilarea pe partea de FE, se vor rula următoare comenzi:
npm cache clean --force
npm rm -rf node_modules package-lock.json --force
npm install --force
npm run ng:serve
