export class VirtualComponentCompilationError extends Error {
    constructor(message: string, componentName: string) {
        super('VirtualComponentCompilationError: ' + message + ` (${componentName})`);
        this.name = 'VirtualComponentCompilationError';
    }
}

export class VirtualComponentError extends Error {
    constructor(message: string) {
        super('VirtualComponentError: ' + message);
        this.name = 'VirtualComponentError';
    }
}

