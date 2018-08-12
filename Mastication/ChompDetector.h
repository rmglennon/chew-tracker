#ifndef CHOMP_DETECTOR_H_
#define CHOMP_DETECTOR_H_

/**
 * Detects chomps based on direction changes.
 */
class ChompDetector {
public:
  /// Callback when the direction has changed.
  typedef void(*ChompDetectedCallback)();

  /// Number of direction changes which count as a chomp.
  static const int DIRECTION_CHANGES_PER_CHOMP = 2;

  /**
   * Constructor.
   * 
   * @param callback Callback when a chomp is detected.
   */
  ChompDetector(ChompDetectedCallback callback) : m_callback(callback),
      m_directionChangeCount(0) {
    // Intentionally blank.
  }

  /**
   * Detect chomp. Calls the passed in callback if a chomp is detected.
   */
  void detectChomp(const int direction, const int value) {
    if (DIRECTION_CHANGES_PER_CHOMP == ++m_directionChangeCount) {
      m_directionChangeCount = 0;
      m_callback();
    }
  }

private:
  /// Callback.
  ChompDetectedCallback m_callback;

  /// Direction changed counter.
  int m_directionChangeCount;
};

#endif // CHOMP_DETECTOR_H_
