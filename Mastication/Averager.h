#ifndef AVERAGER_H_
#define AVERAGER_H_

/**
 * Calculates an average of incoming data points
 */
class Averager {
public:
  /**
   * Constructor.
   * 
   * @param count Number of data points to average over.
   */
  Averager(const int count) : m_avgCount(count), m_index(0) {
    m_values = new int[m_avgCount];
    for (int i = 0; i < m_avgCount; i++) {
      m_values[i] = 0;
    }
  }

  /**
   * Destructor.
   */
  ~Averager() {
    delete m_values;
  }

  /**
   * Calutlate the newest average given the new @c value.
   * 
   * @param value New value to add to the average.
   * @return The average.
   */
  int average(int value) {
    m_values[m_index++] = value;
    if (m_index > m_avgCount) {
      m_index = 0;
    }

    long sum = 0;
    for (int i = 0; i < m_avgCount; i++) {
      sum += m_values[i];
    }

    return sum / m_avgCount;
  }

private:
  /// Number of data points to average over.
  int m_avgCount;
  /// Index which to write next value.
  int m_index;
  /// Array of values to average.
  int *m_values;
};

#endif // AVERAGER_H_