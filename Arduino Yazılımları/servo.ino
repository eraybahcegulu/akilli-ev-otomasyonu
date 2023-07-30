#include <Servo.h>
#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#define firebase_erisim_linki ""
#define firebase_sifre ""
#define FIREBASE_PATH ""

int servoAngle;
Servo servo;
FirebaseData firebaseData;

char ssid[] = "";
char pass[] = ""; 

void setup() {
  Serial.begin(115200);
  delay(1000);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);      
  
  Serial.print("Bağlantı kuruluyor");
    while (WiFi.status() != WL_CONNECTED) 
    {
      delay(500); 
      Serial.print(".");
    }
  Serial.println("");
  Serial.println("Bağlantı sağlandı.");

  Firebase.begin(firebase_erisim_linki, firebase_sifre);

  servo.attach(16);

  servoAngle = 0;
  servo.write(servoAngle);
}

void loop() {
  WiFiClient istemci;

  Firebase.getBool(firebaseData, FIREBASE_PATH);
  bool servoDurumu = firebaseData.boolData();

  if (servoDurumu){
    Serial.println("Açık");
    servoAngle = 180;
    servo.write(servoAngle);
  } else{
    Serial.println("Kapalı");
    servoAngle = 0;
    servo.write(servoAngle);
  }
  delay(1000);
}
