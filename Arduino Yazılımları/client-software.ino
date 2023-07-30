#include <OneWire.h>
#include <DallasTemperature.h>
#include <Servo.h>
#include <FirebaseESP8266.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#define firebase_access_link "akilli-ev-dpu-default-rtdb.europe-west1.firebasedatabase.app"
#define firebase_pass "c3lKPPSXyH3LX683zIy94YYGtBrA0eyaI1Pgrxwe"
#define SERVO_1_FIREBASE_PATH "/users/TokicnkDtlXbKgc6HToR8zXPPTC3/devices/device-id-1/value"
#define TEMP_FIREBASE_PATH "/users/TokicnkDtlXbKgc6HToR8zXPPTC3/devices/device-id-5/value"
#define LED_1_FIREBASE_PATH "/users/TokicnkDtlXbKgc6HToR8zXPPTC3/devices/device-id-3/value"
#define LED_2_FIREBASE_PATH "/users/TokicnkDtlXbKgc6HToR8zXPPTC3/devices/device-id-4/value"
#define SOIL_FIREBASE_PATH "/users/TokicnkDtlXbKgc6HToR8zXPPTC3/devices/device-id-6/value"

#define trigPin 14
#define echoPin 12
int buzzerPin=13;
long duration;

int distance;

Servo servo1;
FirebaseData Servo1firebaseData;
FirebaseData TempfirebaseData;
FirebaseData LED1firebaseData;
FirebaseData LED2firebaseData;
FirebaseData SoilfirebaseData;

#define LED1 0
#define LED2 2

const int soilPin = A0;

const int oneWireBus = 4;     
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);


char ssid[] = "TurkTelekom_TE611";
char pass[] = "eray1337eray"; 

void setup() {
  Serial.begin(115200);
  delay(1000);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);      
  
  Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED) 
    {
      delay(500); 
      Serial.print(".");
    }
  Serial.println("");
  Serial.println("Connected.");

  Firebase.begin(firebase_access_link, firebase_pass);

  servo1.attach(16);
  servo1.write(0);
  
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);

  pinMode(buzzerPin,OUTPUT);
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
}

void loop() {
  WiFiClient client;

  Firebase.getBool(LED1firebaseData, LED_1_FIREBASE_PATH);
  Firebase.getBool(LED2firebaseData, LED_2_FIREBASE_PATH);
  bool led1switch = LED1firebaseData.boolData();
  bool led2switch = LED2firebaseData.boolData();

  int humidityValue = analogRead(soilPin);
  Firebase.setInt(SoilfirebaseData, SOIL_FIREBASE_PATH, humidityValue);

  if (led1switch) {
    digitalWrite(LED1, HIGH);
  } else {
    digitalWrite(LED1, LOW);
  }

  if (led2switch) {
    digitalWrite(LED2, HIGH);
  } else {
    digitalWrite(LED2, LOW);
  }

  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);
  Firebase.setFloat(TempfirebaseData, TEMP_FIREBASE_PATH, temperatureC);

  Firebase.getBool(Servo1firebaseData, SERVO_1_FIREBASE_PATH );
  bool servo1switch = Servo1firebaseData.boolData();

  if (servo1switch){
    servo1.write(180);
  } else{
    servo1.write(0);
  }

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  distance = duration * 0.034 / 2;
 
  if(distance<10){
      tone(buzzerPin,1000);
  }
  else{
      noTone(buzzerPin);
  }
  
}
