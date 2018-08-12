#include "Averager.h"
#include "DirectionSwitchDetector.h"
#include "ChompDetector.h"

/// Pot pin.
static const int POT_PIN = 0;
/// LED pin.
static const int LED_PIN  = 13;

/// Read delay, in milliseconds.
static const int READ_DELAY_MS = 10;

/// Average data point count to use.
static const int AVERAGE_COUNT = 20;
/// Averager for the pot.
static Averager *gAvgr = nullptr;

/// Change direction delta from last direction change value.
static const int DIRECTION_SWITCH_DELTA = 5;
/// Direction switcher logic.
static DirectionSwitchDetector *gDirectionSwitchDetector = nullptr;

/// Chomp / mastication detector.
static ChompDetector *gChompDetector = nullptr;

/// Total number of chomps detected.
static long gChompCounter = 0;

/**
 * Callback when the direction changes.
 * 
 * @param direction Direction, @c 1 for up, @c -1 for down.
 * @param value PWM absolute value.
 */
void onDirectionChanged(const int direction, const int value) {
  gChompDetector->detectChomp(direction, value);
}

/**
 * Callback when a chome is detected.
 */
void onChompDetected() {
  Serial.print("Detected chomp ");
  Serial.println(++gChompCounter);
}

/**
 * Set up the arduino environment.
 */
void setup() {
  Serial.begin(9600);

  pinMode(LED_PIN, OUTPUT);
  gAvgr = new Averager(AVERAGE_COUNT);
  gDirectionSwitchDetector = new DirectionSwitchDetector(DIRECTION_SWITCH_DELTA,
      onDirectionChanged);
  gChompDetector = new ChompDetector(onChompDetected);
}

/**
 * Main loop.
 */
void loop() {
  int value = analogRead(POT_PIN);
  int avg = gAvgr->average(value);
  gDirectionSwitchDetector->checkDirection(avg);

  delay(READ_DELAY_MS);
}
