export class VirtualComponentCompilationError extends Error {
    constructor(message: string, componentName: string) {
        super('VirtualComponentCompilationError: ' + message + ` (${componentName})`);
        this.name = 'VirtualComponentCompilationError';
    }
}

export class VirtualComponentError extends Error {
    constructor(message: string, stack?: string) {
        super('VirtualComponentError: ' + message);
        this.name = 'VirtualComponentError';
        if (stack) {
          this.stack = stack;
        }
    }
}

