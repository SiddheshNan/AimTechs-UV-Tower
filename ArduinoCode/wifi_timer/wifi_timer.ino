#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <FS.h>
void logger(const char* msg);
void HTTPlogger(const char* msg);
void FileSystemlogger(const char* msg);
void handleFileReadAndSend(String path);
String getContentType(String filename);
void sendHeaders(ESP8266WebServer &webServ);
const byte DNS_PORT = 53;
IPAddress apIP(172, 0, 0, 1);
DNSServer dnsServer;
ESP8266WebServer webServer(80);
unsigned long currentMillis;
unsigned long startMillis;
bool pinState = false;
bool buzzerState = false;
int interval = 300000; // 5 min initial minimum interval -- DONT CHANGE

//----------------------------------

// WiFi Config
#define AP_SSID "AIMTECHS-UVC-1"
#define AP_PASS "123456789"

// Print logs to console config
bool PrintLogs = false;
bool PrintHTTP = false;
bool PrintFileSystem = false;

// Pin Config
const int ledPin =  14;
const int buzzerPin =  2;
const int buzzerStartEndTime = 4000;
const int manualStartPin = 5;

//--------------------------------

void turn_on() {
  pinState = true;
  digitalWrite(ledPin, pinState);
  logger("UV turned ON");
}
void turn_off() {
  pinState = false;
  digitalWrite(ledPin, pinState);
  logger("UV turned OFF");
}

void buzzer_on() {
  buzzerState = true;
  digitalWrite(buzzerPin, buzzerState);
  logger("Buzzer turned ON");

}
void buzzer_off() {
  buzzerState = false;
  digitalWrite(buzzerPin, buzzerState);
  logger("Buzzer turned OFF");

}

void sendHeaders(ESP8266WebServer &webServ) {
  webServ.sendHeader("Access-Control-Allow-Origin", "*");
  webServ.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  webServ.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}
String getContentType(String filename) {
  if (filename.endsWith(".html")) return "text/html";
  else if (filename.endsWith(".css")) return "text/css";
  else if (filename.endsWith(".js")) return "application/javascript";
  else if (filename.endsWith(".ico")) return "image/x-icon";
  else if (filename.endsWith(".png")) return "image/png";
  return "text/plain";
}

void handleFileReadAndSend(String path) {
  FileSystemlogger(String(String("Trying to read file - ") + String(path)).c_str());
  if (path.endsWith("/")) path += "index.html";
  String contentType = getContentType(path);

  if (SPIFFS.exists(path)) {
    FileSystemlogger(String(String("Sending file - ") + String(path)).c_str());
    File file = SPIFFS.open(path, "r");
    size_t sent = webServer.streamFile(file, contentType);
    file.close();
    HTTPlogger(String(String("Sending Response 200 (OK) for - ") + String(path)).c_str());
  }
  else {
    webServer.sendHeader("Location", "/");
    webServer.send(302, "text/plain", "Not found");
    FileSystemlogger(String(String("File Not found! - ") + String(path)).c_str());
    HTTPlogger(String(String("Sending Response 302 (Redirect) for - ") + String(path)).c_str());
  }

}

void logger(const char* msg) {
  if (PrintLogs) {
    Serial.print(String(millis()) + String(" - [LOGGER] ")); Serial.println(msg);
  }
}
void HTTPlogger(const char* msg) {
  if (PrintHTTP) {
    Serial.print(String(millis()) + String(" - [HTTP] ")); Serial.println(msg);
  }
}
void FileSystemlogger(const char* msg) {
  if (PrintFileSystem) {
    Serial.print(String(millis()) + String(" - [FileSystem] ")); Serial.println(msg);
  }
}

//--------------------------------

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(manualStartPin, INPUT_PULLUP);
  turn_off();
  buzzer_off();
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(AP_SSID, AP_PASS);
  dnsServer.start(DNS_PORT, "*", apIP);
  SPIFFS.begin();
  webServer.onNotFound([]() {
    HTTPlogger("Request Recived for - CaptivePortal");
    sendHeaders(webServer);
    handleFileReadAndSend(webServer.uri());
  });


  webServer.on("/turnOn", []() {
    HTTPlogger("Request Recived for - /turnOn");
    sendHeaders(webServer);

    if (!pinState) {
      int timeconst = webServer.arg("time").toInt();
      if (!timeconst) {
        webServer.send(400, "text/plain", "no time");
        HTTPlogger("Sending Response 400 (No time) for - /turnOn");
        return;
      }
      startMillis = millis();
      interval = timeconst;
      turn_on();
      webServer.send(200, "text/plain", "ok");
      HTTPlogger(String(String("Sending Response 200 (OK) for - /turnOn for time - ") + String((timeconst / 1000) / 60) + String(" mins")).c_str());
    }
    else  {
      webServer.send(400, "text/plain", "already on");
      HTTPlogger("Sending Response 400 (Already On) for - /turnOn");
    }

  });



  webServer.on("/turnOff", []() {
    HTTPlogger("Request Recived for - /turnOff");
    sendHeaders(webServer);

    if (pinState) {
      turn_off();
      buzzer_off();
      webServer.send(200, "text/plain", "ok");
      HTTPlogger("Sending Response 200 (Turned off) for - /turnOff");
      return;
    }
    else  {
      webServer.send(400, "text/plain", "already off");
      HTTPlogger("Sending Response 400 (Already Off) for - /turnOff");
    }

  });

  webServer.on("/getValue", []() {
    HTTPlogger("Request Recived for - /getValue");
    sendHeaders(webServer);
    String out = "{\"time\":\"" + String(interval) + "\" , \"status\" :  \"" + String(pinState) + "\", \"ontime\" :  \"" + String(currentMillis - startMillis) + "\" }";
    webServer.send(200, "application/json", out);
    HTTPlogger("Sending Response 200 (OK) for - /getValue");
  });

  webServer.on("/favicon.ico", []() {
    sendHeaders(webServer);
    webServer.send(204, "", "");
  });

  webServer.begin();
}

void loop() {
  currentMillis = millis();

  if (pinState) { // it has been turned on
    int current_time = currentMillis - startMillis;

    if (current_time <= buzzerStartEndTime) {
      if (!buzzerState) buzzer_on(); // while starting
    }
    else if (interval - current_time <= buzzerStartEndTime) {
      if (!buzzerState) buzzer_on();  // while stopping
    }
    else if (buzzerState) buzzer_off(); // turn it off for 1st time | 2nd time its turning off from loop down below

    if (current_time >= interval) { // mark reached (long removed)
      logger("Time Reached - UV turning off automatically");
      turn_off();
      buzzer_off();
    }
  }
  else {
    if (!digitalRead(manualStartPin)) { // button is pressed
      logger("Manual Button Pressed from UV Device - Turning UV ON for 5min");
      startMillis = millis();
      interval = 300000;
      turn_on();
    }
  }

  dnsServer.processNextRequest();
  webServer.handleClient();
}
