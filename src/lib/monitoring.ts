import { logger } from './logger';

export class MonitoringService {
  captureException(error: Error, context?: Record<string, unknown>) {
    logger.error(`[Exception Captured] ${error.message}`, {
      name: error.name,
      stack: error.stack,
      ...context,
    });
  }

  reportMetric(metricName: string, value: number, unit = 'ms') {
    logger.info(`[Performance Metric] ${metricName}: ${value}${unit}`);
  }
}

export const monitoring = new MonitoringService();
