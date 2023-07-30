#include <Servo.h>

#define trigPin 2
#define echoPin 16
#define servoPin 5
#define ledPin 4

long duration;

int servoAngle;
Servo servo;

int distance;
void setup() {
  
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);

  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 

  servo.attach(servoPin);

  servoAngle = 0;
  servo.write(servoAngle);
}
void loop() {
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  distance = duration * 0.034 / 2;
 
  Serial.print("Distance: ");
  Serial.println(distance);

  if (distance<15){
    digitalWrite(ledPin, HIGH);
    servoAngle = 180;
    servo.write(servoAngle);
  }else{
    digitalWrite(ledPin, LOW);
    servoAngle = 0;
    servo.write(servoAngle);
  }

  delay(5000);
}

