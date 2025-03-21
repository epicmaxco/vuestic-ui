export default {
    props: {
        items: Array
    },
    setup(__props, { expose: __expose }) {
        __expose();
        const props = __props;
        const __returned__ = { props };
        Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
        return __returned__;
    }
};
