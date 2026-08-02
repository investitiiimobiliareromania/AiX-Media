type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

class Logger {
  private formatLog(level: LogLevel, message: string, context?: Record<string, unknown>, error?: unknown): LogPayload {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };
    if (context) {
      payload.context = context;
    }
    if (error) {
      payload.error = error instanceof Error ? { message: error.message, stack: error.stack } : error;
    }
    return payload;
  }

  info(message: string, context?: Record<string, unknown>): void {
    const payload = this.formatLog('info', message, context);
    console.log(JSON.stringify(payload));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const payload = this.formatLog('warn', message, context);
    console.warn(JSON.stringify(payload));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    const payload = this.formatLog('error', message, context, error);
    console.error(JSON.stringify(payload));
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      const payload = this.formatLog('debug', message, context);
      console.debug(JSON.stringify(payload));
    }
  }
}

export const logger = new Logger();
