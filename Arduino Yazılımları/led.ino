#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#define firebase_erisim_linki ""
#define firebase_sifre ""

#define FIREBASE_PATH1 ""
#define FIREBASE_PATH2 ""
#define FIREBASE_PATH3 ""

FirebaseData firebaseData1;
FirebaseData firebaseData2;
FirebaseData firebaseData3;

char ssid[] = "";
char pass[] = "";

#define LED1 16
#define LED2 5
#define LED3 4


void setup() {
  Serial.begin(115200);
  delay(1000);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);

  Serial.print("Bağlantı kuruluyor");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Bağlantı sağlandı.");

  Firebase.begin(firebase_erisim_linki, firebase_sifre);

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
}
void loop() {
  WiFiClient istemci;

  Firebase.getBool(firebaseData1, FIREBASE_PATH1);
  Firebase.getBool(firebaseData2, FIREBASE_PATH2);
  Firebase.getBool(firebaseData3, FIREBASE_PATH3);
  bool ledDurumu1 = firebaseData1.boolData();
  bool ledDurumu2 = firebaseData2.boolData();
  bool ledDurumu3 = firebaseData3.boolData();

  if (ledDurumu1) {
    Serial.println("LED1 açık");
    digitalWrite(LED1, HIGH);
  } else {
    Serial.println("LED1 kapalı");
    digitalWrite(LED1, LOW);
  }

  if (ledDurumu2) {
    Serial.println("LED2 açık");
    digitalWrite(LED2, HIGH);
  } else {
    Serial.println("LED2 kapalı");
    digitalWrite(LED2, LOW);
  }

  if (ledDurumu3) {
    Serial.println("LED3 açık");
    digitalWrite(LED3, HIGH);
  } else {
    Serial.println("LED3 kapalı");
    digitalWrite(LED3, LOW);
  }
  delay(1000);
}