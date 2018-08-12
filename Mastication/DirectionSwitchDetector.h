#ifndef DIRECTIONN_SWITCH_DETECTOR_H_
#define DIRECTIONN_SWITCH_DETECTOR_H_

/**
 * Direction switch detector.
 */
class DirectionSwitchDetector {
public:
  /// Callback when the direction has changed.
  typedef void(*DirectionChangedCallback)(const int direction, const int value);

  /**
   * Constructor.
   * 
   * @param delta Delta the value must change from the previous switch direction
   *         to be detected as a direction change.
   * @param callback Callback when the direction changes.
   */
  DirectionSwitchDetector(const int delta, DirectionChangedCallback callback) :
      m_delta(delta), m_callback(callback), m_max(0), m_min(0), m_lastValue(0),
      m_direction(1) {
    // Intentionally blank.
  }

  /**
   * Check if the direction has changed. Calls the passed in callback if a
   * direction change is detected.
   * 
   * @param value New value.
   */
  void checkDirection(int value) {
    if (value == m_lastValue) {
      return;
    }

    m_min = min(m_min, value);
    m_max = max(m_max, value);

    int newDirection = (value < m_lastValue) ? -1 : 1;

    m_lastValue = value;

    if (newDirection == m_direction) {
      return;
    }

    if (1 == m_direction) {
      if (abs(m_max - value) >= m_delta) {
        m_max = value;
        m_direction = newDirection;
        m_callback(newDirection, value);
     }
    } else {
      if (abs(m_min - value) >= m_delta) {
        m_min = value;
        m_direction = newDirection;
        m_callback(newDirection, value);
      }
    }
  }

private:
  /// Delta the value must change from the previous switch direction
  /// to be detected as a direction change.
  int m_delta;
  /// Callback.
  DirectionChangedCallback m_callback;

  /// Current max value seen.
  int m_max;
  /// Current min value seen.
  int m_min;
  /// Last value seen.
  int m_lastValue;
  /// Current direction.
  int m_direction;
};

#endif // DIRECTIONN_SWITCH_DETECTOR_H_
