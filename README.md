# AjeetMundan - Fremont Barber App
This github repo consists of the mobile UI for Ajeet Mundan

## STEPS TO COMPILE
* git clone https://github.com/Nabarun/AjeetMundan.git
* npm install
* Build the app using **ionic build**
  * npm install -g cordova ionic
  * npm install @ionic/app-scripts@latest --save-
  * npm install
  * ionic build
  * Add <script src="build/vendor.js"></script> to src/index.html
* To add support for ios/android only
  * ionic cordova platform add ios 
  * ionic cordova platform add android
* To verify the app on web 
  * ionic serve
  
##Note: If you are using cocoa pods, then open xcworkspace project and NOT xcodeproj
